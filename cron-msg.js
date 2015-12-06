let spawn = require('child_process').spawn
let CronJob = require('cron').CronJob
let fs = require('fs')

let job = new CronJob({
  cronTime: '00 50 10 * 1-5',
  onTick: () => {
    let child = spawn('./write_message.sh', [])
    fs.readFile('./pidNumber.json', (err, data) => {
      if (err) throw err
      let dataObj = JSON.parse(data)
      let date = new Date()
      dataObj["lastCron"] = {'childPid': child.pid, 'date': date}
      fs.writeFile('./pidNumber.json', JSON.stringify(dataObj), (err, data) => {
        if (err) throw err
        console.log(data)
      })
    })
  },
  onComplete: null,
  start: false,
  timezone: 'Asia/Taipei'
})

job.start()
