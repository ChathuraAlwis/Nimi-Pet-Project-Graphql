const express = require('express')
const router = express.Router()
const { 
  downloadSalaryPDF,
} = require('../controller/employee_salary.controller')


router.get('/download/:id', downloadSalaryPDF) // download salary pdf by employee_salary.id column



module.exports = router