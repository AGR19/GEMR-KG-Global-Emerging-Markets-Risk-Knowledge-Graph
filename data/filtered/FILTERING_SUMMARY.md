# Data Filtering Summary

## Overview
All datasets have been filtered for **6 specific countries** from **2002 to 2023** (inclusive).

## Target Countries
1. **Brazil** (BRA)
2. **Mexico** (MEX)
3. **Poland** (POL)
4. **Philippines** (PHL)
5. **Thailand** (THA)
6. **China** (CHN)

## Time Period
- **Start Year**: 2002
- **End Year**: 2023
- **Total Years**: 22 years

## Filtered Datasets

### 1. GemDataEXTR Economic Data (35 files)
**Source**: `data/raw/economy/GemDataEXTR/`  
**Output**: `data/filtered/economy/sorted_*.xlsx`

All 37 original xlsx files were processed. 35 files containing data for the target countries and years were successfully filtered and saved. 2 files were skipped:
- `CPI Price, % y-o-y, median weighted, seas. adj..xlsx` - No individual country columns
- `Terms of Trade.xlsx` - Different date format, no data in target year range

**Filtered Files Include**:
- CPI Price data (various formats)
- Core CPI data
- Exchange rate data
- Export/Import merchandise data
- Foreign reserves
- GDP data (multiple measures)
- Industrial production
- Stock market data
- Total reserves
- Unemployment rate
- And more...

**Structure**: 
- Rows: 22 (one per year, 2002-2023)
- Columns: Date column + target country columns (varies by file)

### 2. IFC_GEM Risk Database
**Source**: `data/raw/risk/IFC_GEM.csv`  
**Output**: `data/filtered/sorted_IFC_GEM.csv`

**Statistics**:
- Original rows: 23,155
- Filtered rows: 1,033
- Columns: 45 (all original columns retained)
- Countries: BRA, CHN, MEX, PHL, POL, THA
- Years: 2002-2023

**Key Fields**:
- `REF_AREA`: Country code
- `TIME_PERIOD`: Year
- `INDICATOR`: Risk indicator type
- `OBS_VALUE`: Observation value

### 3. World Governance Indicators Dataset
**Source**: `data/raw/wgidataset_with_sourcedata_excel/wgidataset_with_sourcedata.xlsx`  
**Output**: `data/filtered/sorted_wgidataset_with_sourcedata.xlsx`

**Statistics**:
- Original rows: 32,100
- Filtered rows: 792
- Columns: 48 (all original columns retained)
- Countries: Brazil, China, Mexico, Philippines, Poland, Thailand
- Years: 2002-2023

**Key Fields**:
- `countryname`: Full country name
- `code`: Country code
- `year`: Year
- `indicator`: Governance indicator code
- `estimate`: Indicator estimate value

## Directory Structure
```
data/filtered/
├── economy/                          # GemDataEXTR economic data (35 xlsx files)
│   ├── sorted_CPI Price*.xlsx
│   ├── sorted_GDP*.xlsx
│   ├── sorted_Exchange rate*.xlsx
│   └── ... (and more)
├── sorted_IFC_GEM.csv               # Risk database
├── sorted_wgidataset_with_sourcedata.xlsx  # World Governance Indicators
└── FILTERING_SUMMARY.md             # This file
```

## File Naming Convention
All filtered files follow the naming pattern: `sorted_{original_filename}`

## Data Integrity
- ✅ No raw data was altered or modified
- ✅ Only filtering operations (row and column selection) were performed
- ✅ All original column names and data types preserved
- ✅ Years 2002-2023 verified in all datasets
- ✅ All 6 target countries verified in all datasets

## Verification Results

### Sample: GDP at Market Prices
- Years: 2002-2023 ✓
- Countries: Brazil, China, Hong Kong SAR China, Mexico, Philippines, Poland, Thailand, Taiwan China ✓
- Data example: Brazil GDP 2002 = $521,726.3M ✓

### IFC_GEM CSV
- Unique countries: ['BRA', 'POL', 'CHN', 'MEX', 'PHL', 'THA'] ✓
- Year range: 2002-2023 ✓

### WGI Dataset
- Unique countries: ['Brazil', 'China', 'Mexico', 'Philippines', 'Poland', 'Thailand'] ✓
- Year range: 2002-2023 ✓

## Processing Script
Location: `scripts/filter_datasets.py`

The script can be re-run at any time to regenerate the filtered datasets:
```bash
python3 scripts/filter_datasets.py
```

## Date of Processing
November 8, 2025

---
**Note**: Some files may include additional country variants (e.g., "Hong Kong SAR, China", "Taiwan, China") as they matched the search pattern for "China". These have been retained to preserve all potentially relevant data.

