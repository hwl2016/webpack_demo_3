import $ from 'jquery';
import {baseUrl, ajaxUrl} from 'assert/js/config';
import 'assert/style/reset.css';
import 'assert/style/style.css';

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
