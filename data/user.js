const express = require('express');
const router = express.Router();
const Mock = require('mockjs');

router.get('/list', (req, res, next) => {
    let data = Mock.mock({
        code: 200,
        msg: 'success',
        data: {
            'users|10': [{
                'id': '@guid',
                'name': '@cname',
                'age|20-30': 1
            }]
        }
    });
    res.json(data)
});

module.exports = router;
