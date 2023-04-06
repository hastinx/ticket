const db = require('../../config/db.js')
const promiseDb = db.promise()

module.exports = {
    getAllEvent: async (req, res) => {
        const [result] = await promiseDb.query(`
        SELECT
         m_evt.id,
         m_evt.name,
         m_vn.name as venue,
         m_evt.price,
         m_evt.qty,
         m_evt.start_date as start,
         m_evt.end_date as end
        FROM mst_events m_evt 
        JOIN mst_venue m_vn ON m_evt.venue = m_vn.id 
        WHERE m_evt.qty > 0`)

        res.json({
            status: 200,
            values: result
        })
    },
    addEvent: async (req, res) => {
        const { name, price, venue, start_date, end_date, qty } = req.body

        const [result] = await promiseDb.query(`INSERT INTO mst_events (
            name,
            price,
            venue,
            qty,
            start_date,
            end_date,
            createdAt) 
        VALUES (
            '${name}',
            ${price},
            ${venue},
            ${qty},
            DATE(${start_date}),
            DATE(${end_date}),
            NOW()
        )
            `)


        res.json({
            status: 200,
            message: 'New event inserted successfully',
            values: result
        })
    },

    getAttendance: async (req, res) => {
        const [result] = await promiseDb.query(`SELECT usr.username FROM trx_event t_evt JOIN users usr ON t_evt.user_id = usr.id GROUP BY user_id`)

        res.json({
            status: 200,
            values: result
        })
    }
}