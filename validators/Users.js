const { check, body } = require('express-validator')
const userDAO = require('../models/Users')

class Users {
  static validations() {
    return [
      check('name').isLength({ min: 5, max: 100 }).withMessage('The name field must have beetween 5 and 100 characters'),
      check('email').isEmail().withMessage("The E-mail must be in a valid format"),
      check('cpf').isLength({max: 11}).withMessage("The CPF must have 11 digits"),
      check("sex").isLength({max: 1}).withMessage("The sex must be F or M"),
      check("password").isLength({min: 6, max: 15}).withMessage("The password must have beetween 6 and 15 characters"),
      body('email').custom(email => {
        return userDAO.searchByEmail(email)
          .then(response => {
            if(response)
              return Promise.reject('E-mail is already registered')
          })
      })
    ]
  }
}

module.exports = Users