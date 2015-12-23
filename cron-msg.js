import { mailOptions, transporter, randomizer, nameArr } from './mailer.js'
let CronJob = require('cron').CronJob
let fs = require('fs')
let job = new CronJob({
  cronTime: '30 55 18 * * 1-5',
  onTick: () => {
    mailOptions.from = `${randomizer(nameArr)} <lupin3.ken@gmail.com>`
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('error')
        return console.log(error)
      }
      console.log('Message sent: ' + info.response)
    })
    fs.readFile('./pidNumber.json', (err, data) => {
      if (err) throw err
      let dataObj = JSON.parse(data)
      let date = new Date()
      dataObj["lastCron"] = {'date': date}
      fs.writeFile('./pidNumber.json', JSON.stringify(dataObj), (err, data) => {
        if (err) throw err
      })
    })
  },
  onComplete: null,
  start: false
})

job.start()
