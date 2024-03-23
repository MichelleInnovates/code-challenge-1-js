const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Tax rates based on income brackets
const taxRates = [
  { minIncome: 0, maxIncome: 24000, rate: 0.1 },
  { minIncome: 24001, maxIncome: 32333, rate: 0.25 },
  { minIncome: 32334, maxIncome: 500000, rate: 0.3 },
  { minIncome: 500001, maxIncome: 800000, rate: 0.325 },
  { minIncome: 800001, maxIncome: Infinity, rate: 0.35 }
];

// NHIF deductions based on gross salary
const nhifDeductions = [
  { minSalary: 0, maxSalary: 5999, deduction: 150 },
  { minSalary: 6000, maxSalary: 7999, deduction: 300 },
  // Add more NHIF deduction brackets as needed
];

// Function to calculate PAYE (Tax) based on taxable income
function calculatePAYE(taxableIncome) {
  let tax = 0;
  for (let i = 0; i < taxRates.length; i++) {
    if (taxableIncome > taxRates[i].minIncome) {
      const max = taxRates[i].maxIncome === Infinity ? taxableIncome : taxRates[i].maxIncome;
      tax += (Math.min(taxableIncome, max) - taxRates[i].minIncome) * taxRates[i].rate;
    } else {
      break;
    }
  }
  return tax;
}

// Function to calculate NHIF deductions based on gross salary
function calculateNHIFDeduction(grossSalary) {
  for (let i = 0; i < nhifDeductions.length; i++) {
    if (grossSalary >= nhifDeductions[i].minSalary && grossSalary <= nhifDeductions[i].maxSalary) {
      return nhifDeductions[i].deduction;
    }
  }
  return 0; // Default to 0 if gross salary does not fall into any bracket
}

// Function to calculate net salary
function calculateNetSalary(grossSalary, contributionBenefit) {
  const paye = calculatePAYE(grossSalary);
  const nhifDeduction = calculateNHIFDeduction(grossSalary);
  
  // Calculate net salary
  const netSalary = grossSalary + contributionBenefit - paye - nhifDeduction;

  return netSalary;
}

// Obtain user input
rl.question('Enter gross salary: ', (grossSalary) => {
  rl.question('Enter contribution benefit: ', (contributionBenefit) => {
    // Parse input values to numbers
    grossSalary = parseFloat(grossSalary);
    contributionBenefit = parseFloat(contributionBenefit);

    // Calculate and display net salary
    const netSalary = calculateNetSalary(grossSalary, contributionBenefit);
    console.log(`Net Salary: ${netSalary}`);

    // Close the readline interface after obtaining all necessary input
    rl.close();
  });
});
