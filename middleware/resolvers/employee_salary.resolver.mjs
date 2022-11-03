import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const dynamic_update_data = require('../../src/utils/dynamic_update_data.util')
const { server_config } = require('../../src/config/server.config')


const emp_salary_resolver = {
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
    select_archived: async() => {
      const salary_records = await prisma.employee_salary.findMany({
        where: {
          archived: true
        }
      })
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
    },
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
    },
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
      },
    },
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
