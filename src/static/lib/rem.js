function rem() {
    var fontSize = 10;	//根字体的大小
    var psdSize = 768;
    var phoneSize = psdSize / 2;
    var maxSize = '140px';
    var minSize = '85.333px';

    var docEl = document.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            if(fontSize * (docEl.clientWidth / phoneSize) <= minSize) {
                docEl.style.fontSize = minSize;
            }else if(fontSize * (docEl.clientWidth / phoneSize) > maxSize) {
                docEl.style.fontSize = maxSize;
            }else {
                docEl.style.fontSize = fontSize * (docEl.clientWidth / phoneSize) + 'px';
            }
            document.body.style.display = 'block';  //解决页面闪动
        };
    if(window.addEventListener) {
        window.addEventListener(resizeEvt, recalc, false);
        document.addEventListener('DOMContentLoaded', recalc, false);
    }
}

rem();
