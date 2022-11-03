import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const { server_config } = require('../../src/config/server.config')


const emp_salary_resolver = {
  Query: {
    salary_records: async() => {
      const salary_records = await prisma.employee_salary.findMany()
      return salary_records
    },
    
    download_record: async(parent, args) => {
      const record_exists = await prisma.employee_salary.count({
        where: {
          id: parseInt(args.id)
        }
      })
      if (!record_exists) throw new Error("Record does not exists!")

      const download_link = {
        url: `http://localhost:${server_config.port}/employee_salary/download/${args.id}`
      }

      return download_link
    }
  },
}

export default emp_salary_resolver