const connection = require('../config/connection')

class Users {
  list() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users'

      connection.query(sql, (error, response) => {
        if (error) {
          reject('Error: ' + error)
          return
        }

        console.log('Sucess executing query')
        resolve(response)
      })
    })
  }

  insert(user) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO users SET ?'

      connection.query(sql, user, (error, response) => {
        error ? reject("Insert failed. Error: " + error) : resolve(response)
      })
    })
  }

  searchByEmail(email){
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE email = ?'

      connection.query(sql, email, (error, response) => {
        if(error){
          reject('Cannot find user. Error: ' + error)
        }else{
          const user = response[0]
          resolve(user)
        }
      })
    })
  }
}

module.exports = new Users()