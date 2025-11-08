# 📘 Data Dictionary

This repository contains three major datasets covering **macroeconomic indicators**, **credit risk data**, and **governance indicators**.
Each section below lists all data attributes with concise, plain-language explanations.

---

## 🏦 Dataset 1: Macroeconomic Indicators (Country-Level Time Series)

**Source:** National statistics and international databases
**Coverage:** Multiple countries, various years and frequencies

| **Attribute**                                                  | **Description**                                                                              |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| CPI Price, % y-o-y, median weighted, seas. adj.                      | Median yearly inflation across countries, adjusted for seasonal patterns.                          |
| CPI Price, % y-o-y, not seas. adj.                                   | Yearly change in consumer prices, unadjusted for seasonal effects.                                 |
| CPI Price, seas. adj.                                                | Consumer Price Index (CPI) adjusted to remove regular seasonal changes.                            |
| CPI Price, not seas. adj.                                            | Consumer Price Index without seasonal adjustment.                                                  |
| Core CPI, not seas. adj.                                             | CPI excluding food and energy prices, showing underlying inflation (unadjusted).                   |
| Core CPI, seas. adj.                                                 | CPI excluding food and energy, adjusted for seasonal variations.                                   |
| Exchange rate, new LCU per USD extended backward, period average     | Average exchange rate in local currency per USD, using new currency values for earlier data.       |
| Exchange rate, old LCU per USD extended forward, period average      | Average exchange rate in old currency terms, extended into newer years.                            |
| Official exchange rate, LCU per USD, period average                  | Official average exchange rate per USD as set by authorities.                                      |
| Nominal Effective Exchange Rate                                      | Value of a country’s currency compared to a basket of other currencies (not inflation-adjusted).  |
| Real Effective Exchange Rate                                         | Nominal effective exchange rate adjusted for inflation; shows international price competitiveness. |
| Exports Merchandise, Customs, Price, US$, not seas. adj.             | Export price index in U.S. dollars, unadjusted for seasonal effects.                               |
| Exports Merchandise, Customs, Price, US$, seas. adj.                 | Export price index in U.S. dollars, adjusted for seasonal effects.                                 |
| Exports Merchandise, Customs, constant US$, millions, not seas. adj. | Value of goods exports in inflation-adjusted (real) U.S. dollars, unadjusted for seasons.          |
| Exports Merchandise, Customs, constant US$, millions, seas. adj.     | Real exports in U.S. dollars, adjusted for seasonal patterns.                                      |
| Exports Merchandise, Customs, current US$, millions, not seas. adj.  | Value of goods exports in current U.S. dollars, unadjusted for seasons.                            |
| Exports Merchandise, Customs, current US$, millions, seas. adj.      | Value of goods exports in current U.S. dollars, adjusted for seasonal patterns.                    |
| Imports Merchandise, Customs, Price, US$, not seas. adj.             | Import price index in U.S. dollars, unadjusted for seasonal effects.                               |
| Imports Merchandise, Customs, Price, US$, seas. adj.                 | Import price index in U.S. dollars, seasonally adjusted.                                           |
| Imports Merchandise, Customs, constant US$, millions, not seas. adj. | Value of goods imports in real U.S. dollars, unadjusted for seasons.                               |
| Imports Merchandise, Customs, constant US$, millions, seas. adj.     | Value of goods imports in real U.S. dollars, seasonally adjusted.                                  |
| Imports Merchandise, Customs, current US$, millions, not seas. adj.  | Value of goods imports in current U.S. dollars, unadjusted for seasons.                            |
| Imports Merchandise, Customs, current US$, millions, seas. adj.      | Value of goods imports in current U.S. dollars, adjusted for seasons.                              |
| Industrial Production, constant US$, seas. adj.                      | Industrial output (manufacturing, mining, utilities) in real U.S. dollars, seasonally adjusted.    |
| Industrial Production, constant US$                                  | Industrial output in real U.S. dollars, unadjusted for seasons.                                    |
| GDP, constant 2010 LCU, millions, seas. adj.                         | Total economic output in 2010 local currency, adjusted for inflation and seasonality.              |
| GDP, constant 2010 US$, millions, seas. adj.                         | GDP in 2010 U.S. dollars, adjusted for inflation and seasonal patterns.                            |
| GDP, current LCU, millions, seas. adj.                               | GDP in current local currency prices, seasonally adjusted.                                         |
| GDP, current US$, millions, seas. adj.                               | GDP in current U.S. dollars, seasonally adjusted.                                                  |
| Months Import Cover of Foreign Reserves                              | Number of months a country’s reserves can pay for imports.                                        |
| Terms of Trade                                                       | Ratio of export prices to import prices; shows trade advantage.                                    |
| Total Reserves                                                       | Total foreign exchange and gold reserves held by the central bank.                                 |
| Retail Sales Volume, Index                                           | Volume of goods sold by retailers; measures consumer spending.                                     |
| Stock Markets, LCU                                                   | Local stock market index in domestic currency.                                                     |
| Stock Markets, US$                                                   | Local stock market index converted to U.S. dollars.                                                |
| Unemployment rate, Percent                                           | Share of the labor force without a job but actively looking for one.                               |

---

## 💸 Dataset 2: Global Emerging Markets Risk Database (GEMs)

**Source:** Global Emerging Markets Consortium (World Bank, EBRD, etc.)
**Coverage:** Default and recovery rates for public, private, and sovereign borrowers

| **Attribute**                 | **Description**                                                                        |
| ----------------------------------- | -------------------------------------------------------------------------------------------- |
| Historical Public Default Rates     | Annual record of how often governments or state entities failed to repay debts (1994–2024). |
| Average Public Default Rates        | Average yearly rate of government defaults across all sampled countries (latest year).       |
| Historical Private Default Rates    | Year-by-year record of how often private companies defaulted on debt (1994–2024).           |
| Average Private Default Rates       | Average company default rate across countries for the latest year.                           |
| Historical Public Recovery Rates    | Yearly data showing how much was recovered after government defaults.                        |
| Average Public Recovery Rates       | Average percentage of debt recovered from government defaults (latest year).                 |
| Historical Private Recovery Rates   | Record of how much was recovered after company defaults (1994–2024).                        |
| Average Private Recovery Rates      | Average recovery percentage for private-sector defaults in the most recent year.             |
| Historical Sovereign Default Rates  | Historical record (1984–2024) of national government defaults.                              |
| Average Sovereign Default Rates     | Average rate of sovereign defaults across all countries in the latest year.                  |
| Historical Sovereign Recovery Rates | How much was recovered after government-level defaults (1984–2024).                         |
| Average Sovereign Recovery Rates    | Average percentage recovered from sovereign defaults in the latest year.                     |

---

## 🏛️ Dataset 3: Worldwide Governance Indicators (WGI)

**Source:** World Bank
**Coverage:** 200+ economies, 1996–2023
**Purpose:** Measures quality of governance and institutional strength

| **Indicator**                                   | **Description**                                                                    |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Voice and Accountability                              | How freely people can vote, speak, and participate in government.                        |
| Political Stability and Absence of Violence/Terrorism | How peaceful and stable the country is — measures risk of conflict or unrest.           |
| Government Effectiveness                              | How well public services and institutions perform their duties.                          |
| Regulatory Quality                                    | How fair and business-friendly government regulations are.                               |
| Rule of Law                                           | How well laws are enforced and respected by citizens and institutions.                   |
| Control of Corruption                                 | How much public power is used for private gain — measures bribery and misuse of office. |

### 🧩 Control of Corruption — Subsources and Examples

Based on surveys and expert ratings from global organizations, including:

- **EIU (Economist Intelligence Unit):** Corruption among public officials
- **GCS (Global Competitiveness Survey):** Irregular payments, bribery in contracts, taxes, judiciary
- **PRS (Political Risk Services):** Corruption index
- **Gallup World Poll, Transparency International, World Bank Enterprise Surveys,** and others

Each source provides data on how widespread corruption and bribery are, combined into one score per country.

---

## ✅ Summary

- **Macroeconomic Indicators:** Track inflation, GDP, trade, employment, reserves, and currency movements.
- **GEMs Risk Database:** Shows how often public or private entities default and how much lenders recover.
- **WGI Governance Indicators:** Assess the quality of governance and the extent of corruption across countries.

---

_Last updated: November 2025_
