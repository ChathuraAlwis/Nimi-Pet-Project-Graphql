import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()



const emp_salary_resolver = {
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

export default emp_salary_resolver