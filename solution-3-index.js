
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const taxRates = [
  { minIncome: 0, maxIncome: 24000, rate: 0.1 },
  { minIncome: 24001, maxIncome: 32333, rate: 0.25 },
  { minIncome: 32334, maxIncome: 500000, rate: 0.3 },
  { minIncome: 500001, maxIncome: 800000, rate: 0.325 },
  { minIncome: 800001, maxIncome: Infinity, rate: 0.35 }
];

const deductions = {
  NHIF: [
    { minSalary: 0, maxSalary: 5999, deduction: 150 },
    { minSalary: 6000, maxSalary: 7999, deduction: 300 }
  ],
  NSSF: [
    { minSalary: 0, maxSalary: 6000, deduction: 100 },
    { minSalary: 6001, maxSalary: 7999, deduction: 150 },
    { minSalary: 8000, maxSalary: 11999, deduction: 200 },
    { minSalary: 12000, maxSalary: 14999, deduction: 250 },
    { minSalary: 15000, maxSalary: 36000, deduction: 300 }
  ]
};

function calculateDeduction(deductionType, grossSalary) {
  const applicableDeductions = deductions[deductionType];
  for (let i = 0; i < applicableDeductions.length; i++) {
    if (grossSalary >= applicableDeductions[i].minSalary && grossSalary <= applicableDeductions[i].maxSalary) {
      return applicableDeductions[i].deduction;
    }
  }
  return 0;
}

function calculateTaxableIncome(grossSalary) {
  const nssfDeduction = calculateDeduction('NSSF', grossSalary);
  const nhifDeduction = calculateDeduction('NHIF', grossSalary);
  const taxableIncome = grossSalary - nssfDeduction - nhifDeduction;
  return taxableIncome;
}

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

function calculateNetSalary(grossSalary, contributionBenefit) {
  const taxableIncome = calculateTaxableIncome(grossSalary);
  const paye = calculatePAYE(taxableIncome);
  const netSalary = grossSalary + contributionBenefit - paye;
  return netSalary;
}

rl.question('Enter gross salary: ', (grossSalary) => {
  rl.question('Enter contribution benefit: ', (contributionBenefit) => {
    grossSalary = parseFloat(grossSalary);
    contributionBenefit = parseFloat(contributionBenefit);

    const netSalary = calculateNetSalary(grossSalary, contributionBenefit);
    console.log(`Net Salary: ${netSalary}`);

    rl.close();
  });
});