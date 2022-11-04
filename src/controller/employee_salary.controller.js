const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

const salary_PDF_service = require('../services/salary-pdf.service')


const downloadSalaryPDF = async(req, res) => {
  try {
    const emp_data = await prisma.employee_salary.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment;filename=salary-details.pdf'
    })
    salary_PDF_service.createPDF(
        emp_data, 
        (chunk) => stream.write(chunk),
        () => stream.end()
    )
    console.log("PDF downloaded")
  } catch (error) {
    console.error(error)
    res.send(error.message)
  }
}

module.exports = {
  downloadSalaryPDF,
}