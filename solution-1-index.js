


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt the user to input the student's marks
rl.question("Enter the student's marks: ", (marks) => {
  // Ensure input is a valid number between 0 to 100
  marks = parseInt(marks); // Convert input to an integer
  if (isNaN(marks) || marks < 0 || marks > 100) {
    console.log("Invalid input. Please enter a valid number between 0 and 100.");
    rl.close();
    return;
  }

  // Determine grade based on provided range
  let grade;
  if (marks > 79) {
    grade = 'A';
  } else if (marks >= 60) {
    grade = 'B';
  } else if (marks >= 40) {
    grade = 'C';
  } else if (marks >= 35) {
    grade = 'D'; // Adjusted range for grade D
  } else {
    grade = 'E';
  }

  console.log('The student grade is: ' + grade);
  rl.close();
});
