import { Customer, Admin } from './users';

const bill = new Customer('Bill', 'Smith', 'bill@gmail.com', 'bill');
const ana = new Admin('Ana', 'Georgieva', 'ana@gmail.com', 'ana');
document.getElementById('content').innerHTML = 
    `${bill.congratulation} <br>
     ${ana.congratulation}`;