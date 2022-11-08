import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const dynamic_update_data = require('../../src/utils/dynamic_update_data.util')
import { GraphQLError } from 'graphql';


const emp_salary_resolver = {
  Query: {
    salary_records: async() => {
      const salary_records = await prisma.employee_salary.findMany()
      return salary_records
    },
  },

  Mutation: {
    update: async(parent, args) => {
      try {
        const updated_record = await prisma.employee_salary.update({
          where:{
            id: parseInt(args.id)
          },
          data: dynamic_update_data(args)
        })
        return updated_record
      } catch (error) {
        throw new GraphQLError(error.meta.cause, {
          extensions:{
            success: false,
            error: {
              statusCode: 500,
              prismaErrorCode: error.code,
              message: "INTERNAL_SERVER_ERROR",
              stack: error.stack
            },
          }
        });
      }
    }
  }
}

export default emp_salary_resolver