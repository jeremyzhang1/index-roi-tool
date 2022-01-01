export const calculate = ({
    startBalance,
    years,
    monthlyContribution,
    annualRate
  }) => {
    const result = [];
  
    let age = 1;
    let currentBalance = startBalance;
    const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12);
    while (age <= years) {
      for (let i = 0; i < 12; i++) {
        currentBalance =
          Math.round(currentBalance * monthlyRate) + monthlyContribution;
      }
      result.push({
        age,
        balance: currentBalance
      });
  
      age++;
    }
  
    return result;
  };
  