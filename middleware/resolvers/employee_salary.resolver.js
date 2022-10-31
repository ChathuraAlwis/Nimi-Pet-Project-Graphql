const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()



module.exports = {
  Query: {
    salary_records: async() => {
      const salary_records = await prisma.employee_salary.findMany()
      return salary_records
    },
    select_archived: async() => {
      const salary_records = await prisma.employee_salary.findMany({
        where: {
          archived: true
        }
      })
      return salary_records
    },
  },
}