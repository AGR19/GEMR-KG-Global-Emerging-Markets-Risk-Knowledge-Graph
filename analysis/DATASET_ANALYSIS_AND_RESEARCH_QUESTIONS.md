# GEMR-KG Dataset Analysis and Research Questions

## Dataset Overview

### 1. **Emerging Markets Risk Dataset** (`IFC_GEM.csv`)
- **Source**: World Bank - IFC Global Emerging Markets Risk Database
- **Time Coverage**: 1984-2024 (40 years)
- **Total Records**: 23,155 observations
- **Frequency**: Annual (A)

### 2. **Economic Indicators Dataset** (`GemDataEXTR/`)
- **Source**: World Bank
- **Time Coverage**: 1996-2025 (30 years)
- **Number of Files**: 37 Excel files
- **Geographic Coverage**: 187 individual countries + 7 regional groups + 6 income groups

---

## RISK DATASET: Fields and Labels

### Core Identification Fields
- **STRUCTURE**: Data structure identifier
- **STRUCTURE_ID**: `IFC.CR:DS_GEM(1.0)`
- **ACTION**: Data action type (`I` - Insert)
- **DATABASE_ID**: `IFC_GEM` - Global Emerging Markets Risk Database

### Geographic Dimension (REF_AREA)
**Regional Groups:**
- `_T`: Overall
- `EAS`: East Asia & Pacific
- `ECS`: Europe & Central Asia
- `LCN`: Latin America & Caribbean
- `MEA`: Middle East and North Africa
- `SAS`: South Asia
- `SSF`: Sub-Saharan Africa

**Income-Based Regional Groups:**
- `EAL`: East Asia & Pacific (Low Income)
- `EAM`: East Asia & Pacific (Lower Middle Income)
- `EAU`: East Asia & Pacific (Upper Middle Income)
- `ECL`: Europe & Central Asia (Low Income)
- `ECM`: Europe & Central Asia (Lower Middle Income)
- `ECU`: Europe & Central Asia (Upper Middle Income)
- `LCL`: Latin America & Caribbean (Low Income)
- `MEL`: Middle East & North Africa (Low Income)
- `SAL`: South Asia (Low Income)
- `SAD`: South Asia (Upper Middle Income)

**Individual Countries (Sample):**
- `BRA`: Brazil
- `EGY`: Egypt, Arab Rep.
- `KAZ`: Kazakhstan
- `MAR`: Morocco
- `POL`: Poland
- `ROU`: Romania
- `SRB`: Serbia
- `RUS`: Russian Federation
- `SEN`: Senegal
- `TUN`: Tunisia
- `TUR`: Turkey
- `UKR`: Ukraine
- `ZAF`: South Africa
- `NER`: Niger
- *(132 total geographic entities)*

### Risk Indicators (INDICATOR)
1. **IFC_GEM_PBD**: Average public default rates
2. **IFC_GEM_PBD_H**: Historical public default rates
3. **IFC_GEM_PBR**: Average public recovery rates
4. **IFC_GEM_PBR_H**: Historical public recovery rates
5. **IFC_GEM_PRD**: Average private default rates
6. **IFC_GEM_PRD_H**: Historical private default rates
7. **IFC_GEM_PRR**: Average private recovery rates
8. **IFC_GEM_PRR_H**: Historical private recovery rates
9. **IFC_GEM_SD**: Average sovereign default rates
10. **IFC_GEM_SD_H**: Historical sovereign default rates
11. **IFC_GEM_SR**: Average sovereign recovery rates
12. **IFC_GEM_SR_H**: Historical sovereign recovery rates

### Metrics (METRIC)
- **CP**: Counterparts (number of entities)
- **DT**: Defaults (count)
- **SA**: Signed Amount (in EUR millions)
- **ADR**: Average default rate (percentage)
- **ARR**: Average Recovery Rate (percentage)
- **OY**: Observed years
- **OBS**: Observations (total count)
- **OBS_MIN**: Minimum observation
- **OBS_MAX**: Maximum observation
- **CT**: Contracts
- **MEDIAN**: Median value

### Sector Classification (SECTOR)
**Overall:**
- `_T`: Overall

**GICS (Global Industry Classification Standard):**
- `A`: GICS: Administration
- `CS`: GICS: Communication services
- `CD`: GICS: Consumer discretionary
- `CST`: GICS: Consumer staples
- `E`: GICS: Energy
- `F`: GICS: Financials
- `HC`: GICS: Health Care
- `I`: GICS: Industrials
- `IT`: GICS: Information technology
- `M`: GICS: Materials
- `O`: GICS: Others
- `U`: GICS: Utilities

**Functional Classification:**
- `BK`: Banking
- `IN`: Infrastructure
- `NB`: Non-banking financial institutions
- `S`: Services
- `FI`: Financial Institutions
- `NF`: Non-financial institutions
- `R`: Renewables

### Project Type (PROJECT_TYPE)
- `_T`: Overall, incl. omitted categories
- `_Z`: Not applicable
- `CF`: Corporate Finance
- `FI`: Financial Institutions
- `O`: Other
- `PF`: Project Finance
- `MX`: Mixed
- `SF`: Structured Finance

### Contract Size (CONTRACT_SIZE)
- `_T`: All
- `_Z`: Not applicable
- `LT1M`: Up to 1 Million EUR
- `1T2M`: Up to 2 Million EUR
- `2T5M`: Up to 5 Million EUR
- `5T10M`: Up to 10 Million EUR
- `10T25M`: Up to 25 Million EUR
- `GT25M`: More than 25 Million EUR

### Currency Type (CURRENCY_TYPE)
- `_T`: Overall, incl. omitted categories
- `_Z`: Not applicable
- `F`: Foreign currency
- `L`: Local currency
- `X`: Mixed currency

### Seniority (SENIORITY)
- `_T`: All
- `_Z`: Not applicable
- `S`: Senior
- `SS`: Senior-Secured
- `SU`: Senior-Unsecured
- `SUB`: Subordinated
- `NAV`: Not Available

### Credit Rating (CREDIT_RATING)
- `_Z`: Not applicable

### Default Type (DEFAULT_TYPE)
- `_Z`: Not applicable

### Units and Measures
**UNIT_MEASURE:**
- `CP`: Counterparts
- `DF`: Defaults
- `EUR`: Euros (millions)
- `PT`: Percentage
- `YR`: Years
- `OBS`: Observations

**UNIT_MULT:**
- `0`: Units
- `6`: Millions

---

## ECONOMIC DATASET: Categories and Indicators

### 1. **GDP and Growth Indicators** (5 files)
- GDP at market prices, constant 2010 US$ (millions, seasonally adjusted)
- GDP at market prices, constant 2010 LCU (millions, seasonally adjusted)
- GDP at market prices, current US$ (millions, seasonally adjusted)
- GDP at market prices, current LCU (millions, seasonally adjusted)
- GDP Deflator at Market Prices, LCU

**Countries Coverage**: 105 entities (countries + regional aggregates)

### 2. **Inflation and Price Indicators** (6 files)
- Core CPI, seasonally adjusted
- Core CPI, not seasonally adjusted
- CPI Price, nominal, seasonally adjusted
- CPI Price, nominal, not seasonally adjusted
- CPI Price, % year-over-year, nominal, seasonally adjusted
- CPI Price, % year-over-year, median weighted, seasonally adjusted

**Countries Coverage**: 121 entities

### 3. **Exchange Rate Indicators** (4 files)
- Exchange rate, new LCU per USD extended backward, period average
- Exchange rate, old LCU per USD extended forward, period average
- Official exchange rate, LCU per USD, period average
- Nominal Effective Exchange Rate
- Real Effective Exchange Rate

**Countries Coverage**: 199 entities (most comprehensive coverage)

### 4. **International Trade Indicators**

**Exports (6 files):**
- Exports Merchandise, Customs, constant 2010 US$ (millions) - seasonally adjusted
- Exports Merchandise, Customs, constant 2010 US$ (millions) - not seasonally adjusted
- Exports Merchandise, Customs, current US$ (millions) - seasonally adjusted
- Exports Merchandise, Customs, current US$ (millions) - not seasonally adjusted
- Exports Merchandise, Customs, Price, US$ - seasonally adjusted
- Exports Merchandise, Customs, Price, US$ - not seasonally adjusted

**Imports (7 files):**
- Imports Merchandise, Customs, constant 2010 US$ (millions) - seasonally adjusted
- Imports Merchandise, Customs, constant 2010 US$ (millions) - not seasonally adjusted
- Imports Merchandise, Customs, current US$ (millions) - seasonally adjusted
- Imports Merchandise, Customs, current US$ (millions) - not seasonally adjusted
- Imports Merchandise, Customs, Price, US$ - seasonally adjusted
- Imports Merchandise, Customs, Price, US$ - not seasonally adjusted
- Foreign Reserves, Months Import Cover, Goods

**Trade Balance:**
- Terms of Trade

### 5. **Monetary and Financial Indicators** (4 files)
- Stock Markets, LCU
- Stock Markets, US$
- Total Reserves
- Foreign Reserves, Months Import Cover, Goods

### 6. **Real Sector Indicators** (3 files)
- Industrial Production, constant 2010 US$ - seasonally adjusted
- Industrial Production, constant 2010 US$ - not seasonally adjusted
- Retail Sales Volume Index, seasonally adjusted

### 7. **Labor Market Indicators** (1 file)
- Unemployment Rate, seasonally adjusted

**Countries Coverage**: 79 entities

### Geographic Entities in Economic Data

**Individual Countries**: 187 countries including:
- Major Emerging Markets: Brazil, China, India, Indonesia, Mexico, Russia, South Africa, Turkey
- Europe & Central Asia: Poland, Romania, Serbia, Ukraine, Kazakhstan, etc.
- Latin America: Argentina, Chile, Colombia, Peru, etc.
- Asia-Pacific: Thailand, Malaysia, Philippines, Vietnam, etc.
- Middle East & North Africa: Egypt, Morocco, Tunisia, Jordan, etc.
- Sub-Saharan Africa: Nigeria, Kenya, Ghana, Senegal, etc.

**Regional Aggregates:**
1. EMDE East Asia & Pacific
2. EMDE Europe & Central Asia
3. EMDE Latin America & Caribbean
4. EMDE Middle East, North Africa, Afghanistan & Pakistan
5. EMDE South Asia
6. EMDE Sub-Saharan Africa
7. Emerging Market and Developing Economies (EMDEs)

**Income-Based Groups:**
1. Advanced Economies
2. High Income Countries
3. Middle-Income Countries (MIC)
4. Low-Income Countries (LIC)
5. World (WBG members)

---

## DATA RELATIONSHIPS AND LINKAGES

### Primary Linking Keys

#### 1. **Geographic Linkage**
- **Risk Dataset**: `REF_AREA` (country/region codes)
- **Economic Dataset**: Column headers (country/region names)
- **Relationship**: Many-to-one mapping between risk and economic data via country identifiers

#### 2. **Temporal Linkage**
- **Risk Dataset**: `TIME_PERIOD` field (1984-2024, Annual)
- **Economic Dataset**: First column `Unnamed: 0` (1996-2025, Annual)
- **Overlap Period**: 1996-2024 (28 years of common data)

#### 3. **Regional Aggregation Linkage**
Both datasets share regional classifications:
- East Asia & Pacific
- Europe & Central Asia
- Latin America & Caribbean
- Middle East and North Africa
- South Asia
- Sub-Saharan Africa

### Cross-Dataset Relationships

#### Economic Indicators → Default Risk
1. **GDP Growth** ↔ **Default Rates** (IFC_GEM_PBD, IFC_GEM_PRD, IFC_GEM_SD)
2. **Exchange Rate Volatility** ↔ **Currency-Specific Default Rates** (CURRENCY_TYPE: F/L/X)
3. **Inflation (CPI)** ↔ **Default Rates by Sector** (SECTOR classification)
4. **Unemployment Rate** ↔ **Private Sector Default Rates** (IFC_GEM_PRD)
5. **Industrial Production** ↔ **Sector-Specific Default Rates** (SECTOR: I, M, E, etc.)

#### Trade Indicators → Default Risk
1. **Export/Import Values** ↔ **Overall Default Rates**
2. **Terms of Trade** ↔ **Sovereign Default Rates** (IFC_GEM_SD)
3. **Foreign Reserves** ↔ **Default Rates & Recovery Rates**
4. **Trade Balance** ↔ **Regional Default Patterns**

#### Financial Indicators → Recovery Risk
1. **Stock Market Performance** ↔ **Recovery Rates** (IFC_GEM_PBR, IFC_GEM_PRR, IFC_GEM_SR)
2. **Total Reserves** ↔ **Sovereign Recovery Rates** (IFC_GEM_SR)
3. **Exchange Rate Stability** ↔ **Recovery Rates by Currency Type**

#### Sectoral Linkages
1. **Industrial Production** ↔ **Industrial Sector Default Rates** (SECTOR: I)
2. **Retail Sales** ↔ **Consumer Discretionary Defaults** (SECTOR: CD)
3. **Stock Markets** ↔ **Financial Sector Defaults** (SECTOR: F, FI)

---

## ECONOMIC RESEARCH QUESTIONS

### 1. **Default Risk Determinants**

**Q1.1**: How does GDP growth rate volatility correlate with private sector default rates (IFC_GEM_PRD) across different regions (REF_AREA: EAS, ECS, LCN, MEA, SAS, SSF)?

**Q1.2**: What is the relationship between exchange rate depreciation (LCU per USD) and foreign currency default rates (CURRENCY_TYPE: F) versus local currency default rates (CURRENCY_TYPE: L)?

**Q1.3**: Does unemployment rate increase predict higher default rates in the consumer discretionary sector (SECTOR: CD) and retail-dependent sectors?

**Q1.4**: How do inflation spikes (CPI % y-o-y) impact default rates across different contract sizes (CONTRACT_SIZE: LT1M through GT25M)?

**Q1.5**: What is the lag structure between industrial production decline and industrial sector default rates (SECTOR: I)?

### 2. **Recovery Rate Analysis**

**Q2.1**: How do sovereign recovery rates (IFC_GEM_SR) vary with total reserves levels and foreign reserves measured in months of import cover?

**Q2.2**: What is the relationship between stock market performance (Stock Markets, US$) and private sector recovery rates (IFC_GEM_PRR) across different seniority levels (SENIORITY: SS, SU, SUB)?

**Q2.3**: Does real effective exchange rate (REER) appreciation improve recovery rates for foreign currency-denominated contracts (CURRENCY_TYPE: F)?

**Q2.4**: How do public sector recovery rates (IFC_GEM_PBR) differ across regions (REF_AREA) with varying GDP per capita levels?

**Q2.5**: What is the relationship between terms of trade improvement and recovery rates in export-dependent sectors?

### 3. **Sectoral Risk Patterns**

**Q3.1**: How do banking sector default rates (SECTOR: BK) correlate with financial sector indicators (Stock Markets performance) versus real economy indicators (GDP, Industrial Production)?

**Q3.2**: What is the relationship between energy sector default rates (SECTOR: E) and export merchandise values for energy-exporting countries?

**Q3.3**: How do infrastructure sector default rates (SECTOR: IN) respond to GDP growth cycles across different project types (PROJECT_TYPE: PF, CF)?

**Q3.4**: Do renewable energy sector defaults (SECTOR: R) show different patterns compared to traditional energy sector (SECTOR: E) during periods of exchange rate volatility?

**Q3.5**: How do financial institution default rates (SECTOR: FI) differ from non-banking financial institutions (SECTOR: NB) during currency crises (measured by exchange rate shocks)?

### 4. **Regional Risk Dynamics**

**Q4.1**: Which economic indicators (GDP, CPI, Exchange Rate, Unemployment) best predict sovereign default rates (IFC_GEM_SD) in Sub-Saharan Africa (REF_AREA: SSF) compared to other regions?

**Q4.2**: How do default rates in Europe & Central Asia (REF_AREA: ECS) respond to real effective exchange rate (REER) changes versus Latin America & Caribbean (REF_AREA: LCN)?

**Q4.3**: What is the relationship between trade balance (Exports minus Imports) and overall default rates across East Asia & Pacific (REF_AREA: EAS) countries?

**Q4.4**: How do Middle East and North Africa (REF_AREA: MEA) default patterns differ during periods of oil price volatility (proxied by export/import price changes)?

**Q4.5**: Which regions show the strongest correlation between retail sales volume and consumer sector defaults (SECTOR: CD, CST)?

### 5. **Size and Scale Effects**

**Q5.1**: Do larger contract sizes (CONTRACT_SIZE: GT25M) show different default rate sensitivities to GDP shocks compared to smaller contracts (CONTRACT_SIZE: LT1M)?

**Q5.2**: How does the relationship between exchange rate volatility and default rates vary across contract size categories (CONTRACT_SIZE: LT1M to GT25M)?

**Q5.3**: What is the relationship between the number of counterparts (METRIC: CP) and average default rates (METRIC: ADR) across different income groups (Low-Income, Middle-Income, High-Income Countries)?

**Q5.4**: Do default rates show size concentration risk - are larger signed amounts (METRIC: SA) associated with specific sectors (SECTOR) or project types (PROJECT_TYPE)?

### 6. **Time-Series and Dynamic Analysis**

**Q6.1**: How do leading economic indicators (Industrial Production, Retail Sales) predict future default rates (1-year, 2-year horizon) across different sectors?

**Q6.2**: What is the temporal relationship between GDP deflator changes and default rate changes across public (IFC_GEM_PBD), private (IFC_GEM_PRD), and sovereign (IFC_GEM_SD) borrowers?

**Q6.3**: Do historical default rates (IFC_GEM_PBD_H, IFC_GEM_PRD_H, IFC_GEM_SD_H) show mean reversion patterns, and how are these patterns related to business cycles (measured by GDP growth)?

**Q6.4**: What is the duration of elevated default rates following exchange rate crises across different currency types (CURRENCY_TYPE: F, L, X)?

**Q6.5**: How do recovery rates (IFC_GEM_PBR, IFC_GEM_PRR, IFC_GEM_SR) evolve over time since default (TIME_SINCE_BASE) in relation to macroeconomic recovery paths?

### 7. **Project Finance and Structured Products**

**Q7.1**: How do project finance default rates (PROJECT_TYPE: PF) in infrastructure sector (SECTOR: IN) relate to GDP growth volatility compared to corporate finance (PROJECT_TYPE: CF)?

**Q7.2**: What is the relationship between structured finance default rates (PROJECT_TYPE: SF) and stock market volatility across different regions?

**Q7.3**: Do mixed project types (PROJECT_TYPE: MX) show intermediate default characteristics between project finance and corporate finance during economic downturns?

**Q7.4**: How do seniority structures (SENIORITY: SS, SU, SUB) perform differently across project types (PROJECT_TYPE) during periods of foreign exchange stress?

### 8. **Currency Risk and Default**

**Q8.1**: What is the differential impact of nominal exchange rate depreciation versus real effective exchange rate (REER) depreciation on foreign currency defaults (CURRENCY_TYPE: F)?

**Q8.2**: Do countries with higher export concentration (measured by export/import ratio) show lower default rates for foreign currency debt (CURRENCY_TYPE: F)?

**Q8.3**: How does the gap between official exchange rate and market exchange rate (if applicable) correlate with local currency default rates (CURRENCY_TYPE: L)?

**Q8.4**: What is the relationship between nominal effective exchange rate (NEER) volatility and mixed currency default rates (CURRENCY_TYPE: X)?

### 9. **Macro-Prudential and Policy Questions**

**Q9.1**: What threshold levels of foreign reserves (as months of import cover) are associated with significantly lower sovereign default rates (IFC_GEM_SD)?

**Q9.2**: How do countries with higher unemployment rates (above regional median) compare in terms of observed defaults (METRIC: DT) across private sector categories?

**Q9.3**: What is the relationship between current account balance (approximated by trade balance) and average default rates (METRIC: ADR) across emerging market regions?

**Q9.4**: Do countries with more stable CPI inflation rates show lower variance in sector-specific default rates?

**Q9.5**: How do minimum observation values (METRIC: OBS_MIN) and maximum observation values (METRIC: OBS_MAX) of default rates relate to economic volatility measures (GDP growth volatility, exchange rate volatility)?

### 10. **Comparative Risk Assessment**

**Q10.1**: How do default rates compare between financial institutions (SECTOR: FI) and non-financial institutions (SECTOR: NF) during banking crises (identified by stock market crashes)?

**Q10.2**: What is the differential impact of GDP shocks on senior-secured (SENIORITY: SS) versus subordinated (SENIORITY: SUB) default rates across sectors?

**Q10.3**: How do average default rates (IFC_GEM_PBD, IFC_GEM_PRD, IFC_GEM_SD) compare to historical default rates (IFC_GEM_PBD_H, IFC_GEM_PRD_H, IFC_GEM_SD_H) during periods of extreme economic stress (defined by multiple indicators)?

**Q10.4**: Which sectors (SECTOR) show the highest resilience (lowest default rate increase) during simultaneous shocks to GDP, exchange rates, and trade?

**Q10.5**: How do countries in the same region (REF_AREA) but different income categories (Low-Income vs Upper Middle Income) compare in terms of recovery rates (METRIC: ARR)?

### 11. **Contagion and Spillover Effects**

**Q11.1**: Do default rates in one region (e.g., REF_AREA: ECS) lead default rates in another region (e.g., REF_AREA: EAS) after controlling for regional economic indicators?

**Q11.2**: How do export-dependent countries' default rates respond to trading partners' GDP growth changes?

**Q11.3**: What is the relationship between regional aggregate default rates (REF_AREA: regional codes) and individual country default rates within those regions?

**Q11.4**: Do defaults in financial institutions (SECTOR: FI) predict subsequent defaults in non-financial sectors within the same country/region?

### 12. **Stress Testing Scenarios**

**Q12.1**: Under scenarios of 10%, 20%, 30% exchange rate depreciation, what are the predicted changes in foreign currency default rates (CURRENCY_TYPE: F) across different sectors (SECTOR)?

**Q12.2**: What would be the impact on private sector default rates (IFC_GEM_PRD) if unemployment rates increase by 1, 3, or 5 percentage points?

**Q12.3**: How would sovereign default rates (IFC_GEM_SD) respond to scenarios of declining foreign reserves by 3, 6, or 9 months of import cover?

**Q12.4**: What are the expected changes in sector-specific default rates if industrial production declines by 10%, 15%, or 20%?

**Q12.5**: Under combined stress scenarios (GDP decline + exchange rate depreciation + inflation spike), which contract sizes (CONTRACT_SIZE) and sectors (SECTOR) would show the highest default rate increases?

---

## KNOWLEDGE GRAPH STRUCTURE

### Entity Types (Nodes)

1. **Country/Region**
   - Properties: REF_AREA code, REF_AREA_LABEL, income level, regional classification
   
2. **Time Period**
   - Properties: Year (1984-2025)
   
3. **Economic Indicator**
   - Properties: Indicator name, unit, frequency, seasonality adjustment
   
4. **Risk Indicator**
   - Properties: INDICATOR code, INDICATOR_LABEL, indicator type (default/recovery)
   
5. **Sector**
   - Properties: SECTOR code, SECTOR_LABEL, classification system (GICS/Functional)
   
6. **Project**
   - Properties: PROJECT_TYPE, CONTRACT_SIZE, CURRENCY_TYPE, SENIORITY
   
7. **Observation**
   - Properties: METRIC type, OBS_VALUE, UNIT_MEASURE

### Relationship Types (Edges)

1. **HAS_ECONOMIC_VALUE**
   - From: Country/Region → Economic Indicator
   - Properties: Time Period, Value, Unit
   
2. **HAS_RISK_MEASURE**
   - From: Country/Region → Risk Indicator
   - Properties: Time Period, METRIC type, OBS_VALUE, SECTOR, PROJECT_TYPE
   
3. **BELONGS_TO_REGION**
   - From: Country → Region
   
4. **OPERATES_IN_SECTOR**
   - From: Project → Sector
   
5. **DENOMINATED_IN**
   - From: Project → CURRENCY_TYPE
   
6. **HAS_SENIORITY**
   - From: Project → SENIORITY level
   
7. **CORRELATES_WITH**
   - From: Economic Indicator ↔ Risk Indicator
   - Properties: Correlation coefficient, Time lag, Significance level
   
8. **PRECEDES**
   - From: Time Period → Time Period (temporal sequence)
   
9. **IMPACTS**
   - From: Economic Indicator → Risk Indicator
   - Properties: Direction, Magnitude, Lag structure

### Derived Relationships

1. **DEFAULT_RISK_PROFILE**
   - Aggregates multiple risk indicators for a Country/Region/Sector combination
   
2. **ECONOMIC_STRESS_LEVEL**
   - Composite measure based on multiple economic indicators
   
3. **SECTOR_VULNERABILITY**
   - Links sector performance to macroeconomic conditions
   
4. **REGIONAL_CONTAGION**
   - Cross-regional risk transmission patterns

---

## IMPLEMENTATION PRIORITIES

### Phase 1: Core Graph Construction
1. Load country/region entities with hierarchical relationships
2. Load time series data for both economic and risk indicators
3. Establish temporal linkages (1996-2024 overlap period)
4. Create basic correlation relationships

### Phase 2: Enhanced Analytics
1. Calculate derived indicators (volatility, growth rates, changes)
2. Identify threshold relationships (e.g., reserve levels vs default rates)
3. Build sector-specific sub-graphs
4. Implement lag structure analysis

### Phase 3: Advanced Queries and Insights
1. Multi-hop relationship queries (e.g., regional→country→sector→project)
2. Time-series pattern matching
3. Anomaly detection (outlier countries/periods)
4. Predictive relationship discovery

### Phase 4: Stress Testing and Scenarios
1. Scenario propagation through the graph
2. Systemic risk measurement
3. Contagion path identification
4. Portfolio risk aggregation

---

## DATA QUALITY CONSIDERATIONS

### Temporal Alignment
- **Challenge**: Risk data (1984-2024) has longer history than economic data (1996-2025)
- **Approach**: Focus primary analysis on 1996-2024 overlap; use 1984-1995 risk data for historical context
- **Opportunity**: 2025 economic data can be used for forward-looking risk projections

### Geographic Coverage
- **Risk Data**: 132 geographic entities (including granular regional breakdowns)
- **Economic Data**: 199 entities (broader country coverage)
- **Harmonization**: Map risk dataset country codes to economic dataset country names

### Frequency
- **Both datasets**: Annual frequency
- **Advantage**: Direct temporal alignment without frequency conversion

### Seasonality
- **Economic Data**: Multiple versions (seasonally adjusted vs. not adjusted)
- **Recommendation**: Use seasonally adjusted data for primary analysis to reduce noise

### Missing Data
- **Economic Data**: Not all countries have data for all indicators or all time periods
- **Approach**: Document coverage patterns; use regional aggregates where individual country data unavailable
- **Risk Data**: Use "Not applicable" (_Z) codes to filter relevant observations

---

## EXPECTED KNOWLEDGE GRAPH OUTCOMES

1. **Comprehensive Risk Profile**: Multi-dimensional risk assessment combining default probabilities, recovery rates, and economic fundamentals for each emerging market

2. **Early Warning Indicators**: Identification of leading economic indicators that predict risk events across different sectors and contract types

3. **Sectoral Vulnerability Maps**: Understanding which sectors are most vulnerable to specific types of economic shocks

4. **Regional Contagion Patterns**: Mapping how risk propagates across geographic regions

5. **Currency Risk Decomposition**: Separating local vs. foreign currency risk factors

6. **Size-Based Risk Stratification**: Understanding how contract size affects risk-return profiles

7. **Temporal Risk Dynamics**: Capturing how risk evolves over business cycles and crisis periods

8. **Cross-Country Comparisons**: Benchmarking risk metrics across countries with similar economic profiles

9. **Policy Impact Assessment**: Evaluating how changes in macroeconomic variables affect various risk dimensions

10. **Portfolio Optimization Insights**: Supporting risk-adjusted investment decisions in emerging market debt and equity

