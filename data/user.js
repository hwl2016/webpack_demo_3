const express = require('express');
const router = express.Router();

router.get('/list', (req, res, next) => {
    res.json({
        code: 200,
        msg: 'success',
        data: {
            users: [
                {
                    id: 1,
                    name: 'Tom',
                    age: 18
                },
                {
                    id: 2,
                    name: 'Mark',
                    age: 13
                },
                {
                    id: 3,
                    name: 'Smith',
                    age: 11
                },
                {
                    id: 4,
                    name: 'Jack',
                    age: 28
                },
                {
                    id: 5,
                    name: 'Ason',
                    age: 14
                }
            ]
        }
    })
});


module.exports = router;
