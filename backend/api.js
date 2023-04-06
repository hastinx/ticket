const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config()

const router = require('./app/router')


const app = express()

app.use(cors())
app.use(express.json());


for (route of router.route) {
    app.use('/api', route)
}

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`)
})
