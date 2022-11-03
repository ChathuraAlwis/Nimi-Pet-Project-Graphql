const PDFDocument = require('pdfkit')

function setDecimals(value){
    let str = value.toString()
    str = !str.includes(".") ? str+"." : str
    const str_length = str.split(".")[1].length
    return str_length == 0 ? str+'00' : str_length == 1 ? str+'0' : str
}

exports.createPDF = function(empData, dataCallback, endCallback){
    console.log(`creating PDF: emp_id=${empData.emp_id} month/year=${empData.month}/${empData.year}`)
    const dataX = 220
    const doc = new PDFDocument();

    doc.on('data', dataCallback);   // when data is available
    doc.on('end', endCallback);     // end of data 

    doc
    .fontSize(27)
    .text(`Salary Details of empId: ${empData.emp_id}`, 100, 100)
    .fontSize(15)
    .text('Name:', 100, 150)
    .text(empData.emp_name, dataX, 150)
    .text('Month:', 100, 200)
    .text(empData.month, dataX, 200)
    .text('Year:', 100, 250)
    .text(empData.year, dataX, 250)
    .text('Total Salary:', 100, 300)
    .text(setDecimals(empData.total_salary), dataX, 300)
    .text('EPF:', 100, 350)
    .text(setDecimals(empData.epf), dataX, 350)
    .text('ETF:', 100, 400)
    .text(setDecimals(empData.etf), dataX, 400)
    .text('Tax Reduction:', 100, 450)
    .text(setDecimals(empData.tax_reduction), dataX, 450)
    .text('Other Reduction:', 100, 500)
    .text(setDecimals(empData.other_reduction), dataX, 500)
    .text('Net Salary:', 100, 550)
    .text(setDecimals(empData.net_salary), dataX, 550)
    ;

    doc.end();
}
