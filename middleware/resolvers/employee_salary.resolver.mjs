import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
const create_record_util = require('../../utils/create-record.util')

function streamToString (stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  })
}

const emp_salary_resolver = {

  Upload: GraphQLUpload,

  Query: {
    salary_records: async() => {
      const salary_records = await prisma.employee_salary.findMany()
      return salary_records
    },
    
    
  },

  Mutation: {
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