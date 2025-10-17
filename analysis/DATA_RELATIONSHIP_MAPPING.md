# Data Relationship Mapping: Risk ↔ Economic Indicators

## Overview
This document provides explicit mappings between the Risk Dataset fields and Economic Indicator fields for knowledge graph construction.

---

## 1. GEOGRAPHIC MAPPING

### Risk Dataset (REF_AREA) → Economic Dataset (Column Headers)

| Risk Code | Risk Label | Economic Column Name | Match Type |
|-----------|------------|---------------------|------------|
| **REGIONAL AGGREGATES** |
| _T | Overall | World (WBG members) | Approximate |
| EAS | East Asia & Pacific | EMDE East Asia & Pacific | Exact |
| ECS | Europe & Central Asia | EMDE Europe & Central Asia | Exact |
| LCN | Latin America & Caribbean | EMDE Latin America & Caribbean | Exact |
| MEA | Middle East and North Africa | EMDE Middle East, North Africa, Afghanistan & Pakistan | Similar |
| SAS | South Asia | EMDE South Asia | Exact |
| SSF | Sub-Saharan Africa | EMDE Sub-Saharan Africa | Exact |
| **INDIVIDUAL COUNTRIES (Sample)** |
| BRA | Brazil | Brazil | Exact |
| EGY | Egypt, Arab Rep. | Egypt, Arab Rep. | Exact |
| KAZ | Kazakhstan | Kazakhstan | Exact |
| MAR | Morocco | Morocco | Exact |
| POL | Poland | Poland | Exact |
| ROU | Romania | Romania | Exact |
| SRB | Serbia | Serbia | Exact |
| RUS | Russian Federation | Russian Federation | Exact |
| SEN | Senegal | Senegal | Exact |
| TUN | Tunisia | Tunisia | Exact |
| TUR | Turkey | Turkey | Exact |
| UKR | Ukraine | Ukraine | Exact |
| ZAF | South Africa | South Africa | Exact |
| NER | Niger | Niger | Exact |

**Mapping Strategy**: 
- Use ISO 3166-1 alpha-3 codes for countries in risk dataset
- Match to full country names in economic dataset
- Regional aggregates have consistent naming between datasets

---

## 2. TEMPORAL MAPPING

| Dimension | Risk Dataset | Economic Dataset | Overlap |
|-----------|--------------|------------------|---------|
| **Field Name** | TIME_PERIOD | Unnamed: 0 (first column) | - |
| **Start Year** | 1984 | 1996 | - |
| **End Year** | 2024 | 2025 | - |
| **Frequency** | Annual | Annual | Same |
| **Common Period** | - | - | **1996-2024** |
| **Usable Years** | - | - | **28 years** |

**Temporal Join Strategy**:
```
WHERE risk.TIME_PERIOD = economic.year
  AND risk.TIME_PERIOD BETWEEN 1996 AND 2024
```

---

## 3. RISK INDICATORS ↔ ECONOMIC INDICATORS RELATIONSHIPS

### 3.1 DEFAULT RATES ↔ MACROECONOMIC VARIABLES

#### Public Sector Default Rates (IFC_GEM_PBD, IFC_GEM_PBD_H)

| Risk Metric | Related Economic Indicators | Hypothesized Relationship | Lag |
|-------------|----------------------------|--------------------------|-----|
| Average public default rate (ADR) | GDP at market prices, current US$ | Negative correlation (↓ GDP → ↑ Default) | 0-1 year |
| Average public default rate (ADR) | GDP Deflator | Positive correlation (↑ Inflation → ↑ Default) | 0-1 year |
| Average public default rate (ADR) | Unemployment Rate | Positive correlation (↑ Unemployment → ↑ Default) | 1-2 years |
| Average public default rate (ADR) | Exchange rate (LCU per USD) | Positive correlation (↑ Depreciation → ↑ Default) | 0-1 year |
| Average public default rate (ADR) | Foreign Reserves | Negative correlation (↑ Reserves → ↓ Default) | 0 year |
| Counterparts (CP) | GDP at market prices | Positive correlation (↑ GDP → ↑ Participants) | 0 year |
| Signed Amount (SA) | GDP at market prices | Positive correlation (↑ GDP → ↑ Contract Size) | 0 year |

**Knowledge Graph Query Example**:
```cypher
MATCH (country:Country)-[e:HAS_ECONOMIC_VALUE]->(gdp:EconomicIndicator {name: 'GDP_current_USD'})
MATCH (country)-[r:HAS_RISK_MEASURE]->(risk:RiskIndicator {code: 'IFC_GEM_PBD'})
WHERE e.year = r.year
RETURN country.name, e.year, e.value AS gdp_value, r.value AS default_rate
```

#### Private Sector Default Rates (IFC_GEM_PRD, IFC_GEM_PRD_H)

| Risk Metric | Related Economic Indicators | Hypothesized Relationship | Lag |
|-------------|----------------------------|--------------------------|-----|
| Average private default rate (ADR) | Industrial Production | Negative correlation (↓ Production → ↑ Default) | 1-2 years |
| Average private default rate (ADR) | Retail Sales Volume Index | Negative correlation (↓ Sales → ↑ Default) | 1-2 years |
| Average private default rate (ADR) | Stock Markets (US$) | Negative correlation (↓ Stock Market → ↑ Default) | 0-1 year |
| Average private default rate (ADR) | CPI (% y-o-y) | Positive correlation (↑ Inflation → ↑ Default) | 1 year |
| Average private default rate (ADR) | Real Effective Exchange Rate | Negative correlation (↑ REER → ↑ Default) | 0-1 year |
| Private defaults by sector (SECTOR) | Sector-specific indicators | Sector-dependent | 1-2 years |

**Sector-Specific Mappings**:

| Risk Sector | Economic Indicator | Relationship Logic |
|-------------|-------------------|-------------------|
| SECTOR: I (Industrials) | Industrial Production | Direct sector performance indicator |
| SECTOR: CD (Consumer Discretionary) | Retail Sales Volume Index | Consumer spending indicator |
| SECTOR: F (Financials) | Stock Markets (LCU, US$) | Financial sector health |
| SECTOR: E (Energy) | Export/Import Prices | Commodity price proxy |
| SECTOR: M (Materials) | Export/Import volumes | Trade-dependent sectors |

#### Sovereign Default Rates (IFC_GEM_SD, IFC_GEM_SD_H)

| Risk Metric | Related Economic Indicators | Hypothesized Relationship | Lag |
|-------------|----------------------------|--------------------------|-----|
| Average sovereign default rate (ADR) | Total Reserves | Negative correlation (↑ Reserves → ↓ Default) | 0 year |
| Average sovereign default rate (ADR) | Foreign Reserves (months import) | Negative correlation (↑ Months → ↓ Default) | 0 year |
| Average sovereign default rate (ADR) | Terms of Trade | Negative correlation (↑ ToT → ↓ Default) | 0-1 year |
| Average sovereign default rate (ADR) | Export values | Negative correlation (↑ Exports → ↓ Default) | 0-1 year |
| Average sovereign default rate (ADR) | Official Exchange Rate | Positive correlation (↑ Depreciation → ↑ Default) | 0 year |
| Average sovereign default rate (ADR) | GDP growth rate | Negative correlation (↑ Growth → ↓ Default) | 0-1 year |

### 3.2 RECOVERY RATES ↔ ECONOMIC VARIABLES

#### Public Recovery Rates (IFC_GEM_PBR, IFC_GEM_PBR_H)

| Risk Metric | Related Economic Indicators | Hypothesized Relationship | Lag |
|-------------|----------------------------|--------------------------|-----|
| Average Recovery Rate (ARR) | GDP at market prices | Positive correlation (↑ GDP → ↑ Recovery) | 0-2 years |
| Average Recovery Rate (ARR) | Real Effective Exchange Rate | Positive correlation (↑ REER → ↑ Recovery) | 0-1 year |
| Average Recovery Rate (ARR) | Total Reserves | Positive correlation (↑ Reserves → ↑ Recovery) | 0 year |
| Recovery by SENIORITY | GDP growth rate | Senior securities recover more during growth | Variable |

#### Private Recovery Rates (IFC_GEM_PRR, IFC_GEM_PRR_H)

| Risk Metric | Related Economic Indicators | Hypothesized Relationship | Lag |
|-------------|----------------------------|--------------------------|-----|
| Average Recovery Rate (ARR) | Stock Markets (US$) | Positive correlation (↑ Market → ↑ Recovery) | 0-2 years |
| Average Recovery Rate (ARR) | Industrial Production | Positive correlation (↑ Production → ↑ Recovery) | 1-2 years |
| Average Recovery Rate (ARR) | Exchange Rate (LCU/USD) | Negative for foreign currency (↑ Depreciation → ↓ Recovery) | 0-1 year |
| Recovery by SECTOR | Sector-specific indicators | Sector performance drives recovery | Variable |

#### Sovereign Recovery Rates (IFC_GEM_SR, IFC_GEM_SR_H)

| Risk Metric | Related Economic Indicators | Hypothesized Relationship | Lag |
|-------------|----------------------------|--------------------------|-----|
| Average Recovery Rate (ARR) | Total Reserves | Positive correlation (↑ Reserves → ↑ Recovery) | 0 year |
| Average Recovery Rate (ARR) | GDP growth post-default | Positive correlation (↑ Growth → ↑ Recovery) | 1-3 years |
| Average Recovery Rate (ARR) | Terms of Trade | Positive correlation (↑ ToT → ↑ Recovery) | 0-1 year |
| Average Recovery Rate (ARR) | Export performance | Positive correlation (↑ Exports → ↑ Recovery) | 0-2 years |

---

## 4. CURRENCY TYPE ↔ EXCHANGE RATE RELATIONSHIPS

### Currency Type Classification (CURRENCY_TYPE)

| Risk Field | Economic Indicators | Relationship Mapping |
|-----------|-------------------|---------------------|
| **F (Foreign Currency)** | Exchange rate (LCU per USD) | ↑ Depreciation → ↑ Foreign currency default risk |
| **F (Foreign Currency)** | Nominal Effective Exchange Rate | ↓ NEER → ↑ Default risk |
| **F (Foreign Currency)** | Export values | ↑ Exports → ↓ Default risk (foreign currency earnings) |
| **L (Local Currency)** | CPI (% y-o-y) | ↑ Inflation → ↑ Local currency default risk |
| **L (Local Currency)** | GDP Deflator | High deflator → debt burden increases |
| **X (Mixed Currency)** | Real Effective Exchange Rate | Combined exposure to both risks |
| **X (Mixed Currency)** | Terms of Trade | Trade competitiveness affects mixed portfolios |

**Knowledge Graph Query Example**:
```cypher
MATCH (country:Country)-[e:HAS_ECONOMIC_VALUE]->(exch:EconomicIndicator {name: 'Exchange_Rate_USD'})
MATCH (country)-[r:HAS_RISK_MEASURE]->(risk:RiskIndicator {code: 'IFC_GEM_PRD'})
WHERE r.currency_type = 'F' AND e.year = r.year
RETURN country.name, e.year, 
       (e.value - LAG(e.value)) / LAG(e.value) AS depreciation_rate,
       r.value AS foreign_currency_default_rate
```

---

## 5. SECTOR ↔ ECONOMIC INDICATOR MAPPING

### GICS Sectors → Economic Indicators

| Risk Sector (GICS) | Code | Primary Economic Indicator | Secondary Indicators |
|--------------------|------|---------------------------|---------------------|
| **Financials** | F | Stock Markets (LCU, US$) | GDP, Exchange Rate, CPI |
| **Industrials** | I | Industrial Production | GDP, Exports, Exchange Rate |
| **Energy** | E | Export Merchandise (value, price) | Exchange Rate, Terms of Trade |
| **Materials** | M | Export Merchandise, Industrial Production | Import Merchandise, Exchange Rate |
| **Consumer Discretionary** | CD | Retail Sales Volume Index | GDP, CPI, Unemployment |
| **Consumer Staples** | CST | Retail Sales Volume Index, CPI | GDP, Exchange Rate |
| **Communication Services** | CS | GDP, Stock Markets | Exchange Rate |
| **Health Care** | HC | GDP | CPI, Exchange Rate |
| **Information Technology** | IT | GDP, Stock Markets | Industrial Production, Exchange Rate |
| **Utilities** | U | GDP, Industrial Production | CPI, Exchange Rate |
| **Administration** | A | GDP | Unemployment, CPI |
| **Others** | O | GDP | Multiple |

### Functional Sectors → Economic Indicators

| Risk Sector (Functional) | Code | Primary Economic Indicator | Secondary Indicators |
|--------------------------|------|---------------------------|---------------------|
| **Banking** | BK | Stock Markets, GDP | Exchange Rate, Total Reserves |
| **Infrastructure** | IN | GDP, Industrial Production | Government spending proxy (n/a), Exchange Rate |
| **Non-banking Financial** | NB | Stock Markets, GDP | Exchange Rate, CPI |
| **Services** | S | Retail Sales, GDP | Unemployment, CPI |
| **Financial Institutions** | FI | Stock Markets | GDP, Exchange Rate, Reserves |
| **Non-financial Institutions** | NF | GDP, Industrial Production | Sector-specific indicators |
| **Renewables** | R | GDP, Export/Import (energy) | Exchange Rate |

**Knowledge Graph Query Example**:
```cypher
MATCH (country:Country)-[e:HAS_ECONOMIC_VALUE]->(ind:EconomicIndicator {name: 'Industrial_Production'})
MATCH (country)-[r:HAS_RISK_MEASURE]->(risk:RiskIndicator {code: 'IFC_GEM_PRD'})
WHERE r.sector = 'I' AND e.year = r.year
RETURN country.name, e.year, e.value AS ind_prod, r.value AS industrial_sector_default
```

---

## 6. PROJECT TYPE ↔ ECONOMIC INDICATOR RELATIONSHIPS

### Project Finance (PF) Relationships

| Risk Dimension | Economic Indicators | Relationship Logic |
|----------------|-------------------|-------------------|
| PROJECT_TYPE: PF | GDP growth | Infrastructure financing correlates with GDP |
| PROJECT_TYPE: PF + SECTOR: IN | Industrial Production | Infrastructure supports industrial activity |
| PROJECT_TYPE: PF | Exchange Rate | Foreign-financed projects sensitive to FX |
| PROJECT_TYPE: PF | Total Reserves | Government backing for infrastructure |

### Corporate Finance (CF) Relationships

| Risk Dimension | Economic Indicators | Relationship Logic |
|----------------|-------------------|-------------------|
| PROJECT_TYPE: CF | Stock Markets | Corporate access to capital markets |
| PROJECT_TYPE: CF + SECTOR: (any) | Sector-specific indicators | Direct operational performance |
| PROJECT_TYPE: CF | Unemployment | Labor market health affects corporates |
| PROJECT_TYPE: CF | CPI | Inflation affects operating costs |

### Financial Institutions (FI) Relationships

| Risk Dimension | Economic Indicators | Relationship Logic |
|----------------|-------------------|-------------------|
| PROJECT_TYPE: FI | Stock Markets | Financial sector health |
| PROJECT_TYPE: FI | Total Reserves | Banking system liquidity |
| PROJECT_TYPE: FI | Exchange Rate | FX exposure of banks |
| PROJECT_TYPE: FI | GDP | Overall economic activity drives banking |

---

## 7. CONTRACT SIZE ↔ ECONOMIC SCALE RELATIONSHIPS

### Contract Size Patterns

| CONTRACT_SIZE | Range (EUR) | Related Economic Variables | Hypothesis |
|---------------|-------------|---------------------------|-----------|
| LT1M | < 1 Million | Retail Sales, Unemployment | Small business/consumer credit sensitive to micro conditions |
| 1T2M | 1-2 Million | GDP per capita, Retail Sales | SME financing |
| 2T5M | 2-5 Million | GDP, Industrial Production | Mid-size corporate/project finance |
| 5T10M | 5-10 Million | GDP, Stock Markets | Larger corporate transactions |
| 10T25M | 10-25 Million | GDP, Exports/Imports | Significant corporate/project deals |
| GT25M | > 25 Million | GDP, Total Reserves, Exports | Sovereign/large corporate transactions |

**Analysis Approach**:
- Smaller contracts (LT1M, 1T2M) → More sensitive to unemployment, retail activity
- Medium contracts (2T5M, 5T10M) → GDP and sector-specific indicators
- Large contracts (10T25M, GT25M) → Macro variables, reserves, trade balance

---

## 8. REGIONAL ANALYSIS FRAMEWORK

### Region-Specific Economic Profiles

| Region (REF_AREA) | Key Economic Drivers | Priority Economic Indicators | Default Risk Factors |
|-------------------|---------------------|------------------------------|---------------------|
| **EAS** (East Asia & Pacific) | Manufacturing, Exports | Industrial Production, Exports, REER | Export dependence, FX volatility |
| **ECS** (Europe & Central Asia) | Diversified, EU integration | GDP, Stock Markets, Exchange Rate | Political risk, EU linkages |
| **LCN** (Latin America & Caribbean) | Commodities, Consumption | Exports, Terms of Trade, CPI, Exchange Rate | Commodity price shocks, FX crises |
| **MEA** (Middle East & North Africa) | Oil/Gas, Government | Exports, Exchange Rate, GDP | Oil price volatility, fiscal dependency |
| **SAS** (South Asia) | Services, Agriculture | GDP, Retail Sales, CPI, Exchange Rate | External balance, inflation |
| **SSF** (Sub-Saharan Africa) | Commodities, Agriculture | GDP, Exports, Exchange Rate, Foreign Reserves | Commodity dependence, reserve adequacy |

**Regional Query Pattern**:
```cypher
MATCH (region:Region {code: 'EAS'})<-[:BELONGS_TO]-(country:Country)
MATCH (country)-[e:HAS_ECONOMIC_VALUE]->(ind:EconomicIndicator)
MATCH (country)-[r:HAS_RISK_MEASURE]->(risk:RiskIndicator)
WHERE e.name IN ['Industrial_Production', 'Exports_USD'] AND e.year = r.year
RETURN country.name, AVG(r.value) AS avg_default_rate, 
       CORRELATION(e.value, r.value) AS correlation
```

---

## 9. TIME LAG STRUCTURES

### Leading Indicators (Economic → Risk)

| Economic Indicator | Risk Indicator | Expected Lag | Rationale |
|-------------------|----------------|--------------|-----------|
| Industrial Production | Private default rates (SECTOR: I, M) | 1-2 years | Production decline → financial distress → default |
| Retail Sales | Consumer sector defaults (SECTOR: CD, CST) | 1-2 years | Sales weakness → profitability issues → default |
| Unemployment Rate | Private default rates (overall) | 1-2 years | Labor market → consumer credit → corporate revenue |
| GDP growth | All default rates | 0-1 year | Broad economic health indicator |
| Exchange Rate changes | Foreign currency defaults | 0-1 year | Immediate FX pressure on debt service |
| Stock Market | Financial sector defaults (SECTOR: F, FI) | 0-1 year | Market stress → financial institution health |
| CPI inflation | Local currency defaults | 1 year | Inflation → real debt burden → default |
| Total Reserves | Sovereign default rates | 0 year | Immediate liquidity indicator |
| Export values | Sovereign default rates | 0-1 year | Foreign exchange earnings → debt service capacity |

### Lagging Indicators (Risk → Economic)

| Risk Indicator | Economic Indicator | Expected Lag | Rationale |
|----------------|-------------------|--------------|-----------|
| Financial sector defaults | GDP | 1-2 years | Banking crises → credit crunch → economic slowdown |
| Sovereign defaults | Exchange Rate | 0 year | Immediate confidence impact |
| Private defaults (aggregate) | Unemployment | 1-2 years | Corporate distress → layoffs |
| Sector defaults | Sector-specific production | 0-1 year | Defaults signal sector weakness |

**Lag Analysis Query**:
```cypher
MATCH (country:Country)-[e:HAS_ECONOMIC_VALUE]->(econ:EconomicIndicator {name: 'GDP_growth'})
MATCH (country)-[r:HAS_RISK_MEASURE]->(risk:RiskIndicator {code: 'IFC_GEM_PRD'})
WHERE e.year = r.year - 1  // 1-year lag
RETURN country.name, e.year AS economic_year, r.year AS risk_year,
       e.value AS gdp_growth_t1, r.value AS default_rate_t
ORDER BY r.value DESC
```

---

## 10. COMPOSITE RELATIONSHIP PATTERNS

### Multi-Dimensional Risk Profiles

#### High-Risk Configuration
```
Country characteristics:
- GDP growth < 0% (recession)
- Exchange rate depreciation > 15% y-o-y
- Unemployment > 10%
- Foreign reserves < 3 months of imports
- Inflation (CPI) > 10% y-o-y

Expected Risk Profile:
- High default rates across all categories (public, private, sovereign)
- Low recovery rates
- Higher defaults in foreign currency (CURRENCY_TYPE: F)
- Larger impact on large contracts (CONTRACT_SIZE: GT25M)
```

#### Stress Test Scenario Propagation
```cypher
// Example: Exchange Rate Shock Scenario
MATCH (country:Country)-[e:HAS_ECONOMIC_VALUE]->(exch:EconomicIndicator {name: 'Exchange_Rate_USD'})
WITH country, exch.value AS current_rate, exch.value * 1.30 AS shocked_rate  // 30% depreciation

MATCH (country)-[r:HAS_RISK_MEASURE]->(risk:RiskIndicator)
WHERE r.currency_type = 'F'

WITH country, shocked_rate, current_rate, risk,
     risk.value * (1 + 0.5 * (shocked_rate - current_rate) / current_rate) AS projected_default_rate
     // Assuming 50% pass-through from FX depreciation to default rate

RETURN country.name, 
       (shocked_rate - current_rate) / current_rate AS fx_shock_pct,
       risk.value AS current_default_rate,
       projected_default_rate,
       (projected_default_rate - risk.value) / risk.value AS default_rate_increase_pct
ORDER BY default_rate_increase_pct DESC
```

### Cross-Sectional Analysis

#### Country Comparison Framework
```cypher
// Compare countries with similar GDP but different default rates
MATCH (c1:Country)-[e1:HAS_ECONOMIC_VALUE]->(gdp1:EconomicIndicator {name: 'GDP_current_USD'})
MATCH (c2:Country)-[e2:HAS_ECONOMIC_VALUE]->(gdp2:EconomicIndicator {name: 'GDP_current_USD'})
MATCH (c1)-[r1:HAS_RISK_MEASURE]->(risk1:RiskIndicator {code: 'IFC_GEM_PRD'})
MATCH (c2)-[r2:HAS_RISK_MEASURE]->(risk2:RiskIndicator {code: 'IFC_GEM_PRD'})

WHERE e1.year = e2.year = r1.year = r2.year
  AND ABS(e1.value - e2.value) / e1.value < 0.1  // Similar GDP (within 10%)
  AND c1.name <> c2.name
  AND ABS(r1.value - r2.value) > 2.0  // Different default rates (>2 percentage points)

RETURN c1.name AS country1, c2.name AS country2, e1.year,
       e1.value AS gdp1, e2.value AS gdp2,
       r1.value AS default_rate1, r2.value AS default_rate2
```

---

## 11. DATA INTEGRATION CHECKLIST

### Required Transformations

#### 1. Geographic Harmonization
- [ ] Create mapping table: Risk REF_AREA codes → Economic country names
- [ ] Handle regional aggregates separately
- [ ] Validate all country codes have economic data counterparts
- [ ] Document countries present in one dataset but not the other

#### 2. Temporal Alignment
- [ ] Extract years from both datasets (TIME_PERIOD and first column)
- [ ] Filter to overlap period (1996-2024)
- [ ] Ensure annual frequency alignment
- [ ] Handle any missing years in either dataset

#### 3. Unit Standardization
- [ ] Convert all monetary values to consistent currency (USD preferred)
- [ ] Apply UNIT_MULT multipliers from risk dataset (millions)
- [ ] Standardize percentage formats (decimals vs. whole numbers)
- [ ] Document all unit conversions

#### 4. Indicator Naming
- [ ] Create standardized indicator names for knowledge graph
- [ ] Map risk INDICATOR codes to readable labels
- [ ] Map economic file names to standardized indicator names
- [ ] Handle seasonally adjusted vs. not adjusted variants

#### 5. Missing Data Handling
- [ ] Identify missing values in both datasets
- [ ] Determine interpolation strategies (if any)
- [ ] Document coverage patterns by country/indicator/year
- [ ] Flag low-confidence values

#### 6. Categorical Encoding
- [ ] Encode SECTOR categories consistently
- [ ] Encode PROJECT_TYPE, CURRENCY_TYPE, SENIORITY
- [ ] Create hierarchies (e.g., GICS sector hierarchy)
- [ ] Validate all categorical values

---

## 12. KNOWLEDGE GRAPH SCHEMA SUMMARY

### Node Types and Properties

```
Country {
  code: string (ISO 3166-1 alpha-3)
  name: string
  region: string (EAS, ECS, LCN, MEA, SAS, SSF)
  income_level: string (Low, Lower-Middle, Upper-Middle, High)
}

Region {
  code: string (EAS, ECS, LCN, MEA, SAS, SSF, _T)
  name: string
}

Year {
  year: integer (1996-2024)
}

EconomicIndicator {
  code: string
  name: string
  category: string (GDP, CPI, Exchange Rate, Trade, etc.)
  unit: string
  seasonally_adjusted: boolean
}

RiskIndicator {
  code: string (IFC_GEM_*)
  name: string
  type: string (Default, Recovery)
  borrower_type: string (Public, Private, Sovereign)
}

Sector {
  code: string
  name: string
  classification: string (GICS, Functional)
}

Observation {
  value: float
  unit: string
  confidence: string
}
```

### Relationship Types and Properties

```
(:Country)-[:BELONGS_TO_REGION]->(:Region)
(:Country)-[:HAS_ECONOMIC_VALUE {year, value, unit}]->(:EconomicIndicator)
(:Country)-[:HAS_RISK_MEASURE {year, value, metric, sector, currency, project_type, contract_size, seniority}]->(:RiskIndicator)
(:EconomicIndicator)-[:CORRELATES_WITH {correlation, lag, p_value}]->(:RiskIndicator)
(:EconomicIndicator)-[:IMPACTS {direction, magnitude, lag}]->(:RiskIndicator)
(:RiskIndicator)-[:MEASURED_IN]->(:Sector)
(:Year)-[:NEXT]->(:Year)
(:Country)-[:SIMILAR_GDP]->(:Country)
(:Country)-[:TRADES_WITH]->(:Country)
```

---

## 13. NEXT STEPS FOR IMPLEMENTATION

### Data Loading Priority

1. **Phase 1: Core Entities**
   - Load Country and Region nodes with hierarchies
   - Load Year nodes with temporal sequence
   - Validate geographic and temporal coverage

2. **Phase 2: Economic Data**
   - Load 10 key economic indicators first:
     - GDP (current USD)
     - Exchange Rate (LCU per USD)
     - CPI (% y-o-y)
     - Unemployment Rate
     - Industrial Production
     - Exports (current USD)
     - Imports (current USD)
     - Stock Markets (USD)
     - Total Reserves
     - Foreign Reserves (months import)
   - Create HAS_ECONOMIC_VALUE relationships

3. **Phase 3: Risk Data**
   - Load risk indicators (default and recovery rates)
   - Filter to relevant combinations (exclude "_Z" not applicable values)
   - Create HAS_RISK_MEASURE relationships
   - Add sector, project type, currency type properties

4. **Phase 4: Derived Relationships**
   - Calculate correlations between economic and risk indicators
   - Identify statistically significant relationships
   - Add lag structures
   - Create IMPACTS and CORRELATES_WITH edges

5. **Phase 5: Advanced Analytics**
   - Implement pattern matching queries
   - Build composite risk indicators
   - Create stress test scenarios
   - Develop early warning indicators

### Validation Queries

```cypher
// 1. Check data coverage
MATCH (c:Country)-[e:HAS_ECONOMIC_VALUE]->(ind:EconomicIndicator)
RETURN c.name, ind.name, COUNT(e) AS num_years
ORDER BY num_years DESC

// 2. Verify temporal alignment
MATCH (c:Country)-[e:HAS_ECONOMIC_VALUE]->(:EconomicIndicator)
MATCH (c)-[r:HAS_RISK_MEASURE]->(:RiskIndicator)
WHERE e.year = r.year
RETURN e.year, COUNT(DISTINCT c) AS countries_with_both_data
ORDER BY e.year

// 3. Identify missing relationships
MATCH (c:Country)
WHERE NOT (c)-[:HAS_ECONOMIC_VALUE]->()
   OR NOT (c)-[:HAS_RISK_MEASURE]->()
RETURN c.name, 
       EXISTS((c)-[:HAS_ECONOMIC_VALUE]->()) AS has_economic,
       EXISTS((c)-[:HAS_RISK_MEASURE]->()) AS has_risk

// 4. Check correlation patterns
MATCH (c:Country)-[e:HAS_ECONOMIC_VALUE]->(econ:EconomicIndicator {name: 'GDP_growth'})
MATCH (c)-[r:HAS_RISK_MEASURE]->(risk:RiskIndicator {code: 'IFC_GEM_PRD'})
WHERE e.year = r.year
WITH econ, risk, CORRELATION(e.value, r.value) AS corr, COUNT(*) AS n
WHERE n > 20 AND ABS(corr) > 0.3
RETURN econ.name, risk.name, corr, n
ORDER BY ABS(corr) DESC
```

---

## CONCLUSION

This mapping document provides the foundation for constructing a comprehensive knowledge graph linking emerging market risk indicators with macroeconomic variables. The explicit relationships defined here enable:

1. **Direct querying** of risk-economic indicator pairs
2. **Multi-dimensional analysis** across countries, sectors, time periods
3. **Predictive modeling** using leading/lagging relationships
4. **Scenario analysis** by propagating shocks through the graph
5. **Comparative analysis** across countries and regions
6. **Early warning systems** by monitoring threshold relationships

The knowledge graph will support sophisticated economic research questions by making these complex, multi-dimensional relationships queryable and analyzable at scale.

