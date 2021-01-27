import Dinero, { Dinero as DineroType } from 'dinero.js';
const getDB = require("./utils");

console.log(getDB());


const calculateEmployeeDiscount = (amount: DineroType, itemsToDiscount: Array<object>): DineroType => {

  return Dinero({ amount: 5000, currency: 'EUR' });
}