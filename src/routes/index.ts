var express = require('express')

const router = express.Router()

router.get('/', function (req: any, res: any, next: any) {
    console.log('requesting index.html')
    res.sendFile(__dirname + '/pages/index.html')
})

module.exports = router