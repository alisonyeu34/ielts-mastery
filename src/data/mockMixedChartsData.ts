/**
 * Mock Data for Mixed Charts Studio (IELTS Writing Task 1 - Step 77)
 * Authentic Multi-Graph Syntheses: Bar-Line, Pie-Table, Bar-Pie, Table-Line
 */

export interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
  category?: string;
  unit?: string;
}

export interface ChartSpecification {
  id: "chart_1" | "chart_2";
  type: "bar" | "line" | "pie" | "table";
  title: string;
  unit: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  data: ChartDataPoint[];
  tableHeaders?: string[];
  tableRows?: { entity: string; col1: string | number; col2: string | number; col3?: string | number }[];
}

export interface DataCluster {
  id: string;
  title: string;
  chart1Points: string[];
  chart2Points: string[];
  synthesisObservation: string;
  suggestedBodyParagraph: 1 | 2;
  higherOrderLexis: string;
}

export interface MixedChartTask {
  id: string;
  title: string;
  topic: string;
  difficulty: "Band 6.5 - 7.0" | "Band 7.5 - 8.0" | "Band 8.5+";
  prompt: string;
  chart1: ChartSpecification;
  chart2: ChartSpecification;
  chart1Keywords: string[];
  chart2Keywords: string[];
  clusters: DataCluster[];
  dualOverviewPoints: {
    chart1Trend: string;
    chart2Trend: string;
    synthesisLink: string;
  };
  band85ModelEssay: {
    introduction: string;
    overview: string;
    body1: string;
    body2: string;
    fullText: string;
    wordCount: number;
    keySynthesisMarkers: string[];
  };
}

export const MOCK_MIXED_CHARTS: MixedChartTask[] = [
  {
    id: "task1_mixed_energy_emissions",
    title: "Renewable Power & Carbon Reductions (2010 - 2020)",
    topic: "Energy & Environmental Economics",
    difficulty: "Band 7.5 - 8.0",
    prompt: "The bar chart illustrates renewable electricity generation (in Gigawatt-hours) across four European countries in 2010 and 2020, while the line graph depicts the percentage reduction in industrial carbon emissions over the same decade.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chart1Keywords: ["generation", "electricity", "gigawatt", "gwh", "germany", "sweden", "spain", "poland", "renewable", "power"],
    chart2Keywords: ["emissions", "carbon", "reduction", "decrease", "industrial", "percentage", "co2", "drop", "curtailment"],
    chart1: {
      id: "chart_1",
      type: "bar",
      title: "Renewable Electricity Output (GWh)",
      unit: "Gigawatt-hours (GWh)",
      xAxisLabel: "Country",
      yAxisLabel: "Output (GWh)",
      data: [
        { label: "Germany", value: 105, secondaryValue: 250 },
        { label: "Sweden", value: 75, secondaryValue: 140 },
        { label: "Spain", value: 60, secondaryValue: 110 },
        { label: "Poland", value: 20, secondaryValue: 35 }
      ]
    },
    chart2: {
      id: "chart_2",
      type: "line",
      title: "Carbon Emission Curtailment (2010 - 2020)",
      unit: "% Reduction in CO2",
      xAxisLabel: "Year",
      yAxisLabel: "% Cut",
      data: [
        { label: "2010", value: 5, category: "Germany" },
        { label: "2015", value: 22, category: "Germany" },
        { label: "2020", value: 48, category: "Germany" },
        { label: "2010", value: 12, category: "Sweden" },
        { label: "2015", value: 28, category: "Sweden" },
        { label: "2020", value: 42, category: "Sweden" },
        { label: "2010", value: 4, category: "Spain" },
        { label: "2015", value: 15, category: "Spain" },
        { label: "2020", value: 26, category: "Spain" },
        { label: "2010", value: 2, category: "Poland" },
        { label: "2015", value: 6, category: "Poland" },
        { label: "2020", value: 11, category: "Poland" }
      ]
    },
    clusters: [
      {
        id: "cluster_leaders",
        title: "High-Adoption Nations (Germany & Sweden)",
        chart1Points: ["Germany 105 -> 250 GWh (> twofold surge)", "Sweden 75 -> 140 GWh"],
        chart2Points: ["Germany 48% CO2 cut", "Sweden 42% CO2 cut"],
        synthesisObservation: "A direct positive correlation: Germany and Sweden led in renewable generation and simultaneously registered the steepest carbon emission curtailment (>40%).",
        suggestedBodyParagraph: 1,
        higherOrderLexis: "more than doubled, coincided with a steep curtailment, outstripped"
      },
      {
        id: "cluster_lagging",
        title: "Moderate to Laggard Nations (Spain & Poland)",
        chart1Points: ["Spain 60 -> 110 GWh", "Poland 20 -> 35 GWh"],
        chart2Points: ["Spain 26% cut", "Poland 11% cut"],
        synthesisObservation: "In stark contrast, Poland's marginal renewable output of 35 GWh in 2020 mirrored its sluggish 11% emission reduction.",
        suggestedBodyParagraph: 2,
        higherOrderLexis: "mirrored by a modest reduction, dwarfed by, in inverse proportion"
      }
    ],
    dualOverviewPoints: {
      chart1Trend: "Renewable energy production expanded across all four surveyed nations over the 10-year span, with Germany maintaining clear dominance.",
      chart2Trend: "Industrial carbon emissions decreased universally, with the steepest drops observed in countries with higher green power adoption.",
      synthesisLink: "A clear positive correlation emerges between clean energy capacity and the velocity of carbon abatement."
    },
    band85ModelEssay: {
      introduction: "The bar chart delineates renewable electricity generation across Germany, Sweden, Spain, and Poland in 2010 and 2020, while the accompanying line graph illustrates the percentage reduction in industrial carbon emissions over the identical ten-year timeline.",
      overview: "Overall, it is noticeable that green electricity output expanded universally across all four European countries, led decisively by Germany. Furthermore, carbon emission curtailment was positively correlated with renewable capacity, with the highest clean energy producers recording the most pronounced environmental gains.",
      body1: "Regarding the top clean energy producers, Germany's renewable generation more than doubled from 105 GWh in 2010 to 250 GWh in 2020, maintaining the lion's share of total output. This surge coincided with a dramatic 48% reduction in its industrial carbon emissions by 2020. Similarly, Sweden witnessed its green electricity rise substantially from 75 GWh to 140 GWh, which corresponded to a 42% decrease in greenhouse discharges, starting from an initial 12% cut in 2010.",
      body2: "In stark contrast, the remaining two nations registered more moderate figures. Spain's renewable generation almost doubled from 60 GWh to 110 GWh, yielding a 26% curtailment in emissions. Meanwhile, Poland's clean energy output remained marginal, growing from 20 GWh to 35 GWh—a figure dwarfed by Germany's output. Consequently, Poland achieved merely an 11% reduction in carbon footprint over the surveyed decade.",
      fullText: "The bar chart delineates renewable electricity generation across Germany, Sweden, Spain, and Poland in 2010 and 2020, while the accompanying line graph illustrates the percentage reduction in industrial carbon emissions over the identical ten-year timeline.\n\nOverall, it is noticeable that green electricity output expanded universally across all four European countries, led decisively by Germany. Furthermore, carbon emission curtailment was positively correlated with renewable capacity, with the highest clean energy producers recording the most pronounced environmental gains.\n\nRegarding the top clean energy producers, Germany's renewable generation more than doubled from 105 GWh in 2010 to 250 GWh in 2020, maintaining the lion's share of total output. This surge coincided with a dramatic 48% reduction in its industrial carbon emissions by 2020. Similarly, Sweden witnessed its green electricity rise substantially from 75 GWh to 140 GWh, which corresponded to a 42% decrease in greenhouse discharges, starting from an initial 12% cut in 2010.\n\nIn stark contrast, the remaining two nations registered more moderate figures. Spain's renewable generation almost doubled from 60 GWh to 110 GWh, yielding a 26% curtailment in emissions. Meanwhile, Poland's clean energy output remained marginal, growing from 20 GWh to 35 GWh—a figure dwarfed by Germany's output. Consequently, Poland achieved merely an 11% reduction in carbon footprint over the surveyed decade.",
      wordCount: 196,
      keySynthesisMarkers: ["positively correlated", "more than doubled", "lion's share", "coincided with a dramatic", "corresponded to", "in stark contrast", "dwarfed by"]
    }
  },
  {
    id: "task1_mixed_water_costs",
    title: "Global Water Consumption by Sector & Municipal Tariffs",
    topic: "Resource Economics & Utilities",
    difficulty: "Band 8.5+",
    prompt: "The pie chart displays the proportion of global water consumption allocated to three main sectors in 2022, whilst the table compares municipal water tariffs per cubic meter and residential consumption in five major regions.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chart1Keywords: ["agriculture", "industry", "domestic", "consumption", "usage", "proportion", "share", "sector", "water"],
    chart2Keywords: ["tariff", "cost", "price", "cubic", "meter", "residential", "north america", "europe", "asia", "africa", "oceania"],
    chart1: {
      id: "chart_1",
      type: "pie",
      title: "Global Water Consumption by Sector (2022)",
      unit: "Percentage Share (%)",
      data: [
        { label: "Agriculture / Irrigation", value: 68 },
        { label: "Industrial Processes", value: 22 },
        { label: "Domestic / Residential", value: 10 }
      ]
    },
    chart2: {
      id: "chart_2",
      type: "table",
      title: "Regional Water Tariffs & Household Usage",
      unit: "USD per m³ / Liters per day",
      tableHeaders: ["Region", "Tariff ($/m³)", "Avg Daily Household Usage (Liters)"],
      data: [],
      tableRows: [
        { entity: "North America", col1: "$1.85", col2: "380 L" },
        { entity: "Europe", col1: "$3.40", col2: "165 L" },
        { entity: "Oceania", col1: "$2.90", col2: "210 L" },
        { entity: "Asia", col1: "$0.85", col2: "190 L" },
        { entity: "Africa", col1: "$0.45", col2: "85 L" }
      ]
    },
    clusters: [
      {
        id: "cluster_macro_vs_micro",
        title: "Macro Allocation vs Residential Strain",
        chart1Points: ["Agriculture accounts for 68%", "Domestic accounts for only 10%"],
        chart2Points: ["Europe charges $3.40/m³ with 165L usage", "North America uses 380L despite $1.85 tariff"],
        synthesisObservation: "While domestic usage constitutes a marginal fraction (10%) of total global consumption, municipal pricing creates stark behavioral divergences across continents.",
        suggestedBodyParagraph: 1,
        higherOrderLexis: "predominant proportion, in inverse proportion to, marginal fraction"
      }
    ],
    dualOverviewPoints: {
      chart1Trend: "Agriculture overwhelmingly claimed the predominant proportion of global water resources, whereas residential usage formed a minor fraction.",
      chart2Trend: "Water tariffs exhibited wide geographical disparity, with Europe imposing the steepest charges while African consumers paid the least.",
      synthesisLink: "High tariff regimes generally coincided with curtailed per-capita domestic consumption, except in North America."
    },
    band85ModelEssay: {
      introduction: "The pie chart breaks down global water allocation across agricultural, industrial, and domestic sectors in 2022, while the table details average municipal water prices per cubic meter and daily residential consumption across five geographical regions.",
      overview: "Overall, it is evident that agriculture consumed the vast majority of water globally, with domestic needs accounting for merely a tenth of total volume. Concurrently, European households faced the highest tariffs, whereas North America recorded an exceptionally high daily consumption rate despite moderate pricing.",
      body1: "In terms of sectoral allocation, agriculture was the predominant consumer, absorbing more than two-thirds (68%) of global water reserves. Industrial requirements represented 22%, whereas domestic purposes occupied the smallest share at 10%.",
      body2: "Turning to regional domestic metrics, a notable inverse pattern is observable between tariffs and consumption. Europe levied the highest tariff at $3.40 per cubic meter, which corresponded with a modest consumption of 165 liters daily. In contrast, North Americans consumed an astounding 380 liters per person per day—more than double the European figure—even though their price was substantially lower at $1.85. Africa recorded both the cheapest tariff ($0.45) and lowest consumption (85 liters), while Asia and Oceania occupied middle positions with $0.85 and $2.90 tariffs respectively.",
      fullText: "The pie chart breaks down global water allocation across agricultural, industrial, and domestic sectors in 2022, while the table details average municipal water prices per cubic meter and daily residential consumption across five geographical regions.\n\nOverall, it is evident that agriculture consumed the vast majority of water globally, with domestic needs accounting for merely a tenth of total volume. Concurrently, European households faced the highest tariffs, whereas North America recorded an exceptionally high daily consumption rate despite moderate pricing.\n\nIn terms of sectoral allocation, agriculture was the predominant consumer, absorbing more than two-thirds (68%) of global water reserves. Industrial requirements represented 22%, whereas domestic purposes occupied the smallest share at 10%.\n\nTurning to regional domestic metrics, a notable inverse pattern is observable between tariffs and consumption. Europe levied the highest tariff at $3.40 per cubic meter, which corresponded with a modest consumption of 165 liters daily. In contrast, North Americans consumed an astounding 380 liters per person per day—more than double the European figure—even though their price was substantially lower at $1.85. Africa recorded both the cheapest tariff ($0.45) and lowest consumption (85 liters), while Asia and Oceania occupied middle positions with $0.85 and $2.90 tariffs respectively.",
      wordCount: 195,
      keySynthesisMarkers: ["vast majority", "merely a tenth", "predominant consumer", "two-thirds", "notable inverse pattern", "more than double", "substantially lower"]
    }
  },
  {
    id: "task1_mixed_ev_market",
    title: "Automotive Sales by Powertrain & EV Market Penetration",
    topic: "Automotive Industry & Electrification",
    difficulty: "Band 7.5 - 8.0",
    prompt: "The bar chart presents overall passenger car sales (in millions of units) across three major markets between 2018 and 2023, while the pie chart shows the breakdown of Electric Vehicle (EV) market share in 2023.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chart1Keywords: ["sales", "passenger", "vehicles", "units", "millions", "china", "usa", "europe", "car"],
    chart2Keywords: ["ev", "electric", "market", "share", "bev", "phev", "hybrid", "powertrain", "penetration"],
    chart1: {
      id: "chart_1",
      type: "bar",
      title: "Passenger Vehicle Sales (Millions of Units)",
      unit: "Million Units",
      xAxisLabel: "Region",
      yAxisLabel: "Sales (M)",
      data: [
        { label: "China", value: 24, secondaryValue: 26 },
        { label: "USA", value: 17, secondaryValue: 15.5 },
        { label: "Europe", value: 15, secondaryValue: 13 }
      ]
    },
    chart2: {
      id: "chart_2",
      type: "pie",
      title: "Global EV Market Share by Tech (2023)",
      unit: "% Breakdown",
      data: [
        { label: "Battery Electric (BEV)", value: 70 },
        { label: "Plug-in Hybrid (PHEV)", value: 24 },
        { label: "Fuel Cell (FCEV)", value: 6 }
      ]
    },
    clusters: [
      {
        id: "cluster_china_bev",
        title: "Market Scale & BEV Dominance",
        chart1Points: ["China reached 26M cars", "US & EU contracted slightly"],
        chart2Points: ["BEV commands 70% of EV market"],
        synthesisObservation: "China solidified its status as the supreme automotive market with 26 million units, coinciding with the global triumph of BEVs claiming seven-tenths of the electrified market.",
        suggestedBodyParagraph: 1,
        higherOrderLexis: "solidified dominance, seven-tenths share, eclipsing other regions"
      }
    ],
    dualOverviewPoints: {
      chart1Trend: "China expanded its lead in overall car deliveries, whereas the American and European markets suffered mild contractions.",
      chart2Trend: "Battery electric powertrains firmly established overwhelming supremacy over hybrid alternatives in 2023.",
      synthesisLink: "Asian market expansion progressed in tandem with the rapid consolidation of pure battery technology."
    },
    band85ModelEssay: {
      introduction: "The bar chart compares annual passenger vehicle sales in China, the USA, and Europe between 2018 and 2023, while the pie chart breaks down global Electric Vehicle (EV) sales by powertrain technology in 2023.",
      overview: "Overall, it is noticeable that China strengthened its position as the world's largest automotive market, while both the American and European sectors contracted. Concurrently, pure battery electric vehicles (BEVs) captured the lion's share of the electrified sector, eclipsing plug-in hybrids and fuel cell alternatives.",
      body1: "Looking at total car sales, China experienced an upward trajectory, rising from 24 million units in 2018 to 26 million in 2023. In contrast, sales in the United States receded marginally from 17 million to 15.5 million units. Europe exhibited a parallel decline, contracting from 15 million to 13 million vehicles over the five-year timeframe.",
      body2: "Regarding the composition of the global electric vehicle fleet in 2023, Battery Electric Vehicles accounted for a predominant proportion of 70%, nearly three times the share of Plug-in Hybrids (PHEVs) at 24%. Fuel Cell Electric Vehicles (FCEVs) occupied a negligible niche, constituting a mere 6% of worldwide shipments.",
      fullText: "The bar chart compares annual passenger vehicle sales in China, the USA, and Europe between 2018 and 2023, while the pie chart breaks down global Electric Vehicle (EV) sales by powertrain technology in 2023.\n\nOverall, it is noticeable that China strengthened its position as the world's largest automotive market, while both the American and European sectors contracted. Concurrently, pure battery electric vehicles (BEVs) captured the lion's share of the electrified sector, eclipsing plug-in hybrids and fuel cell alternatives.\n\nLooking at total car sales, China experienced an upward trajectory, rising from 24 million units in 2018 to 26 million in 2023. In contrast, sales in the United States receded marginally from 17 million to 15.5 million units. Europe exhibited a parallel decline, contracting from 15 million to 13 million vehicles over the five-year timeframe.\n\nRegarding the composition of the global electric vehicle fleet in 2023, Battery Electric Vehicles accounted for a predominant proportion of 70%, nearly three times the share of Plug-in Hybrids (PHEVs) at 24%. Fuel Cell Electric Vehicles (FCEVs) occupied a negligible niche, constituting a mere 6% of worldwide shipments.",
      wordCount: 178,
      keySynthesisMarkers: ["lion's share", "eclipsing", "in contrast", "parallel decline", "predominant proportion", "nearly three times", "negligible niche"]
    }
  },
  {
    id: "task1_mixed_tertiary_ed",
    title: "University Public Funding & Graduate Output Rates",
    topic: "Higher Education & Public Sector Policy",
    difficulty: "Band 8.5+",
    prompt: "The table lists government expenditure on tertiary education (as % of GDP) in four nations from 2005 to 2020, while the line graph shows tertiary graduation rates per 1,000 young adults over the same period.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chart1Keywords: ["expenditure", "gdp", "funding", "budget", "canada", "norway", "uk", "japan", "tertiary", "education"],
    chart2Keywords: ["graduation", "rate", "graduates", "students", "degrees", "thousand", "alumni", "growth"],
    chart1: {
      id: "chart_1",
      type: "table",
      title: "Government Spending on Tertiary Education (% of GDP)",
      unit: "% of GDP",
      tableHeaders: ["Country", "2005", "2010", "2015", "2020"],
      data: [],
      tableRows: [
        { entity: "Norway", col1: "1.8%", col2: "2.1%", col3: "2.4%" },
        { entity: "Canada", col1: "1.5%", col2: "1.7%", col3: "1.9%" },
        { entity: "United Kingdom", col1: "1.0%", col2: "1.2%", col3: "1.3%" },
        { entity: "Japan", col1: "0.7%", col2: "0.7%", col3: "0.8%" }
      ]
    },
    chart2: {
      id: "chart_2",
      type: "line",
      title: "Tertiary Graduates per 1,000 Young Adults (20-29)",
      unit: "Graduates / 1,000 adults",
      xAxisLabel: "Year",
      yAxisLabel: "Graduates",
      data: [
        { label: "2005", value: 45, category: "Norway" },
        { label: "2015", value: 62, category: "Norway" },
        { label: "2020", value: 74, category: "Norway" },
        { label: "2005", value: 50, category: "Canada" },
        { label: "2015", value: 58, category: "Canada" },
        { label: "2020", value: 65, category: "Canada" },
        { label: "2005", value: 38, category: "United Kingdom" },
        { label: "2015", value: 44, category: "United Kingdom" },
        { label: "2020", value: 49, category: "United Kingdom" },
        { label: "2005", value: 32, category: "Japan" },
        { label: "2015", value: 35, category: "Japan" },
        { label: "2020", value: 38, category: "Japan" }
      ]
    },
    clusters: [
      {
        id: "cluster_ed_correlation",
        title: "Funding Density & Completion Rates",
        chart1Points: ["Norway 1.8% -> 2.4% GDP", "Canada 1.5% -> 1.9% GDP"],
        chart2Points: ["Norway reached 74 per 1,000", "Canada reached 65 per 1,000"],
        synthesisObservation: "Higher state investment in tertiary schooling directly mirrored superior graduate output across all observation windows.",
        suggestedBodyParagraph: 1,
        higherOrderLexis: "directly mirrored, outstripped, threefold hierarchy"
      }
    ],
    dualOverviewPoints: {
      chart1Trend: "Norway and Canada consistently outspent the UK and Japan on higher education relative to national GDP.",
      chart2Trend: "Tertiary graduation figures ascended in all four nations, maintaining an identical rank order to national funding commitments.",
      synthesisLink: "Fiscal resource commitment served as a strong leading indicator of university completion density."
    },
    band85ModelEssay: {
      introduction: "The table presents public expenditure on tertiary education as a percentage of GDP in Norway, Canada, the UK, and Japan between 2005 and 2020, while the line graph charts graduation rates per 1,000 young adults over the corresponding period.",
      overview: "Overall, it is clear that government spending on higher education increased in all four countries, with Norway and Canada sustaining the highest funding rates. Crucially, university graduation rates mirrored this financial investment pattern precisely, with higher-spending countries consistently producing higher densities of graduates.",
      body1: "Regarding the top-tier investing nations, Norway increased its tertiary budget from 1.8% to 2.4% of GDP over the 15-year period. This generous financing coincided with Norway's graduate density surging from 45 to 74 per 1,000 adults, surpassing all peers by 2020. Canada maintained the second-highest fiscal commitment (1.5% to 1.9% of GDP), which corresponded to a steady rise in graduates from 50 to 65 per 1,000.",
      body2: "By contrast, the United Kingdom and Japan maintained significantly lower investment levels throughout the period. The UK's spending rose modestly from 1.0% to 1.3% of GDP, and its graduation rate climbed slowly from 38 to 49 per 1,000. Japan recorded the lowest figures across both metrics; its educational expenditure hovered around 0.7%–0.8% of GDP, while its graduation numbers grew marginally from 32 to 38, dwarfed by Norway's output.",
      fullText: "The table presents public expenditure on tertiary education as a percentage of GDP in Norway, Canada, the UK, and Japan between 2005 and 2020, while the line graph charts graduation rates per 1,000 young adults over the corresponding period.\n\nOverall, it is clear that government spending on higher education increased in all four countries, with Norway and Canada sustaining the highest funding rates. Crucially, university graduation rates mirrored this financial investment pattern precisely, with higher-spending countries consistently producing higher densities of graduates.\n\nRegarding the top-tier investing nations, Norway increased its tertiary budget from 1.8% to 2.4% of GDP over the 15-year period. This generous financing coincided with Norway's graduate density surging from 45 to 74 per 1,000 adults, surpassing all peers by 2020. Canada maintained the second-highest fiscal commitment (1.5% to 1.9% of GDP), which corresponded to a steady rise in graduates from 50 to 65 per 1,000.\n\nBy contrast, the United Kingdom and Japan maintained significantly lower investment levels throughout the period. The UK's spending rose modestly from 1.0% to 1.3% of GDP, and its graduation rate climbed slowly from 38 to 49 per 1,000. Japan recorded the lowest figures across both metrics; its educational expenditure hovered around 0.7%–0.8% of GDP, while its graduation numbers grew marginally from 32 to 38, dwarfed by Norway's output.",
      wordCount: 198,
      keySynthesisMarkers: ["mirrored this financial investment", "coincided with", "surpassing all peers", "corresponded to", "by contrast", "dwarfed by"]
    }
  }
];
