const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()



module.exports = {
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
        return null
      }
    }
  }

}