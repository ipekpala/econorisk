import { NextRequest, NextResponse } from "next/server";
import { getCountryMacroData } from "../../lib/worldBank";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");

  if (!country) {
    return NextResponse.json(
      { error: "Missing country parameter" },
      { status: 400 }
    );
  }

  try {
    const data = await getCountryMacroData(country);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Macro route error:", error);

    return NextResponse.json(
      { error: "Failed to fetch macro data" },
      { status: 500 }
    );
  }
}