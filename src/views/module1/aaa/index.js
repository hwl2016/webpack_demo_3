import 'assert/css/style.css';

$(function() {
    // $('.btn').click(function() {
    //     $.ajax({
    //         url: ajaxUrl + '/user/list',
    //         type: 'get',
    //     }).done(function(res) {
    //         console.log(res);
    //     }).fail(function() {
    //         console.log('ajax fail');
    //     })
    // });

    util.request({
        url: ajaxUrl + '/user/list',
        type: 'get',
        data: {

        },
        template: '#template',
        targetDom: '.data_list',
        pagination: true,
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
    })

    toolKit.toast('haha...')
})
