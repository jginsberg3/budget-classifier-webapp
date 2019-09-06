const fs = require('fs')
const express = require('express')
const ObjectsToCsv = require('objects-to-csv')
const predict = require('../utils/predict')
const sendResultEmail = require('../emails/result')

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
        const sender = req.body.envelope.from
        const parsedLines = req.body.plain
            .split('\n')
            .filter((line) => line.includes('$'))
            .map((line) => {
                pLine = line.match(/(\d+\/\d+) (\$\S{1,}) (.+$)/)
                return {
                    date: pLine[1],
                    spend: pLine[2],
                    description: pLine[3]
                }
            })
        const data = {data: parsedLines}

        predict(data, async (error, body) => {
            const predictions = body

            const csv = new ObjectsToCsv(predictions)
            const flName = './predictions.csv'
            await csv.toDisk(flName)

            sendResultEmail(sender, flName)
            fs.unlinkSync(flName)
        })

        res.send('thanks!')
    } catch {
        return res.status(500).send()
    }
})

module.exports = router