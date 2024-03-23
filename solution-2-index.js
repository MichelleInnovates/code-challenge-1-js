const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,   // sets input as standard input
  output: process.stdout, // sets output as standard output
});

function checkSpeed(speed) {
  const speedLimit = 70; // defines the speed limit
  const kmPerDemeritPoint = 5; // defines number of kilometers per demerit point

  if (speed <= speedLimit) {
    console.log('OK');
  } else {
    const demeritPoints = Math.floor((speed - speedLimit) / kmPerDemeritPoint); // calculate the demerit points

    if (demeritPoints >= 12) {
      console.log("License Expired");
    }

    console.log(`Demerit Points: ${demeritPoints}`); // print the demerit points
  }
}

rl.question('Enter the speed: ', (speed) => {
  // prompt the user to enter the speed
  checkSpeed(Number(speed));
  // call the checkSpeed function with the entered speed
  rl.close(); // close the interface
});
