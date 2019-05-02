let lowerBound = 1;
let upperBound = 100;
const secret = Math.floor(Math.random() * 100) + 1;
let count = 0;

//console.log(`secret: ${secret}`);
console.log(`The number is between ${lowerBound} and ${upperBound}. Enter a number:`);

process.stdin.on("data", function(data) {
  let number;
  try {
    number = parseInput(data);
  } catch (e) {
    console.error(e.message);
    console.log("Enter a number again:");
    return;
  }

  count++;

  if (number === secret) {
    console.log(`Congratulations! The secret number is ${secret}. You have made ${count} guesses.`);
    process.exit();
  } else if (number < secret) {
    lowerBound = number + 1;
  } else { //number > secret
    upperBound = number - 1;
  }
  console.log(`The number is between ${lowerBound} and ${upperBound}. Enter a number:`);
});

function parseInput(userInput) {
  const str = userInput.toString().trim();
  const number = parseInt(str);
  if (isNaN(number)) {
    throw new Error("Not a number!");
  }
  if (number < lowerBound || number > upperBound) {
    throw new Error(`The number must be between ${lowerBound} and ${upperBound}`);
  }
  return number;
}