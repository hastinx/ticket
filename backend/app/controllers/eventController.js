const db = require('../../config/db.js')
const promiseDb = db.promise()

module.exports = {
    getAllEvent: async (req, res) => {

        const [result, metadata] = await promiseDb.query(`
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
        WHERE m_evt.qty > 0
        `)

        res.json({
            status: 200,
            values: result
        })
    },
    checkoutEvent: async (req, res) => {
        const { user_id, event, total } = req.body

        console.log(user_id, event, total)


        await promiseDb.query(`INSERT INTO trx_event (user_id,createdAt) VALUES (${user_id},NOW())`);
        const [result] = await promiseDb.query(`SELECT id FROM trx_event WHERE user_id = ${user_id} ORDER BY id desc LIMIT 1`);

        event.forEach(i => {
            promiseDb.query(`INSERT INTO trx_event_detail (trx_id,event_id,price,createdAt) VALUES (${result[0].id}, ${i.id},${i.price},NOW())`);
            promiseDb.query(`UPDATE mst_events SET qty=qty-1 WHERE id=${i.id}`)
        });



        res.json({
            status: 200,
            message: 'Checkout Successfully'
        })
    },
    getAllTransactionByUser: async (req, res) => {


        const [result] = await promiseDb.query(`SELECT id,createdAt FROM trx_event WHERE user_id = ${req.params.id} `)

        console.log(result)

        res.json({
            status: 200,
            values: result
        })
    },
    getDetailById: async (req, res) => {
        console.log(req.params.id)
        const [result] = await promiseDb.query(`SELECT 
            t_evt_dtl.id, 
            evt.name, 
            evt.price, 
            m_vn.name as venue,
            evt.start_date as start, 
            evt.end_date as end
        FROM trx_event t_evt 
            JOIN trx_event_detail t_evt_dtl ON t_evt.id = t_evt_dtl.trx_id
            JOIN mst_events evt ON evt.id = t_evt_dtl.event_id
            JOIN mst_venue m_vn ON evt.venue = m_vn.id
        WHERE t_evt_dtl.trx_id = ${req.params.id}
        `)
        console.log(result)

        res.json({
            status: 200,
            values: result
        })
    },



}