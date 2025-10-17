# Executive Summary: GEMR-KG Dataset Analysis

## Overview

This document provides a high-level summary of the dataset analysis for the Global Emerging Markets Risk Knowledge Graph (GEMR-KG) project.

---

## 📊 Dataset Snapshot

### Risk Dataset (IFC_GEM.csv)
- **Source**: World Bank IFC Global Emerging Markets Risk Database
- **Size**: 23,155 observations
- **Columns**: 45 fields
- **Time Coverage**: 1984-2024 (40 years, Annual frequency)
- **Geographic Coverage**: 132 entities (regions + countries)

### Economic Dataset (37 Excel Files)
- **Source**: World Bank Global Economic Monitor
- **Indicators**: 37 different economic measures
- **Time Coverage**: 1996-2025 (30 years, Annual frequency)
- **Geographic Coverage**: Up to 199 entities per indicator

### Common Analysis Period
**1996-2024 (28 years)** - The overlap period where both datasets have data

---

## 🗂️ What's in the Risk Dataset?

### 12 Risk Indicators (3 Borrower Types × 2 Measure Types × 2 Versions)

**Borrower Types:**
1. **Public Sector** (Government-owned entities)
2. **Private Sector** (Corporations)
3. **Sovereign** (National governments)

**Measure Types:**
1. **Default Rates** - Percentage of borrowers that defaulted
2. **Recovery Rates** - Percentage recovered after default

**Versions:**
- **Average** - Summary statistics across time
- **Historical** - Year-by-year values

### 11 Metrics Tracked
- Counterparts (number of borrowers)
- Defaults (count)
- Signed Amount (EUR millions)
- Average Default Rate (%)
- Average Recovery Rate (%)
- Observed Years
- Observations (count)
- Min/Max observations
- Contracts
- Median

### 7 Dimensions of Analysis
1. **Geography**: 132 countries and regions (Brazil, Egypt, Turkey, South Africa, etc.)
2. **Sectors**: 20+ sectors (Banking, Energy, Industrials, Consumer, Infrastructure, etc.)
3. **Project Types**: Corporate Finance, Project Finance, Structured Finance, etc.
4. **Currency Types**: Foreign, Local, Mixed
5. **Contract Sizes**: <1M to >25M EUR (7 bands)
6. **Seniority**: Senior, Senior-Secured, Subordinated, etc.
7. **Time**: Annual data from 1984-2024

---

## 📈 What's in the Economic Dataset?

### 9 Categories, 37 Indicators

1. **GDP & Growth** (5 indicators)
   - GDP in constant/current prices, LCU/USD
   - GDP Deflator

2. **Inflation & Prices** (6 indicators)
   - CPI (multiple variations)
   - Core CPI

3. **Exchange Rates** (4 indicators)
   - LCU per USD
   - Nominal and Real Effective Exchange Rates

4. **Exports** (6 indicators)
   - Values (constant/current USD)
   - Prices

5. **Imports** (7 indicators)
   - Values (constant/current USD)
   - Prices
   - Foreign Reserves in months of imports

6. **Trade** (1 indicator)
   - Terms of Trade

7. **Financial** (3 indicators)
   - Stock Markets (LCU/USD)
   - Total Reserves

8. **Real Sector** (3 indicators)
   - Industrial Production
   - Retail Sales Volume

9. **Labor Market** (1 indicator)
   - Unemployment Rate

### Geographic Coverage
- 187 individual countries
- 7 regional groups (East Asia & Pacific, Europe & Central Asia, Latin America & Caribbean, Middle East & North Africa, South Asia, Sub-Saharan Africa, EMDEs overall)
- 5 income-based groups (Advanced Economies, High Income, Middle Income, Low Income, World)

---

## 🔗 Key Relationships Between Datasets

### How Data Connects

| Linking Dimension | Risk Dataset | Economic Dataset | Join Strategy |
|-------------------|--------------|------------------|---------------|
| **Geography** | REF_AREA codes (e.g., BRA, EGY, TUR) | Column names (Brazil, Egypt, Turkey) | Map codes to names |
| **Time** | TIME_PERIOD (1984-2024) | First column (1996-2025) | Year-to-year match |
| **Common Period** | — | — | **1996-2024** |

### Expected Correlations

#### Strong Relationships (Based on Economic Theory)

| Economic Indicator ➔ | Risk Indicator | Expected Direction | Lag |
|----------------------|----------------|-------------------|-----|
| GDP Growth ↓ | Default Rates ↑ | Negative | 0-1 year |
| Exchange Rate Depreciation ↑ | Foreign Currency Defaults ↑ | Positive | 0-1 year |
| Unemployment ↑ | Private Defaults ↑ | Positive | 1-2 years |
| Stock Market ↓ | Financial Sector Defaults ↑ | Negative | 0-1 year |
| Total Reserves ↑ | Sovereign Defaults ↓ | Negative | 0 year |
| Industrial Production ↓ | Industrial Sector Defaults ↑ | Negative | 1-2 years |

---

## ❓ Sample Research Questions

### Top 10 Questions the Knowledge Graph Will Answer

1. **How does GDP volatility affect default rates across regions?**
   - Compare East Asia vs. Latin America vs. Sub-Saharan Africa

2. **Which economic indicators predict sovereign defaults 1-2 years in advance?**
   - GDP, reserves, exchange rates, trade balance, etc.

3. **How do exchange rate shocks impact foreign vs. local currency defaults?**
   - Analyze CURRENCY_TYPE dimension with exchange rate data

4. **Do larger loans (>25M EUR) have different risk profiles than smaller loans?**
   - CONTRACT_SIZE analysis across economic conditions

5. **Which sectors are most vulnerable to unemployment shocks?**
   - SECTOR analysis (Consumer Discretionary, Services, etc.) vs. unemployment

6. **How do recovery rates vary with economic recovery speed?**
   - Recovery rates vs. GDP growth post-default

7. **What's the relationship between stock market crashes and banking defaults?**
   - SECTOR: Banking vs. Stock Markets indicator

8. **Do infrastructure projects show different default patterns than corporate finance?**
   - PROJECT_TYPE: PF vs. CF across economic cycles

9. **Which countries have "outperformed" or "underperformed" their economic fundamentals?**
   - Compare actual default rates to predictions from economic indicators

10. **How do regional contagion effects work?**
    - Do defaults in one country predict defaults in neighboring countries?

*See comprehensive documentation for 120+ detailed research questions across 12 categories.*

---

## 🏗️ Knowledge Graph Structure

### Node Types (Entities)

1. **Country/Region** (132 entities)
2. **Year** (1996-2024)
3. **Economic Indicator** (37 types)
4. **Risk Indicator** (12 types)
5. **Sector** (20+ types)
6. **Project** (characterized by type, size, currency, seniority)

### Relationship Types (Edges)

1. **Country → Economic Indicator** (HAS_ECONOMIC_VALUE)
   - Properties: year, value, unit

2. **Country → Risk Indicator** (HAS_RISK_MEASURE)
   - Properties: year, value, metric, sector, currency, project_type, contract_size, seniority

3. **Economic Indicator ↔ Risk Indicator** (CORRELATES_WITH, IMPACTS)
   - Properties: correlation coefficient, lag, significance

4. **Country → Region** (BELONGS_TO)

5. **Year → Year** (NEXT) - temporal sequence

### Example Query Patterns

**Pattern 1: Economic Indicator Impact on Risk**
```
Country → Has Economic Value (GDP) → Correlates With → Risk Indicator (Default Rate)
```

**Pattern 2: Multi-dimensional Risk Analysis**
```
Country → Has Risk Measure (filtered by Sector, Currency, Project Type) → Compare across Years
```

**Pattern 3: Regional Comparison**
```
Region → Contains Countries → Countries have Risk/Economic values → Aggregate and compare
```

---

## 📋 Implementation Roadmap

### Phase 1: Data Loading ✓ (Completed - Analysis)
- [x] Analyze risk dataset structure
- [x] Analyze economic dataset structure
- [x] Identify relationships and research questions
- [x] Document all fields and labels

### Phase 2: Data Preparation (Next Steps)
- [ ] Create country code mapping table (REF_AREA ↔ country names)
- [ ] Extract and harmonize time periods (1996-2024)
- [ ] Standardize units (USD, percentages, etc.)
- [ ] Handle missing data
- [ ] Create indicator name standardization

### Phase 3: Knowledge Graph Construction
- [ ] Set up graph database (Neo4j recommended)
- [ ] Load core entities (Countries, Regions, Years)
- [ ] Load economic indicator values
- [ ] Load risk indicator values
- [ ] Create relationship edges

### Phase 4: Analytics & Validation
- [ ] Calculate correlations
- [ ] Identify significant relationships
- [ ] Implement lag analysis
- [ ] Validate with economic theory
- [ ] Create derived indicators

### Phase 5: Research & Visualization
- [ ] Implement research questions as queries
- [ ] Build dashboards
- [ ] Conduct statistical analysis
- [ ] Prepare research paper findings

---

## 📚 Documentation Structure

### Main Documents (Created)

1. **DATASET_ANALYSIS_AND_RESEARCH_QUESTIONS.md** (Comprehensive, 40+ pages)
   - Full dataset specifications
   - 120+ research questions across 12 categories
   - Knowledge graph design
   - Implementation priorities

2. **DATA_RELATIONSHIP_MAPPING.md** (Detailed, 30+ pages)
   - Explicit field mappings
   - Hypothesized correlations with lags
   - Sector-specific relationships
   - Cypher query examples
   - Data integration checklist

3. **FIELDS_AND_LABELS_REFERENCE.md** (Reference, 25+ pages)
   - Complete field list for risk dataset (45 columns)
   - All codes and labels
   - All 37 economic indicators
   - Quick lookup tables

4. **EXECUTIVE_SUMMARY.md** (This document, 5-minute read)
   - High-level overview
   - Key insights
   - Quick reference

5. **README.md** (Updated)
   - Project overview
   - Links to all documentation
   - Key findings summary

---

## 🎯 Expected Outcomes

### Research Contributions

1. **Comprehensive Risk Model**: Multi-dimensional emerging market risk assessment combining default probabilities, recovery rates, and macroeconomic fundamentals

2. **Early Warning System**: Identification of leading indicators that predict default events 1-2 years in advance

3. **Sectoral Vulnerability Map**: Understanding which sectors are most vulnerable to specific economic shocks

4. **Regional Risk Patterns**: Documenting how risk propagates across regions and income groups

5. **Policy Insights**: Evidence-based recommendations on reserve adequacy, exchange rate management, and sector-specific vulnerabilities

### Practical Applications

1. **Investment Decision Support**: Risk-adjusted portfolio allocation for emerging market debt/equity
2. **Country Risk Assessment**: Comprehensive profiles for 132 countries/regions
3. **Stress Testing**: Scenario analysis for economic shocks
4. **Regulatory Planning**: Reserve requirements, prudential standards
5. **Academic Research**: Foundation for empirical studies on emerging market risk

---

## 📊 Data Quality Summary

### Strengths
✅ **Comprehensive Coverage**: 132 countries, 28 years, multiple dimensions  
✅ **High Granularity**: Risk data broken down by sector, currency, size, seniority  
✅ **Consistent Frequency**: Annual data for both datasets  
✅ **Official Source**: World Bank data with established methodology  
✅ **Rich Economic Context**: 37 macroeconomic indicators  

### Considerations
⚠️ **Temporal Overlap**: Only 28 years of common data (1996-2024)  
⚠️ **Variable Coverage**: Not all countries have all indicators for all years  
⚠️ **Geographic Mapping**: Requires code-to-name mapping between datasets  
⚠️ **Unit Harmonization**: Different units require standardization  

---

## 🚀 Next Steps

### Immediate Actions
1. Review the three main analysis documents
2. Validate research questions with domain experts
3. Begin data preparation (country mapping, unit standardization)
4. Select graph database platform (Neo4j recommended)
5. Create data loading scripts

### Success Criteria
- [ ] All 132 countries mapped between datasets
- [ ] 28 years of data (1996-2024) successfully loaded
- [ ] Able to query: "What's Brazil's default rate when GDP falls by X%?"
- [ ] Can visualize: Regional default rate trends over time
- [ ] Can calculate: Correlation matrices between economic and risk indicators
- [ ] Can predict: Future default probabilities based on current economic indicators

---

## 📖 How to Use This Documentation

**New to the project?** Start here (5 min) → [README.md](README.md) (10 min)

**Need specific field information?** → [FIELDS_AND_LABELS_REFERENCE.md](FIELDS_AND_LABELS_REFERENCE.md)

**Planning knowledge graph?** → [DATA_RELATIONSHIP_MAPPING.md](DATA_RELATIONSHIP_MAPPING.md)

**Defining research questions?** → [DATASET_ANALYSIS_AND_RESEARCH_QUESTIONS.md](DATASET_ANALYSIS_AND_RESEARCH_QUESTIONS.md)

**Implementing the system?** → All documents + data integration checklist in mapping document

---

## 🔍 Key Insights at a Glance

### Dataset Dimensions
| Dimension | Risk Dataset | Economic Dataset | Common |
|-----------|--------------|------------------|---------|
| **Countries** | 132 | 199 | ~100+ |
| **Years** | 41 (1984-2024) | 30 (1996-2025) | **28 (1996-2024)** |
| **Indicators** | 12 risk measures | 37 economic measures | — |
| **Additional Dimensions** | Sector, Currency, Size, Seniority | — | — |
| **Total Data Points** | 23,155 | ~220,000+ | — |

### Regional Coverage (Both Datasets)
- ✅ East Asia & Pacific
- ✅ Europe & Central Asia
- ✅ Latin America & Caribbean
- ✅ Middle East & North Africa
- ✅ South Asia
- ✅ Sub-Saharan Africa

### Risk Dimensions
- **3** Borrower Types: Public, Private, Sovereign
- **2** Measure Types: Default Rates, Recovery Rates
- **20+** Sectors: Banking, Energy, Infrastructure, etc.
- **5** Currency Types: Foreign, Local, Mixed, All, N/A
- **7** Contract Size Bands: <1M to >25M EUR
- **7** Seniority Levels: Senior, Senior-Secured, Subordinated, etc.

### Economic Dimensions
- **9** Categories: GDP, CPI, Exchange Rates, Trade, Financial, Real Sector, Labor
- **37** Specific Indicators
- **2** Versions for many: Seasonally adjusted vs. not adjusted
- **3** Price bases: Constant 2010, Current, Index

---

## 💡 Why This Matters

### The Big Picture
This knowledge graph will enable researchers, policymakers, and investors to understand the **complex interplay between macroeconomic conditions and credit risk in emerging markets** at an unprecedented level of granularity.

### Novel Contributions
1. **Multi-dimensional Analysis**: First comprehensive linkage of these two World Bank datasets
2. **Sectoral Granularity**: Understanding risk at the sector level, not just country level
3. **Currency Risk Decomposition**: Separating foreign vs. local currency risk factors
4. **Size-Based Analysis**: Understanding how contract size affects risk profiles
5. **Temporal Dynamics**: 28 years of data enabling business cycle analysis

### Practical Value
- **For Investors**: Better risk-adjusted returns through data-driven country/sector selection
- **For Policymakers**: Evidence-based decisions on reserves, exchange rate policy, sector support
- **For Researchers**: Rich dataset for empirical studies on emerging market risk
- **For Regulators**: Benchmarking and stress testing frameworks
- **For Development Institutions**: Identify high-risk sectors/countries needing support

---

## 📞 Getting Started Checklist

- [ ] Read this Executive Summary (you're here!)
- [ ] Review README.md for project overview
- [ ] Browse FIELDS_AND_LABELS_REFERENCE.md to understand data structure
- [ ] Identify your research questions in DATASET_ANALYSIS_AND_RESEARCH_QUESTIONS.md
- [ ] Review DATA_RELATIONSHIP_MAPPING.md for implementation guidance
- [ ] Set up development environment (Python, Neo4j/graph database)
- [ ] Begin data preparation phase

---

**Project**: GEMR-KG - Global Emerging Markets Risk Knowledge Graph  
**Data Sources**: World Bank (IFC GEM Risk Database + Global Economic Monitor)  
**Analysis Date**: October 2025  
**Status**: Phase 1 Complete (Data Analysis), Ready for Phase 2 (Data Preparation)

