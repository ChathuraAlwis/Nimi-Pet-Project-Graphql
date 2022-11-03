import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const dynamic_update_data = require('../../src/utils/dynamic_update_data.util')


const emp_salary_resolver = {
  Query: {
    salary_records: async() => {
      const salary_records = await prisma.employee_salary.findMany()
      return salary_records
    },
  },

  Mutation: {
    update: async(parent, args) => {
      const record_exists = await prisma.employee_salary.count({where: {id: parseInt(args.id)}})
      if (!record_exists) throw new Error("Record doesn't exists!")
      const updated_record = await prisma.employee_salary.update({
        where:{
          id: parseInt(args.id)
        },
        data: dynamic_update_data(args)
      })
      return updated_record
    }
  }
}

export default emp_salary_resolver