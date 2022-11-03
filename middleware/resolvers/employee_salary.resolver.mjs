import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
const create_record_util = require('../../utils/create-record.util')
const dynamic_update_data = require('../../src/utils/dynamic_update_data.util')
const { server_config } = require('../../src/config/server.config')

function streamToString (stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  })
}

const emp_salary_resolvers = {

  Upload: GraphQLUpload,

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
    },
    upload_csv: async(parent, { file }) => {
      let records = []
      
      const { createReadStream, mimetype } = await file
      if (mimetype != 'text/csv') throw new Error("Invalid File Type!")

      const stream = createReadStream()
      const content = await streamToString(stream)

      const lines = content.split('\r\n')

      for (let line_str in lines){
          const line = parseInt(line_str)
          const record = create_record_util(lines[line], line) // validates row and returns a object
          records.push(record)
      }

      const inserted_record_count = await prisma.employee_salary.createMany({
        data: records
      })

      return inserted_record_count

    }
  }
}


export default emp_salary_resolver
