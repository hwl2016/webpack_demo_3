//封装ajax数据生成html模板接口 依赖jquery和underscore 使用是务必将这两个库提前引入
(function($) {
	var pageNum;
	var totalPage;
	var myScroll, pullUpEl, pullUpOffset;
	var dataAllLoaded = false;	//标识数据是否已经没有了

	var timer = null;

	var opt_g;

	var loadingHTML = '<div id="loadingToast" class="mocm_loading_toast" >' +
                '<div class="mocm_mask_transparent"></div>' +
                '<div class="mocm_toast">' +
                    '<div class="mocm_loading">' +
                        '<div class="mocm_loading_leaf mocm_loading_leaf_0"></div>' +
                        '<div class="mocm_loading_leaf mocm_loading_leaf_1"></div>' +
                        '<div class="mocm_loading_leaf mocm_loading_leaf_2"></div>' +
                        '<div class="mocm_loading_leaf mocm_loading_leaf_3"></div>' +
                        '<div class="mocm_loading_leaf mocm_loading_leaf_4"></div>' +
                        '<div class="mocm_loading_leaf mocm_loading_leaf_5"></div>' +
                        '<div class="mocm_loading_leaf mocm_loading_leaf_6"></div>' +
                        '<div class="mocm_loading_leaf mocm_loading_leaf_7"></div>' +
                        '<div class="mocm_loading_leaf mocm_loading_leaf_8"></div>' +
                        '<div class="mocm_loading_leaf mocm_loading_leaf_9"></div>' +
                        '<div class="mocm_loading_leaf mocm_loading_leaf_10"></div>' +
                        '<div class="mocm_loading_leaf mocm_loading_leaf_11"></div>' +
                    '</div>' +
                    '<p class="mocm_toast_content">数据加载中</p>' +
                '</div>' +
            '</div>';

	function request(settings) {
		pageNum = 1;
		var opt = $.extend({
			url: '',
			type: 'GET',
			async: true,
			data: null,	//ajax传送的数据
            loadingStatus: true,
            loadingText: '数据加载中',
			headers: {
				'Request-Type': 'XMLHttpRequest'
			},
			beforeFn: function(xhr) {

			},
			dataFilter: function(data) {	//数据过滤器
				return data;	//注意一定要返回值处理后的data
			},
			successFn: function(data) {
//				console.log(data)
			},
			errorFn: function() {
				console.log('ajax error fn');
			},
			completeFn: function(data) {

			},
			template: null,	//模板DOM
			targetDom: null,	//拼接好的html dom添加到的节点
			pagination: false,	//是否分页
			pagerHandler: null,	//分页处理函数
		}, settings);

		var beforeFnBak = opt.beforeFn;
		opt.beforeFn = function(xhr) {
			_ajaxBefore(xhr);
			beforeFnBak(xhr);
		}

		var completeFnBak = opt.completeFn;
		opt.completeFn = function(data) {
			completeFnBak(data);
			_ajaxComplete(data);
		}

		if(opt.template) {	//有页面拼接htmlDom的情况
			opt = _template(opt);
		}

		opt_g = opt;
		_send(opt);


	}

	function _template(opt) {
		var tmp = $(opt.template).html();
		var successFnBak = opt.successFn;
		opt.successFn = function(data, originData) {
			var htmlDom = '';
			var list = data;
			if(!Array.isArray(list)) {
				console.error('list 不是数组', Object.prototype.toString.call(list));
				return;
			}
			var len = list.length;
			if(len === 0) {
				opt.pagination = false;
			}else {
				for(var i = 0; i < len; i++) {
					var obj = list[i];
					var keys = _.keys(obj);
					var tmpBak = tmp;
					for(var j = 0; j < keys.length; j++) {
						var reg = new RegExp("{{\\s*" + keys[j] + "\\s*}}", "gim");
						tmpBak = tmpBak.replace(reg, obj[keys[j]]);
					}
					htmlDom += tmpBak;
				}
				if(opt.targetDom) {
					$(opt.targetDom).append(htmlDom);
					if(opt.pagination) {
						_createPage();
					}
				}
			}

			successFnBak(originData);
		}
		return opt;
	}

	function _createPage(opt, totalPage) {	//创建分页

	}

	function pullUpAction () {
		var opt = opt_g;
		if(totalPage != opt.data.pageNo) {
			_send(opt);
		}else {
			dataAllLoaded = true;
			_refresh(myScroll);
		}
	}

	//iscroll
	function iScrollLoaded() {
		var opt = opt_g;
		if(myScroll) {
			return
		}

		pullUpEl = document.getElementById('pullUp');
		pullUpOffset = pullUpEl.offsetHeight;

		myScroll = new iScroll('wrapper_s', {
			useTransition: true,
			hScrollbar: false,
			vScrollbar: false,
//			bounce: false,
			onRefresh: function () {
				pullUpEl.className = '';
//				pullUpEl.querySelector('.pullUpLabel').innerHTML = dataAllLoaded ? '亲，没有更多内容了！' : '向下滑动，查看更多';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '';
			},
			onScrollMove: function () {
				if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
					pullUpEl.className = 'flip';
//					pullUpEl.querySelector('.pullUpLabel').innerHTML = '还不放手，我要加载数据了^_^';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '';
					this.maxScrollY = this.maxScrollY;
				}else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
					pullUpEl.className = '';
//					pullUpEl.querySelector('.pullUpLabel').innerHTML = '还不放手，我要加载数据了^_^';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '';
					this.maxScrollY = pullUpOffset;
				}
			},
			onScrollEnd: function () {
				if (pullUpEl.className.match('flip')) {	//上拉加载
	                pullUpEl.className = 'loading';
//	                pullUpEl.querySelector('.pullUpLabel').innerHTML = '数据加载中...';
	                pullUpEl.querySelector('.pullUpLabel').innerHTML = '';
	                pullUpAction(opt); // ajax
	            }
			}
		});

		setTimeout(function () { document.getElementById('wrapper_s').style.left = '0'; }, 800);
	}

	function _ajaxBefore(xhr) {
	    if($('#loadingToast').length > 0) {
	        return
        }
		$('body').append(loadingHTML);
	}

	function _ajaxComplete(xhr, pullRefresh) {
        $('#loadingToast').remove();
	}

	function _send(opt) {	//发送ajax
		if(opt.pagination) {
			opt.data["pageNo"] = pageNum;	//添加页码
		}
		$.ajax({
			url: opt.url,
			type: opt.type,
			async: opt.async,
			data: opt.data,
			headers: opt.headers,
			beforeSend: function(xhr) {
				opt.beforeFn(xhr);
			},
			success: function(data) {
				data = typeof data === 'string' ? $.parseJSON(data) : data;
				var res = data;
				if(opt.dataFilter && typeof opt.dataFilter === 'function') {
					res = opt.dataFilter(data);
				}
				opt.successFn(res, data);

				//是否上拉刷新
				if(opt.pagination) {
					if($("#pullUp").length == 0) {
						var scrollTip = '<div id="pullUp">'+
											'<span class="pullUpIcon"></span><span class="pullUpLabel">向下滑动，查看更多</span>'+
										'</div>';
						$(opt.targetDom).after(scrollTip);
					}

					iScrollLoaded(opt);	//初始化myScroll
					totalPage = data.data.totalPage;
					if(totalPage == pageNum) {	//当总页数等于当前页时 就不能继续上拉了
//						myScroll.refresh();
					}else {
						pageNum++;
					}
				}
				if(myScroll) {
					_refresh(myScroll);
				}


			},
			error: function(data) {
				opt.errorFn(data);
			},
			complete: function(data) {
				opt.completeFn(data);
			}
		});
	}

	function _refresh(myScroll) {
		setTimeout(function() {
			if(myScroll) {
				myScroll.refresh();	//延迟等待图片加载过来
				var x = myScroll.x;
//				var y = myScroll.y - 100;
				var y = myScroll.y;
				myScroll.scrollTo(x, y, 0);
			}
		},100);
	}

	function throttle(fn, delay, atleast) {

        var previous = null;

        return function () {
            var now = +new Date();

            if ( !previous ) previous = now;

            if ( now - previous > atleast ) {
                fn();
                // 重置上一次开始时间为本次结束时间
                previous = now;
            } else {
                clearTimeout(timer);
                timer = setTimeout(function() {
                    fn();
                }, delay);
            }
        }
    };

    //点击选人后保存用户的id
    function _account() {
    	var flagDom = $('.foeardre_list_sel');
    	var obj = {};
    	var _wxIdObj_ = $(document).data('ACCOUNT');
    	if(_.isObject(_wxIdObj_)) {
    		obj = _wxIdObj_;
    	}
    	flagDom.each(function(idx, ele) {
    		var $this = $(this);
    		var id = $this.data('id');
    		if($this.hasClass('cur')) {
        		if(!(id in obj)) {
        			obj[id] = 'cnt';
        		}
        	}else {
        		if(id in obj) {
        			delete obj[id];
        		}
        	}
    	})
    	$(document).data('ACCOUNT', obj);
    }

	window.util = {
		request: request,
		throttle: throttle,
		cnt: _account
	}

})(jQuery)
