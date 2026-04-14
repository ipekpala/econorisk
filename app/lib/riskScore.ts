export function calculateRisk(country: any) {
  let score = 0;

  score += Math.min(country.inflation / 2, 30);
  score += Math.min(country.interest / 2, 20);
  score += Math.min(country.unemployment * 2, 20);
  score += Math.min((5 - country.growth) * 3, 15);

  return Math.round(score);
}

export function getRiskLevel(score: number) {
  if (score < 25) return "Low";
  if (score < 50) return "Medium";
  if (score < 75) return "High";
  return "Critical";
}

export function getRiskBreakdown(country: any) {
  const inflationScore = Math.min(country.inflation / 2, 30);
  const interestScore = Math.min(country.interest / 2, 20);
  const unemploymentScore = Math.min(country.unemployment * 2, 20);
  const growthScore = Math.min((5 - country.growth) * 3, 15);

  const drivers = [
    { label: "Inflation", score: inflationScore },
    { label: "Interest Rate", score: interestScore },
    { label: "Unemployment", score: unemploymentScore },
    { label: "Growth Weakness", score: growthScore },
  ];

  const mainDriver = [...drivers].sort((a, b) => b.score - a.score)[0];

  const explanations: string[] = [];

  if (country.inflation > 20) {
    explanations.push(
      "Inflation is significantly elevated and is the main source of macroeconomic pressure."
    );
  }

  if (country.interest > 15) {
    explanations.push(
      "Interest rates are high, suggesting monetary tightening and financial stress."
    );
  }

  if (country.unemployment > 8) {
    explanations.push(
      "Unemployment adds labor market pressure and weakens economic resilience."
    );
  }

  if (country.growth < 2) {
    explanations.push(
      "Weak growth reduces the economy’s ability to absorb shocks."
    );
  }

  if (explanations.length === 0) {
    explanations.push(
      "Macroeconomic conditions appear relatively stable based on the selected indicators."
    );
  }

  return {
    drivers,
    mainDriver,
    explanations,
  };
}