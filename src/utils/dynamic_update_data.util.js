module.exports = function data(args){

  const d = {}
  args_type = {
    emp_id: parseInt,
    month: parseInt,
    year: parseInt,
    total_salary: parseFloat,
    epf: parseFloat,
    etf: parseFloat,
    tax_reduction: parseFloat,
    other_reduction: parseFloat,
  }

  Object.keys(args).filter(key => key != "id" && args[key] != null).forEach(key => {
    d[key] = key != "emp_name" ? args_type[key](args[key]) : args[key]
  });

  return d
}