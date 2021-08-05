const Dinero = require("dinero.js");
const getDB = require("../utils/dbConnect");
const formatTwoCommaPositions = require("../utils/formatCurrency");

class Response {
  constructor(
    totalPayment,
    netSalary,
    employeeDeductions,
    employeeCharges,
    employerContributions,
    employerForecast,
    gceFee,
    vat
  ) {
    this.total_payment = totalPayment;
    this.net_salary = netSalary;
    this.employee_deductions = employeeDeductions;
    this.employee_charges = employeeCharges;
    this.employer_contributions = employerContributions;
    this.employer_forecast = employerForecast;
    this.GCE_fee = gceFee;
    this.vat = vat;
  }
}

const calculateDeductions = (amount, currency, itemsToTax) => {};

const calculateCharges = (amount, currency, itemsToTax) => {
  const taxedItems = [];

  for (const item of itemsToTax) {
    const tax = {
      concept: item.name,
      value: item.value ? item.value : formatTwoCommaPositions(amount * item.percentage),
    };

    taxedItems.push(tax);
  }

  const totalTax = taxedItems.reduce((acc, tax) => acc + tax.value, 0);

  return { total: formatTwoCommaPositions(totalTax), taxedItems };
};

const calculatePayroll = async (country, amount, currency) => {
  const db = await getDB(country);

  const employeeDiscounts = calculateCharges(amount, currency, db.taxable_items.employee.deductions);
  const employeeCharges = calculateCharges(amount, currency, db.taxable_items.employee.charges);
  const employerCharges = calculateCharges(amount, currency, db.taxable_items.employer.charges);
  const payableForecast = calculateCharges(amount, currency, db.payable_forecast);

  const netPayable = formatTwoCommaPositions(amount - employeeDiscounts.total);

  const GCE_FEE = 550;
  const SERVICE_TAX = db.taxEIT;

  const totalPayment =
    netPayable + employeeCharges.total + employerCharges.total + payableForecast.total + GCE_FEE + GCE_FEE * SERVICE_TAX;

  const res = new Response(
    totalPayment,
    netPayable,
    employeeDiscounts,
    employeeCharges,
    employerCharges,
    payableForecast,
    GCE_FEE,
    GCE_FEE * SERVICE_TAX
  );

  return res;
};

module.exports = calculatePayroll;
