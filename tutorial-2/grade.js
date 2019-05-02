process.stdout.write("Enter the score: ");

process.stdin.on("data", function(data) {
  const scoreString = data.toString().trim();
  //console.log("score(string): " + scoreString);
  const score = parseInt(scoreString);
  //console.log("score: " + score);
  if (isNaN(score)) {
    console.error("Not a number!");
    process.exit();
  }
  if (score >= 90 && score <= 100) {
    console.log("A");
  } else if (score >= 80 && score < 90) {
    console.log("B");
  } else if (score >= 70 && score < 80) {
    console.log("C");
  } else if (score >= 60 && score < 70) {
    console.log("D");
  } else if (score >= 50 && score < 60) {
    console.log("E");
  } else if (score >= 0 && score < 50) {
    console.log("Fail!");
  } else {
    console.error("Invalid score!");
  }
  process.exit();
});