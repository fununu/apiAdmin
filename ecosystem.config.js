module.exports = {
    apps: [{
        name: 'app',
        script: './bin/app.js',
        instances: 0,
        exec_mode: 'cluster',
        wait_ready: true,
        listen_timeout: 30000,
        kill_timeout: 5000
    }]
  }