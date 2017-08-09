import 'assert/css/style.css';

$(function() {
    $('.box-2 button').click(function() {
        $.ajax({
            url: ajaxUrl + '/user/list',
            type: 'get',
        }).done(function(res) {
            console.log(res);
        }).fail(function() {
            console.log('ajax fail');
        })
    });
})
