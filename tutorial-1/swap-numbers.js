let num1 = 123;
let num2 = 321;

console.log("The numbers are " + num1 + " and " + num2);

let temp = num1;
num1 = num2;
num2 = temp;

console.log(`After swapping the numbers become ${num1} and ${num2}`);