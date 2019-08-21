module.exports = {

    index: (req, res) => {
        res.render('auth/index');
    },

    submitLogin : (req, res) => {
        var connection = require('../config/db');
        var username = req.body.username;
        var password = req.body.password;

        connection.query('SELECT * FROM t_users WHERE username = ? AND password = ?', [username, password],
        function (error, results, fields) {
            if (error) {
                res.send({
                    "CODE": 400,
                    "STATUS": "ERROR",
                    "MESSAGE": "UNEXPECTED HTTP ERROR OCCURRED"
                })
            } else {
                if (results.length > 0) {
                    if (results[0].password == password) {
                        res.send({
                            "CODE": 200,
                            "STATUS": "OK",
                            "MESSAGE": "AKSES LOGIN DIIJINKAN"
                        });
                    } else {
                        res.send({
                            "CODE": 204,
                            "STATUS": "ERROR",
                            "MESSAGE": "USERNAME ATAU PASSWORD SALAH"
                        });
                    }
                } else {
                    res.send({
                        "CODE": 204,
                        "STATUS": "ERROR",
                        "MESSAGE": "AKUN TIDAK DITEMUKAN"
                    });
                }
            }
        });
    }
};