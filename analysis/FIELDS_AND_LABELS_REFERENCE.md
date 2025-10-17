# Complete Fields and Labels Reference Guide

## Quick Reference: All Dataset Fields

---

## RISK DATASET (IFC_GEM.csv)

### Complete Field List (45 columns)

1. **STRUCTURE** - Data structure type identifier
2. **STRUCTURE_ID** - Structure ID: `IFC.CR:DS_GEM(1.0)`
3. **ACTION** - Action type: `I` (Insert)
4. **REF_AREA** - Geographic area code
5. **REF_AREA_LABEL** - Geographic area name
6. **INDICATOR** - Risk indicator code
7. **INDICATOR_LABEL** - Risk indicator description
8. **METRIC** - Metric type code
9. **METRIC_LABEL** - Metric type description
10. **GEMS_RATING** - GEMS rating code
11. **GEMS_RATING_LABEL** - GEMS rating description
12. **CONTRACT_SIZE** - Contract size category code
13. **CONTRACT_SIZE_LABEL** - Contract size category description
14. **CREDIT_RATING** - Credit rating code
15. **CREDIT_RATING_LABEL** - Credit rating description
16. **CURRENCY_TYPE** - Currency type code
17. **CURRENCY_TYPE_LABEL** - Currency type description
18. **SECTOR** - Sector code
19. **SECTOR_LABEL** - Sector description
20. **PROJECT_TYPE** - Project type code
21. **PROJECT_TYPE_LABEL** - Project type description
22. **SENIORITY** - Seniority level code
23. **SENIORITY_LABEL** - Seniority level description
24. **TIME_DEFAULT** - Time to default code
25. **TIME_DEFAULT_LABEL** - Time to default description
26. **DEFAULT_TYPE** - Default type code
27. **DEFAULT_TYPE_LABEL** - Default type description
28. **RR_BAND** - Recovery rate band code
29. **RR_BAND_LABEL** - Recovery rate band description
30. **TIME_SINCE_BASE** - Time since base period code
31. **TIME_SINCE_BASE_LABEL** - Time since base period description
32. **TIME_PERIOD** - Year of observation (1984-2024)
33. **OBS_VALUE** - Observed value (numeric)
34. **FREQ** - Frequency code: `A` (Annual)
35. **FREQ_LABEL** - Frequency description: "Annual"
36. **DATABASE_ID** - Database identifier: `IFC_GEM`
37. **DATABASE_ID_LABEL** - Database name: "Global Emerging Markets Risk Database"
38. **DECIMALS** - Number of decimals: `2`
39. **DECIMALS_LABEL** - Decimals description: "Two"
40. **UNIT_MEASURE** - Unit of measurement code
41. **UNIT_MEASURE_LABEL** - Unit of measurement description
42. **OBS_CONF** - Observation confidentiality: `PU` (Public)
43. **OBS_CONF_LABEL** - Confidentiality description: "Public"
44. **UNIT_MULT** - Unit multiplier code
45. **UNIT_MULT_LABEL** - Unit multiplier description

---

## COMPLETE LABEL MAPPINGS: RISK DATASET

### REF_AREA (Geographic Areas) - 132 Total Values

#### Regional Aggregates
| Code | Label |
|------|-------|
| _T | Overall |
| EAS | East Asia & Pacific |
| ECS | Europe & Central Asia |
| LCN | Latin America & Caribbean |
| MEA | Middle East and North Africa |
| SAS | South Asia |
| SSF | Sub-Saharan Africa |

#### Income-Based Regional Aggregates
| Code | Label |
|------|-------|
| EAL | East Asia & Pacific (Low Income) |
| EAM | East Asia & Pacific (Lower Middle Income) |
| EAU | East Asia & Pacific (Upper Middle Income) |
| ECL | Europe & Central Asia (Low Income) |
| ECM | Europe & Central Asia (Lower Middle Income) |
| ECU | Europe & Central Asia (Upper Middle Income) |
| LCL | Latin America & Caribbean (Low Income) |
| MEL | Middle East & North Africa (Low Income) |
| SAL | South Asia (Low Income) |
| SAD | South Asia (Upper Middle Income) |

#### Individual Countries (Sample - 20 shown)
| Code | Label |
|------|-------|
| BRA | Brazil |
| EGY | Egypt, Arab Rep. |
| KAZ | Kazakhstan |
| MAR | Morocco |
| POL | Poland |
| ROU | Romania |
| SRB | Serbia |
| RUS | Russian Federation |
| SEN | Senegal |
| TUN | Tunisia |
| TUR | Turkey |
| UKR | Ukraine |
| ZAF | South Africa |
| NER | Niger |
| IND | India |
| CHN | China |
| MEX | Mexico |
| IDN | Indonesia |
| THA | Thailand |
| VNM | Vietnam |

*Note: Total 132 geographic entities including all countries and regional aggregates*

---

### INDICATOR (Risk Indicators) - 12 Total Values

| Code | Label | Category | Type |
|------|-------|----------|------|
| IFC_GEM_PBD | Average public default rates | Public | Default |
| IFC_GEM_PBD_H | Historical public default rates | Public | Default |
| IFC_GEM_PBR | Average public recovery rates | Public | Recovery |
| IFC_GEM_PBR_H | Historical public recovery rates | Public | Recovery |
| IFC_GEM_PRD | Average private default rates | Private | Default |
| IFC_GEM_PRD_H | Historical private default rates | Private | Default |
| IFC_GEM_PRR | Average private recovery rates | Private | Recovery |
| IFC_GEM_PRR_H | Historical private recovery rates | Private | Recovery |
| IFC_GEM_SD | Average sovereign default rates | Sovereign | Default |
| IFC_GEM_SD_H | Historical sovereign default rates | Sovereign | Default |
| IFC_GEM_SR | Average sovereign recovery rates | Sovereign | Recovery |
| IFC_GEM_SR_H | Historical sovereign recovery rates | Sovereign | Recovery |

---

### METRIC (Measurement Types) - 11 Total Values

| Code | Label | Description |
|------|-------|-------------|
| CP | Counterparts | Number of entities/borrowers |
| DT | Defaults | Count of default events |
| SA | Signed Amount | Total contract value (EUR millions) |
| ADR | Average default rate | Mean default rate (percentage) |
| ARR | Average Recovery Rate | Mean recovery rate (percentage) |
| OY | Observed years | Number of years observed |
| OBS | Observations | Total number of observations |
| OBS_MIN | Minimum observation | Lowest observed value |
| OBS_MAX | Maximum observation | Highest observed value |
| CT | Contracts | Number of contracts |
| MEDIAN | Median | Median value |

---

### SECTOR (Sector Classification) - 20+ Total Values

#### Overall
| Code | Label |
|------|-------|
| _T | Overall |

#### GICS (Global Industry Classification Standard)
| Code | Label |
|------|-------|
| A | GICS: Administration |
| CS | GICS: Communication services |
| CD | GICS: Consumer discretionary |
| CST | GICS: Consumer staples |
| E | GICS: Energy |
| F | GICS: Financials |
| HC | GICS: Health Care |
| I | GICS: Industrials |
| IT | GICS: Information technology |
| M | GICS: Materials |
| O | GICS: Others |
| U | GICS: Utilities |

#### Functional Classification
| Code | Label |
|------|-------|
| BK | Banking |
| IN | Infrastructure |
| NB | Non-banking financial institutions |
| S | Services |
| FI | Financial Institutions |
| NF | Non-financial institutions |
| R | Renewables |

---

### PROJECT_TYPE (Project Types) - 8 Total Values

| Code | Label |
|------|-------|
| _T | Overall, incl. omitted categories |
| _Z | Not applicable |
| CF | Corporate Finance |
| FI | Financial Institutions |
| O | Other |
| PF | Project Finance |
| MX | Mixed |
| SF | Structured Finance |

---

### CONTRACT_SIZE (Contract Size Categories) - 8 Total Values

| Code | Label | Range (EUR) |
|------|-------|-------------|
| _T | All | All sizes |
| _Z | Not applicable | N/A |
| LT1M | Up to 1 Mio | < 1,000,000 |
| 1T2M | Up to 2 Mio | 1,000,000 - 2,000,000 |
| 2T5M | Up to 5 Mio | 2,000,000 - 5,000,000 |
| 5T10M | Up to 10 Mio | 5,000,000 - 10,000,000 |
| 10T25M | Up to 25 Mio | 10,000,000 - 25,000,000 |
| GT25M | More than 25 Mio | > 25,000,000 |

---

### CURRENCY_TYPE (Currency Types) - 5 Total Values

| Code | Label |
|------|-------|
| _T | Overall, incl. omitted categories |
| _Z | Not applicable |
| F | Foreign |
| L | Local |
| X | Mixed |

---

### SENIORITY (Debt Seniority) - 7 Total Values

| Code | Label |
|------|-------|
| _T | All |
| _Z | Not applicable |
| S | Senior |
| SS | Senior-Secured |
| SU | Senior-Unsecured |
| SUB | Subordinated |
| NAV | Not Available |

---

### CREDIT_RATING - 1 Value

| Code | Label |
|------|-------|
| _Z | Not applicable |

---

### DEFAULT_TYPE - 1 Value

| Code | Label |
|------|-------|
| _Z | Not applicable |

---

### GEMS_RATING - 1 Value

| Code | Label |
|------|-------|
| _Z | Not applicable |

---

### UNIT_MEASURE (Units) - 7 Total Values

| Code | Label |
|------|-------|
| CP | Counterparts |
| DF | Defaults |
| EUR | Euros |
| PT | Percentage |
| YR | Years |
| OBS | Observations |

---

### UNIT_MULT (Multipliers) - 2 Total Values

| Code | Label | Multiplier |
|------|-------|-----------|
| 0 | Units | 1 |
| 6 | Millions | 1,000,000 |

---

### FREQ (Frequency) - 1 Value

| Code | Label |
|------|-------|
| A | Annual |

---

### OBS_CONF (Confidentiality) - 1 Value

| Code | Label |
|------|-------|
| PU | Public |

---

## ECONOMIC DATASET (37 Excel Files)

### File Categories and Indicators

#### 1. GDP AND GROWTH (5 Files)

| File Name | Description | Unit | Adjustment |
|-----------|-------------|------|------------|
| GDP at market prices, constant 2010 LCU, millions, seas. adj..xlsx | GDP in local currency, constant prices | LCU millions | Seasonally adjusted |
| GDP at market prices, constant 2010 US$, millions, seas. adj..xlsx | GDP in USD, constant prices | USD millions | Seasonally adjusted |
| GDP at market prices, current LCU, millions, seas. adj..xlsx | GDP in local currency, current prices | LCU millions | Seasonally adjusted |
| GDP at market prices, current US$, millions, seas. adj..xlsx | GDP in USD, current prices | USD millions | Seasonally adjusted |
| GDP Deflator at Market Prices, LCU.xlsx | GDP deflator (price index) | Index | N/A |

**Country Coverage**: 105 entities

---

#### 2. INFLATION AND PRICES (6 Files)

| File Name | Description | Unit | Adjustment |
|-----------|-------------|------|------------|
| Core CPI, not seas. adj..xlsx | Core Consumer Price Index | Index | Not seasonally adjusted |
| Core CPI, seas. adj..xlsx | Core Consumer Price Index | Index | Seasonally adjusted |
| CPI Price, nominal, not seas. adj..xlsx | CPI, nominal values | Index | Not seasonally adjusted |
| CPI Price, nominal, seas. adj..xlsx | CPI, nominal values | Index | Seasonally adjusted |
| CPI Price, % y-o-y, nominal, seas. adj..xlsx | CPI year-over-year change | Percentage | Seasonally adjusted |
| CPI Price, % y-o-y, median weighted, seas. adj..xlsx | CPI year-over-year, median weighted | Percentage | Seasonally adjusted |

**Country Coverage**: 121 entities

---

#### 3. EXCHANGE RATES (4 Files)

| File Name | Description | Unit | Adjustment |
|-----------|-------------|------|------------|
| Exchange rate, new LCU per USD extended backward, period average.xlsx | Exchange rate, extended backward | LCU per USD | Period average |
| Exchange rate, old LCU per USD extended forward, period average.xlsx | Exchange rate, extended forward | LCU per USD | Period average |
| Official exchange rate, LCU per USD, period average.xlsx | Official exchange rate | LCU per USD | Period average |
| Nominal Effective Exchange Rate.xlsx | Nominal effective exchange rate | Index | N/A |
| Real Effective Exchange Rate.xlsx | Real effective exchange rate | Index | N/A |

**Country Coverage**: 199 entities (most comprehensive)

---

#### 4. EXPORTS (6 Files)

| File Name | Description | Unit | Adjustment |
|-----------|-------------|------|------------|
| Exports Merchandise, Customs, constant 2010 US$, millions, not seas. adj..xlsx | Export values, constant prices | USD millions | Not seasonally adjusted |
| Exports Merchandise, Customs, constant 2010 US$, millions, seas. adj..xlsx | Export values, constant prices | USD millions | Seasonally adjusted |
| Exports Merchandise, Customs, current US$, millions, not seas. adj..xlsx | Export values, current prices | USD millions | Not seasonally adjusted |
| Exports Merchandise, Customs, current US$, millions, seas. adj..xlsx | Export values, current prices | USD millions | Seasonally adjusted |
| Exports Merchandise, Customs, Price, US$, not seas. adj..xlsx | Export price index | Index (USD) | Not seasonally adjusted |
| Exports Merchandise, Customs, Price, US$, seas. adj..xlsx | Export price index | Index (USD) | Seasonally adjusted |

---

#### 5. IMPORTS (6 Files + 1 Reserves File)

| File Name | Description | Unit | Adjustment |
|-----------|-------------|------|------------|
| Imports Merchandise, Customs, constant 2010 US$, millions, not seas. adj..xlsx | Import values, constant prices | USD millions | Not seasonally adjusted |
| Imports Merchandise, Customs, constant 2010 US$, millions, seas. adj..xlsx | Import values, constant prices | USD millions | Seasonally adjusted |
| Imports Merchandise, Customs, current US$, millions, not seas. adj..xlsx | Import values, current prices | USD millions | Not seasonally adjusted |
| Imports Merchandise, Customs, current US$, millions, seas. adj..xlsx | Import values, current prices | USD millions | Seasonally adjusted |
| Imports Merchandise, Customs, Price, US$, not seas. adj..xlsx | Import price index | Index (USD) | Not seasonally adjusted |
| Imports Merchandise, Customs, Price, US$, seas. adj..xlsx | Import price index | Index (USD) | Seasonally adjusted |
| Foreign Reserves, Months Import Cover, Goods.xlsx | Reserves in months of imports | Months | N/A |

---

#### 6. TRADE INDICATORS (1 File)

| File Name | Description | Unit | Adjustment |
|-----------|-------------|------|------------|
| Terms of Trade.xlsx | Terms of trade index | Index | N/A |

---

#### 7. MONETARY AND FINANCIAL (3 Files)

| File Name | Description | Unit | Adjustment |
|-----------|-------------|------|------------|
| Stock Markets, LCU.xlsx | Stock market index in local currency | Index (LCU) | N/A |
| Stock Markets, US$.xlsx | Stock market index in USD | Index (USD) | N/A |
| Total Reserves.xlsx | Total international reserves | USD | N/A |

---

#### 8. REAL SECTOR (3 Files)

| File Name | Description | Unit | Adjustment |
|-----------|-------------|------|------------|
| Industrial Production, constant 2010 US$, not seas. adj..xlsx | Industrial production index | Index | Not seasonally adjusted |
| Industrial Production, constant 2010 US$, seas. adj..xlsx | Industrial production index | Index | Seasonally adjusted |
| Retail Sales Volume Index, seas. adj..xlsx | Retail sales volume | Index | Seasonally adjusted |

---

#### 9. LABOR MARKET (1 File)

| File Name | Description | Unit | Adjustment |
|-----------|-------------|------|------------|
| Unemployment Rate, seas. adj..xlsx | Unemployment rate | Percentage | Seasonally adjusted |

**Country Coverage**: 79 entities

---

## ECONOMIC DATASET: GEOGRAPHIC ENTITIES

### Total: 199 Entities

#### Regional Groups (7)
1. EMDE East Asia & Pacific
2. EMDE Europe & Central Asia
3. EMDE Latin America & Caribbean
4. EMDE Middle East, North Africa, Afghanistan & Pakistan
5. EMDE South Asia
6. EMDE Sub-Saharan Africa
7. Emerging Market and Developing Economies (EMDEs)

#### Income-Based Groups (5)
1. Advanced Economies
2. High Income Countries
3. Middle-Income Countries (MIC)
4. Low-Income Countries (LIC)
5. World (WBG members)

#### Individual Countries (187)

**Africa (48 countries)**
- North Africa: Algeria, Egypt Arab Rep., Libya, Morocco, Tunisia
- Sub-Saharan: Angola, Benin, Botswana, Burkina Faso, Burundi, Cabo Verde, Cameroon, Central African Republic, Chad, Comoros, Congo Dem. Rep., Congo Rep., Cote d'Ivoire, Djibouti, Equatorial Guinea, Eritrea, Eswatini, Ethiopia, Gabon, Gambia The, Ghana, Guinea, Guinea-Bissau, Kenya, Lesotho, Liberia, Madagascar, Malawi, Mali, Mauritania, Mauritius, Mozambique, Namibia, Niger, Nigeria, Rwanda, Sao Tome and Principe, Senegal, Seychelles, Sierra Leone, Somalia, South Africa, Sudan, Tanzania United Rep., Togo, Uganda, Zambia, Zimbabwe

**Americas (25 countries)**
- North America: Canada, United States
- Latin America & Caribbean: Antigua and Barbuda, Argentina, Bahamas The, Barbados, Belize, Bolivia, Brazil, Chile, Colombia, Costa Rica, Dominica, Dominican Republic, Ecuador, El Salvador, Grenada, Guatemala, Guyana, Haiti, Honduras, Jamaica, Mexico, Nicaragua, Panama, Paraguay, Peru, St. Kitts and Nevis, St. Lucia, St. Vincent and the Grenadines, Suriname, Trinidad and Tobago, Uruguay, Venezuela RB

**Asia (44 countries)**
- East Asia: China, Hong Kong SAR China, Japan, Korea Rep., Mongolia, Taiwan China
- South Asia: Afghanistan, Bangladesh, Bhutan, India, Maldives, Nepal, Pakistan, Sri Lanka
- Southeast Asia: Brunei Darussalam, Cambodia, Indonesia, Lao PDR, Malaysia, Myanmar, Philippines, Singapore, Thailand, Timor-Leste, Viet Nam
- Central Asia: Kazakhstan, Kyrgyz Republic, Tajikistan, Turkmenistan, Uzbekistan
- Middle East: Bahrain, Iran Islamic Rep., Iraq, Israel, Jordan, Kuwait, Lebanon, Oman, Qatar, Saudi Arabia, Syrian Arab Republic, Turkey, United Arab Emirates, West Bank and Gaza, Yemen Rep.
- Pacific: Australia, Fiji, Kiribati, Micronesia Fed. Sts., New Zealand, Palau, Papua New Guinea, Samoa, Solomon Islands, Tonga, Vanuatu

**Europe (44 countries)**
- Western Europe: Austria, Belgium, Denmark, Finland, France, Germany, Greece, Iceland, Ireland, Italy, Luxembourg, Malta, Netherlands, Norway, Portugal, San Marino, Spain, Sweden, Switzerland, United Kingdom
- Central & Eastern Europe: Albania, Belarus, Bosnia and Herzegovina, Bulgaria, Croatia, Cyprus, Czech Republic, Estonia, Georgia, Hungary, Kosovo, Latvia, Lithuania, Moldova Rep., Montenegro, North Macedonia, Poland, Romania, Russian Federation, Serbia, Slovakia, Slovenia, Ukraine

---

## DATA STRUCTURE SUMMARY

### Risk Dataset Structure
```
Record Format:
- Each row = one observation for a specific combination of:
  - Country/Region (REF_AREA)
  - Time Period (TIME_PERIOD)
  - Risk Indicator (INDICATOR)
  - Metric Type (METRIC)
  - Sector (SECTOR)
  - Project Type (PROJECT_TYPE)
  - Currency Type (CURRENCY_TYPE)
  - Contract Size (CONTRACT_SIZE)
  - Seniority (SENIORITY)
  - Observed Value (OBS_VALUE)

Total Rows: 23,155
Total Columns: 45
Time Range: 1984-2024 (Annual)
Geographic Coverage: 132 entities
```

### Economic Dataset Structure
```
File Format (per Excel file):
- Rows = Time periods (years)
- Columns = Countries/Regions
- Values = Economic indicator measurements

First Column: Year (Unnamed: 0)
Subsequent Columns: Country/Region names

Total Files: 37
Total Indicators: 37 (one per file)
Time Range: 1996-2025 (Annual)
Geographic Coverage: Up to 199 entities (varies by indicator)
```

---

## COMMON DIMENSIONS FOR JOINING

### 1. Geographic Dimension
- **Risk**: REF_AREA (code) + REF_AREA_LABEL (name)
- **Economic**: Column headers (country/region names)
- **Join Method**: Map risk codes to economic names

### 2. Temporal Dimension
- **Risk**: TIME_PERIOD (year as integer)
- **Economic**: First column values (year as float/integer)
- **Join Method**: Direct year matching
- **Common Range**: 1996-2024

### 3. Value Dimension
- **Risk**: OBS_VALUE (with UNIT_MEASURE, UNIT_MULT)
- **Economic**: Cell values (units specified in file name)
- **Consideration**: Unit harmonization required

---

## FIELD SUMMARY STATISTICS

### Risk Dataset Dimensions
- **Countries/Regions**: 132
- **Years**: 41 (1984-2024)
- **Risk Indicators**: 12
- **Metrics**: 11
- **Sectors**: 20+
- **Project Types**: 8
- **Currency Types**: 5
- **Contract Sizes**: 8
- **Seniority Levels**: 7
- **Total Observations**: 23,155

### Economic Dataset Dimensions
- **Countries/Regions**: 199 (maximum)
- **Years**: 30 (1996-2025)
- **Indicators**: 37
- **Categories**: 9 (GDP, CPI, Exchange Rate, Exports, Imports, Trade, Financial, Real Sector, Labor)
- **Total Data Points**: ~220,000+ (estimated across all files)

---

## DATA QUALITY INDICATORS

### Completeness
- **Risk Data**: Complete for selected country-indicator combinations
- **Economic Data**: Varies by country and indicator (not all countries have all indicators)

### Consistency
- **Risk Data**: Consistent annual frequency, standardized codes
- **Economic Data**: Consistent annual frequency, varying coverage

### Timeliness
- **Risk Data**: Through 2024
- **Economic Data**: Through 2025 (includes projections)

### Granularity
- **Risk Data**: Highly granular (multiple dimensions per observation)
- **Economic Data**: Time-series by country/region

---

## USAGE NOTES

1. **Not Applicable Values**: Both datasets use "_Z" or similar codes to indicate "Not applicable"
2. **Aggregates**: Both datasets include regional and income-based aggregates alongside individual countries
3. **Seasonality**: Economic data has both seasonally adjusted and non-adjusted versions; prefer seasonally adjusted for analysis
4. **Units**: Pay attention to unit multipliers (millions) and percentage formats
5. **Missing Data**: Not all countries have data for all years or all indicators
6. **Codes vs. Labels**: Risk dataset provides both codes and human-readable labels for all categorical fields

---

## REFERENCE KEY

### Quick Lookup: Risk Indicator Types

- **Default Rates**: IFC_GEM_PBD, IFC_GEM_PRD, IFC_GEM_SD (+ _H variants)
- **Recovery Rates**: IFC_GEM_PBR, IFC_GEM_PRR, IFC_GEM_SR (+ _H variants)
- **Public**: PBD, PBR
- **Private**: PRD, PRR
- **Sovereign**: SD, SR
- **Average**: Base codes (e.g., IFC_GEM_PBD)
- **Historical**: _H suffix (e.g., IFC_GEM_PBD_H)

### Quick Lookup: Common Economic Indicators

- **Growth**: GDP (4 variations)
- **Inflation**: CPI (6 variations), GDP Deflator
- **Currency**: Exchange rates (3 types), NEER, REER
- **Trade**: Exports (6), Imports (6), Terms of Trade
- **Finance**: Stock Markets (2), Reserves (2)
- **Real**: Industrial Production (2), Retail Sales (1)
- **Labor**: Unemployment (1)

---

## END OF REFERENCE GUIDE

*This document provides a comprehensive reference of all fields, labels, and values present in both the Risk and Economic datasets for the GEMR-KG project.*

**Last Updated**: Based on data analysis of IFC_GEM.csv and 37 economic indicator Excel files.

**Dataset Sources**:
- Risk Data: World Bank IFC Global Emerging Markets Risk Database
- Economic Data: World Bank GEM Data Extract

