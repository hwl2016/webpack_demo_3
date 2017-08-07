import $ from 'jquery';
import 'assert/style/reset.css';
import 'assert/style/style.css';

require('assert/js/rem')();

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