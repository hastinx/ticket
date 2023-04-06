const db = require('../../config/db.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    register: async (req, res) => {

        const { username, email, phone_number, password } = req.body;
        console.log(username, email, phone_number, password)
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)
        let exist = false;
        db.query(`SELECT * FROM users WHERE username = '${username}' OR email = '${email}'`, (err, result) => {
            if (result.length > 0) exist = true
        })

        console.log(exist)
        if (!exist) {
            db.query(`INSERT INTO users (username,email,phone_number,password) VALUES ('${username}','${email}','${phone_number}','${hashPass}')`, (err, result) => {
                if (err) return res.json({
                    status: 400,
                    message: err
                })
                return res.json({
                    status: 200,
                    message: 'Registration Successfully',
                    values: result
                })

            })
        } else {
            res.json({
                status: 400,
                message: 'Username or email already exist'
            })
        }



    },
    login: async (req, res) => {
        const { account, password } = req.body

        const promiseDb = db.promise();
        const [result, metadata] = await promiseDb.query(`SELECT * FROM users WHERE email='${account}' OR username='${account}' OR phone_number='${account}'`)
        console.log(result)
        console.log(account, password)
        if (result[0].is_wrong >= 3) {
            return res.json({
                status: 'error',
                message: "You are failed to login 3 times, your account would be suspended"
            })
        }
        const isvalid = await bcrypt.compare(password, result[0].password);

        if (!isvalid) {

            await promiseDb.query(`UPDATE users SET is_wrong= ${result[0].is_wrong + 1}  WHERE email='${account}' OR username='${account}' OR phone_number='${account}'`)
            return res.json({
                status: 'error',
                message: "Wrong password"
            })

        }

        const payload = { id: result[0].id, isAdmin: result[0].is_admin }
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" })

        res.status(200).send({
            status: true,
            message: "Login Succes",
            values: {
                id: result[0].id,
                username: result[0].username,
                email: result[0].email,
                is_admin: result[0].is_admin,
                token
            },

        })

    }
}