let fs = require('fs')
let spawn = require('child_process').spawn,
    out = fs.openSync('./out.log', 'a'),
    err = fs.openSync('./out.log', 'a');

let child = spawn('babel-node', ['cron-msg.js'], {
  detached: true,
  stdio: ['ignore', 'ignore', err]
})
fs.writeFile('pidNumber.json', `{ "parentPid": ${child.pid} }`, (err) => {
  if (err) console.log('the json file with metadata failed to write')
  console.log('the json file with metadata is saved.')
  child.unref()
})
