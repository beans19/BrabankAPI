const { validationResult } = require('express-validator')
const usersIsValid = require('../validators/Users')

const users = (app) => {

  app.get('/', (req, res) => {
    res.send('Root route')
  })

  app.get('/users', (req, res) => {
    const userDAO = app.models.Users

    userDAO.list()
      .then(list => {
        res.send(list)
      })
      .catch(error => {
        console.log(error)
        res.status(500).send(error)
      })
  })

  app.post('/users',
    usersIsValid.validations(),
    (req, res) => {
      let user = req.body

      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(400).send(errors)
        return
      }

      const userDAO = app.models.Users

      userDAO.insert(user)
        .then(response => res.status(201).send(response))
        .catch(error => {
          console.log(error)
          res.status(500).send(error)
        })
    })
  
  app.get('/users/email/:email', (req, res) => {
    const email = req.params.email

    userDAO = app.models.Users

    userDAO.searchByEmail(email)
      .then(response => {
        if(response){
          res.send(response)
        }else{
          res.status(404).send()
        }
        res.send(response)
      })
      .catch(error => res.status(500).send(error))
  })
}

module.exports = users