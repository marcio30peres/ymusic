const express = require('express');
const dotenv = require("dotenv")

dotenv.config()
const app = new express()

app.get('/', (request, response) => {
    response.status(200).send()
})

app.listen(process.env.PORT)

console.log(`YMusic's running!`)