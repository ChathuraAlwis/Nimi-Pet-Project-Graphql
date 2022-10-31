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
    archive: async(parent, args) => {
      try {
        const archived_record = await prisma.employee_salary.update({
          where: {
            id: parseInt(args.id)
          },
          data: {
            archived: true
          }
        })
        return archived_record
      } catch (error) {
        return null
      }
    }
  }

}