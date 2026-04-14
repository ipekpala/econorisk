const BASE_URL = "https://api.worldbank.org/v2";

type WorldBankEntry = {
  date: string;
  value: number | null;
};

type WorldBankResponse = [
  {
    page: number;
    pages: number;
    per_page: string;
    total: number;
  },
  WorldBankEntry[]
];

async function fetchIndicator(countryCode: string, indicator: string) {
  const url = `${BASE_URL}/country/${countryCode}/indicator/${indicator}?format=json&per_page=20`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch indicator ${indicator}`);
  }

  const data: WorldBankResponse = await res.json();

  if (!Array.isArray(data) || !Array.isArray(data[1])) {
    throw new Error(`Unexpected World Bank response for ${indicator}`);
  }

  return data[1];
}

function getLatestValue(rows: WorldBankEntry[]) {
  const latest = rows.find((row) => row.value !== null);
  return latest?.value ?? null;
}

export async function getCountryMacroData(countryCode: string) {
  const [inflationRows, unemploymentRows, growthRows, interestRows] =
    await Promise.all([
      fetchIndicator(countryCode, "FP.CPI.TOTL.ZG"),
      fetchIndicator(countryCode, "SL.UEM.TOTL.ZS"),
      fetchIndicator(countryCode, "NY.GDP.MKTP.KD.ZG"),
      fetchIndicator(countryCode, "FR.INR.RINR"),
    ]);

  return {
    inflation: getLatestValue(inflationRows),
    unemployment: getLatestValue(unemploymentRows),
    growth: getLatestValue(growthRows),
    interest: getLatestValue(interestRows),
    growthSeries: growthRows
      .filter((row) => row.value !== null)
      .slice(0, 5)
      .reverse()
      .map((row) => ({
        year: row.date,
        growth: row.value as number,
      })),
  };
}