const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()



module.exports = {
  Query: {
    salary_records: async() => {
      const salary_records = await prisma.employee_salary.findMany()
      return salary_records
    },
    select_unarchived: async() => {
      const salary_records = await prisma.employee_salary.findMany({
        where: {
          archived: false
        }
      })
      return salary_records
    },
  },
}