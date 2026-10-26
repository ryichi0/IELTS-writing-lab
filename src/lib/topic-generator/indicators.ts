export type ChartKind = "BAR_CHART" | "LINE_GRAPH" | "TABLE";

export type Indicator = {
  code: string; // کد شاخص در World Bank
  unit: string;
  // عبارت داخل جمله: "the percentage of ..." و مانند آن
  subject: string;
  kinds: ChartKind[];
};

export const INDICATORS: Indicator[] = [
  { code: "EG.USE.ELEC.KH.PC", unit: "kWh per person", subject: "electricity consumption per person", kinds: ["BAR_CHART", "LINE_GRAPH", "TABLE"] },
  { code: "IT.NET.USER.ZS", unit: "% of population", subject: "the percentage of the population using the internet", kinds: ["BAR_CHART", "LINE_GRAPH", "TABLE"] },
  { code: "SP.URB.TOTL.IN.ZS", unit: "% of population", subject: "the percentage of the population living in urban areas", kinds: ["BAR_CHART", "LINE_GRAPH", "TABLE"] },
  { code: "SP.DYN.LE00.IN", unit: "years", subject: "life expectancy at birth", kinds: ["BAR_CHART", "LINE_GRAPH", "TABLE"] },
  { code: "EN.ATM.CO2E.PC", unit: "metric tons per person", subject: "carbon dioxide emissions per person", kinds: ["BAR_CHART", "LINE_GRAPH", "TABLE"] },
  { code: "AG.LND.FRST.ZS", unit: "% of land area", subject: "the percentage of land covered by forest", kinds: ["BAR_CHART", "LINE_GRAPH", "TABLE"] },
  { code: "SE.XPD.TOTL.GD.ZS", unit: "% of GDP", subject: "government spending on education as a percentage of GDP", kinds: ["BAR_CHART", "LINE_GRAPH", "TABLE"] },
  { code: "SH.XPD.CHEX.GD.ZS", unit: "% of GDP", subject: "health spending as a percentage of GDP", kinds: ["BAR_CHART", "LINE_GRAPH", "TABLE"] },
  { code: "SP.DYN.TFRT.IN", unit: "births per woman", subject: "the average number of births per woman", kinds: ["BAR_CHART", "LINE_GRAPH", "TABLE"] },
  { code: "SL.UEM.TOTL.ZS", unit: "% of labour force", subject: "the unemployment rate", kinds: ["BAR_CHART", "LINE_GRAPH", "TABLE"] },
  { code: "SP.POP.65UP.TO.ZS", unit: "% of population", subject: "the percentage of the population aged 65 and above", kinds: ["BAR_CHART", "LINE_GRAPH", "TABLE"] },
  { code: "NY.GDP.PCAP.CD", unit: "US$ per person", subject: "GDP per person", kinds: ["BAR_CHART", "LINE_GRAPH", "TABLE"] },
];

export const COUNTRIES: Record<string, string> = {
  JPN: "Japan",
  DEU: "Germany",
  BRA: "Brazil",
  CAN: "Canada",
  AUS: "Australia",
  FRA: "France",
  ITA: "Italy",
  ESP: "Spain",
  KOR: "South Korea",
  MEX: "Mexico",
  TUR: "Turkey",
  POL: "Poland",
  SWE: "Sweden",
  NOR: "Norway",
  CHN: "China",
  IND: "India",
  GBR: "the United Kingdom",
  USA: "the United States",
};