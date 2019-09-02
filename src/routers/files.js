const express = require('express')
// const fs = require('fs')

router = express.Router()

router.get('', (req, res) => {
    res.send('hi!')
})

router.post('/incoming_mail', (req, res) => {
    if (!req.body.plain) {
        console.log('No email body found.')
        return res.status(400).send()
    }
    try {
        const parsedLines = req.body.plain
            .split('\n')
            .filter((line) => line.includes(' - '))
            .map((line) => {
                pLine = line.match(/(\d+\/\d+) (\$\S{1,}) (.+$)/)
                return {
                    date: pLine[1],
                    spend: pLine[2],
                    description: pLine[3]
                }
            })
        data = JSON.stringify({data: parsedLines})
        console.log(data)
        res.send('thanks!')
    } catch {
        return res.status(500).send()
    }


    // fs.writeFileSync('data.json', data)
    // DONT want to write to file
    // everything that happens next has to happen inside this post request
    // b/c the email must trigger all events
    // next, need to use request to send json data (the "data" object) to python endpoint
    // see here: https://www.npmjs.com/package/request#multipartform-data-multipart-form-uploads

    
})





module.exports = router