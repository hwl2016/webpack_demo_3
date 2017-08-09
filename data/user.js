const express = require('express');
const router = express.Router();
const Mock = require('mockjs');

router.get('/list', (req, res, next) => {
    let data = Mock.mock({
        code: 200,
        message: 'success',
        data: {
            "totalCount": 50,
            "pageNo": 1,
            "pageSize": 10,
            "totalPage": 5,
            'users|10': [{
                'id|+1': '10000',
                'name': '@cname',
                'age|20-30': 1
            }]
        }
    });
    res.json(data)
});

module.exports = router;
