let exec = require('child_process').exec
let child = null
let CronJob = require('cron').CronJob
child = () => {
  return exec('./write_message.sh', (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
    if (error !== null) {
      console.log(`exec error: ${error}`)
    }
  })
}

let job = new CronJob({
  cronTime: '00 50 10 * * 1-5',
  onTick: () => {
    child()
  },
  onComplete: null,
  start: false,
  timezone: 'Asia/Taipei'
})
job.start()



