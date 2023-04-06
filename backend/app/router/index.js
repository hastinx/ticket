const r_auth = require('./authRouter')
const r_event = require('./eventRouter')
const r_mst_event = require('./masterEventRouter')
module.exports = {
    route: [
        r_auth,
        r_event,
        r_mst_event
    ]
}