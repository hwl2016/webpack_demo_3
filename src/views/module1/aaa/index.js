import 'assert/css/style.css';

$(function() {
    util.request({
        url: ajaxUrl + '/user/list/',
        type: 'get',
        data: {

        },
        template: '#template',
        targetDom: '.data_list',
        pagination: true,
        loadingStatus: true,
        loadingText: '加载中...',
        dataFilter: function(res) {
            var list = res.data.users;
            var result = [];
            _.each(list, function(ele, index, list) {
                var obj = {};
                obj.id = ele.id;
                obj.name = ele.name;
                obj.age = ele.age;
                result.push(obj);
            })
            return result;
        },
        successFn: function(data) {
            console.log(data);
        }
    });

    $('.btn').click(e => {
        toolKit.toast('haha...')
    });
});
