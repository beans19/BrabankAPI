const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '18.206.203.156',
  port: 3306,
  user: 'felipe',
  password: '',
  database: 'brabankapi'
})

module.exports = connection