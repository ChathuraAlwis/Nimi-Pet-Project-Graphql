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
  },

  Mutation: {
    delete_record: async(parent, args) => {
      try {
        const deleted_record = await prisma.employee_salary.delete({
          where: {
            id: parseInt(args.id)
          }
        })
        return deleted_record
      } catch (error) {
        throw new Error("Record Does not Exist!")
      }
    }
  }

}

export default emp_salary_resolver