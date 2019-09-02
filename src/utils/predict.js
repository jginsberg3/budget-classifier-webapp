const request = require('request')
const url = process.env.PREDICTION_URL

const predict = (formData, callback) => {
    const opts = {
        url,
        method: 'POST',
        json: formData
    }

    request(opts, (error, {body}) => {
        if (error) {
            callback('Unable to connect to prediction service!')
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = predict