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
    unarchive: async(parent, args) => {
      try {
        const unarchived_record = prisma.employee_salary.update({
          where: {
            id: parseInt(args.id)
          },
          data: {
            archived: false
          }
        })
        return unarchived_record
      } catch (error) {
        return null
      }
    }
  }

}

export default emp_salary_resolver