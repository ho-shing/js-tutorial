const fs = require("fs");
const readline = require("readline");

let inputFilename = "weather-c.csv";

if (process.argv.length > 2) {
  if (process.argv[2] === "f") {
    inputFilename = "weather-f.csv";
  }
}

const fileReadStream = fs.createReadStream(inputFilename);
const fileWriteStream = fs.createWriteStream("weather-out.csv");

const rl = readline.createInterface({
  input: fileReadStream
});

let scale; //'f' or 'c'
let lineNumber = 0;

rl.on('line', (line) => {
  lineNumber++;
  if (lineNumber === 1) {
    scale = getScale(line);
    writeFirstLine();
  } else if (scale) {
    processLine(line);
  }
});

/**
 * Get the scale of temperature
 * @param {string} line The first line
 * @return {string} 'c' or 'f'. Empty string if a valid scale is not found
 */
function getScale(line) {
  const data = line.split(",");
  if (data.length !== 2) {
    return "";
  }
  if (data[0].toLowerCase() === "city") {
    const temperatureString = data[1].trim().toLowerCase();
    const scale = temperatureString.charAt(temperatureString.length - 2);
    return scale;
  }
  return "";
}

/**
 * Write the first line to the output file
 */
function writeFirstLine() {
  const outputScale = scale === 'c' ? 'F' : 'C';
  fileWriteStream.write(`City, Temperature(${outputScale})\n`);
}

function processLine(line) {
  const data = line.split(",");
  if (data.length !== 2) {
    return;
  }
  let convertedDegree;
  const degree = parseFloat(data[1]);
  switch (scale) {
    case 'c':
      convertedDegree = convertCToF(degree);
      break;
    case 'f':
      convertedDegree = convertFToC(degree);
      break;
  }
  console.log(`${data[0]}, ${convertedDegree.toFixed(1)}`);
  fileWriteStream.write(`${data[0]}, ${convertedDegree.toFixed(1)}\n`);
}

/**
 * Celsius to Fahrenheit conversion
 * @param {number} degreeC Degree in Celsius
 * @return {number} Degree in Fahrenheit
 */
function convertCToF(degreeC) {
  return degreeC * 9 / 5 + 32;
}

/**
 * Fahrenheit to Celsius conversion
 * @param {number} degreeF Degree in Fahrenheit
 * @return {number} Degree in Celsius
 */
function convertFToC(degreeF) {
  return (degreeF - 32) * 5.0 / 9.0;
}