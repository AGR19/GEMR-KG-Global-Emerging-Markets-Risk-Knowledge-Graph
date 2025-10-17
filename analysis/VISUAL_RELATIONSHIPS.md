# Visual Relationship Diagrams

This document provides visual representations of the data structures and relationships in the GEMR-KG project.

---

## 1. Dataset Overview

```mermaid
graph TB
    subgraph "Risk Dataset"
        R[IFC_GEM.csv<br/>23,155 rows<br/>45 columns<br/>1984-2024]
    end
    
    subgraph "Economic Dataset"
        E[37 Excel Files<br/>~220K+ data points<br/>1996-2025]
    end
    
    subgraph "Common Dimensions"
        C[Country/Region<br/>~100+ overlap]
        T[Time Period<br/>1996-2024<br/>28 years]
    end
    
    R -->|REF_AREA| C
    E -->|Column Names| C
    R -->|TIME_PERIOD| T
    E -->|Year Column| T
    
    style R fill:#e1f5ff
    style E fill:#fff5e1
    style C fill:#e8f5e9
    style T fill:#f3e5f5
```

---

## 2. Risk Dataset Structure

```mermaid
graph LR
    subgraph "Core Dimensions"
        GEO[Geographic<br/>132 entities<br/>Regions + Countries]
        TIME[Time<br/>1984-2024<br/>Annual]
        IND[Risk Indicators<br/>12 types<br/>Default/Recovery]
    end
    
    subgraph "Categorical Dimensions"
        SEC[Sector<br/>20+ categories<br/>GICS + Functional]
        PROJ[Project Type<br/>8 types<br/>CF/PF/FI/SF]
        CURR[Currency<br/>5 types<br/>F/L/X]
        SIZE[Contract Size<br/>7 bands<br/><1M to >25M]
        SEN[Seniority<br/>7 levels<br/>SS/SU/SUB]
    end
    
    subgraph "Metrics"
        MET[11 Metric Types<br/>CP/DT/SA/ADR/ARR/etc]
    end
    
    GEO --> OBS[Observation]
    TIME --> OBS
    IND --> OBS
    SEC --> OBS
    PROJ --> OBS
    CURR --> OBS
    SIZE --> OBS
    SEN --> OBS
    OBS --> MET
    
    style GEO fill:#ffebee
    style TIME fill:#e3f2fd
    style IND fill:#f3e5f5
    style SEC fill:#e8f5e9
    style PROJ fill:#fff3e0
    style CURR fill:#e0f2f1
    style SIZE fill:#fce4ec
    style SEN fill:#e8eaf6
    style MET fill:#fff9c4
```

---

## 3. Economic Dataset Structure

```mermaid
graph TB
    subgraph "Categories"
        GDP[GDP & Growth<br/>5 indicators]
        CPI[Inflation & Prices<br/>6 indicators]
        FX[Exchange Rates<br/>4 indicators]
        EXP[Exports<br/>6 indicators]
        IMP[Imports<br/>7 indicators]
        TRD[Trade Balance<br/>1 indicator]
        FIN[Financial<br/>3 indicators]
        REAL[Real Sector<br/>3 indicators]
        LAB[Labor Market<br/>1 indicator]
    end
    
    subgraph "Dimensions"
        COUNTRY[Countries<br/>Up to 199 entities]
        YEAR[Years<br/>1996-2025]
    end
    
    GDP --> VALUE[Time Series Values]
    CPI --> VALUE
    FX --> VALUE
    EXP --> VALUE
    IMP --> VALUE
    TRD --> VALUE
    FIN --> VALUE
    REAL --> VALUE
    LAB --> VALUE
    
    VALUE --> COUNTRY
    VALUE --> YEAR
    
    style GDP fill:#e3f2fd
    style CPI fill:#f3e5f5
    style FX fill:#e8f5e9
    style EXP fill:#fff3e0
    style IMP fill:#e0f2f1
    style TRD fill:#fce4ec
    style FIN fill:#fff9c4
    style REAL fill:#f1f8e9
    style LAB fill:#ffebee
```

---

## 4. Geographic Hierarchy

```mermaid
graph TD
    WORLD[World/Overall]
    
    subgraph "Regional Aggregates"
        EAS[East Asia & Pacific]
        ECS[Europe & Central Asia]
        LCN[Latin America & Caribbean]
        MEA[Middle East & North Africa]
        SAS[South Asia]
        SSF[Sub-Saharan Africa]
    end
    
    subgraph "Income Groups"
        LIC[Low Income]
        LMIC[Lower Middle Income]
        UMIC[Upper Middle Income]
        HIC[High Income]
    end
    
    WORLD --> EAS
    WORLD --> ECS
    WORLD --> LCN
    WORLD --> MEA
    WORLD --> SAS
    WORLD --> SSF
    
    EAS --> EAS_LIC[EAS + Income]
    ECS --> ECS_LIC[ECS + Income]
    LCN --> LCN_LIC[LCN + Income]
    MEA --> MEA_LIC[MEA + Income]
    SAS --> SAS_LIC[SAS + Income]
    
    EAS --> C1[Individual Countries<br/>China, Indonesia, Thailand, etc]
    ECS --> C2[Individual Countries<br/>Poland, Turkey, Russia, etc]
    LCN --> C3[Individual Countries<br/>Brazil, Mexico, Argentina, etc]
    MEA --> C4[Individual Countries<br/>Egypt, Morocco, Tunisia, etc]
    SAS --> C5[Individual Countries<br/>India, Pakistan, Bangladesh, etc]
    SSF --> C6[Individual Countries<br/>South Africa, Nigeria, Kenya, etc]
    
    style WORLD fill:#1976d2,color:#fff
    style EAS fill:#2196f3,color:#fff
    style ECS fill:#4caf50,color:#fff
    style LCN fill:#ff9800,color:#fff
    style MEA fill:#f44336,color:#fff
    style SAS fill:#9c27b0,color:#fff
    style SSF fill:#795548,color:#fff
```

---

## 5. Risk Indicator Types

```mermaid
graph TB
    ROOT[Risk Indicators]
    
    subgraph "Borrower Types"
        PUB[Public Sector]
        PRIV[Private Sector]
        SOV[Sovereign]
    end
    
    subgraph "Measure Types"
        DEF[Default Rates]
        REC[Recovery Rates]
    end
    
    subgraph "Versions"
        AVG[Average<br/>Summary statistics]
        HIST[Historical<br/>Year-by-year]
    end
    
    ROOT --> PUB
    ROOT --> PRIV
    ROOT --> SOV
    
    PUB --> PUB_DEF[IFC_GEM_PBD<br/>Public Default]
    PUB --> PUB_REC[IFC_GEM_PBR<br/>Public Recovery]
    
    PRIV --> PRIV_DEF[IFC_GEM_PRD<br/>Private Default]
    PRIV --> PRIV_REC[IFC_GEM_PRR<br/>Private Recovery]
    
    SOV --> SOV_DEF[IFC_GEM_SD<br/>Sovereign Default]
    SOV --> SOV_REC[IFC_GEM_SR<br/>Sovereign Recovery]
    
    PUB_DEF --> PUB_DEF_H[IFC_GEM_PBD_H<br/>Historical]
    PUB_REC --> PUB_REC_H[IFC_GEM_PBR_H<br/>Historical]
    PRIV_DEF --> PRIV_DEF_H[IFC_GEM_PRD_H<br/>Historical]
    PRIV_REC --> PRIV_REC_H[IFC_GEM_PRR_H<br/>Historical]
    SOV_DEF --> SOV_DEF_H[IFC_GEM_SD_H<br/>Historical]
    SOV_REC --> SOV_REC_H[IFC_GEM_SR_H<br/>Historical]
    
    style ROOT fill:#1a237e,color:#fff
    style PUB fill:#283593,color:#fff
    style PRIV fill:#303f9f,color:#fff
    style SOV fill:#3949ab,color:#fff
```

---

## 6. Key Relationships: Economic → Risk

```mermaid
graph LR
    subgraph "Economic Indicators"
        GDP[GDP Growth]
        FX[Exchange Rate]
        UNEMP[Unemployment]
        INDPROD[Industrial Production]
        STOCK[Stock Market]
        RES[Total Reserves]
    end
    
    subgraph "Risk Indicators"
        DEF_PUB[Public Default Rate]
        DEF_PRIV[Private Default Rate]
        DEF_SOV[Sovereign Default Rate]
        REC_ALL[Recovery Rates]
    end
    
    GDP -->|Negative<br/>0-1 year lag| DEF_PUB
    GDP -->|Negative<br/>0-1 year lag| DEF_PRIV
    GDP -->|Negative<br/>0-1 year lag| DEF_SOV
    
    FX -->|Positive<br/>0-1 year lag<br/>Foreign Currency| DEF_PRIV
    FX -->|Positive<br/>0 year lag| DEF_SOV
    
    UNEMP -->|Positive<br/>1-2 year lag| DEF_PRIV
    
    INDPROD -->|Negative<br/>1-2 year lag<br/>Industrial Sector| DEF_PRIV
    
    STOCK -->|Negative<br/>0-1 year lag<br/>Financial Sector| DEF_PRIV
    STOCK -->|Positive<br/>0-2 year lag| REC_ALL
    
    RES -->|Negative<br/>0 year lag| DEF_SOV
    RES -->|Positive<br/>0 year lag| REC_ALL
    
    style GDP fill:#4caf50
    style FX fill:#ff9800
    style UNEMP fill:#f44336
    style INDPROD fill:#2196f3
    style STOCK fill:#9c27b0
    style RES fill:#00bcd4
```

---

## 7. Sector-Specific Relationships

```mermaid
graph TB
    subgraph "GICS Sectors"
        F[Financials<br/>SECTOR: F]
        I[Industrials<br/>SECTOR: I]
        E[Energy<br/>SECTOR: E]
        CD[Consumer Discretionary<br/>SECTOR: CD]
        M[Materials<br/>SECTOR: M]
    end
    
    subgraph "Economic Indicators"
        STOCK[Stock Markets]
        INDPROD[Industrial Production]
        EXPORT[Exports]
        RETAIL[Retail Sales]
    end
    
    F -->|Strong correlation| STOCK
    I -->|Strong correlation| INDPROD
    E -->|Strong correlation| EXPORT
    CD -->|Strong correlation| RETAIL
    M -->|Strong correlation| EXPORT
    M -->|Strong correlation| INDPROD
    
    style F fill:#ff6f00
    style I fill:#1976d2
    style E fill:#388e3c
    style CD fill:#c2185b
    style M fill:#5d4037
    style STOCK fill:#7b1fa2
    style INDPROD fill:#0288d1
    style EXPORT fill:#00796b
    style RETAIL fill:#c2185b
```

---

## 8. Currency Type Analysis

```mermaid
graph LR
    subgraph "Currency Types"
        F[Foreign Currency<br/>CURRENCY_TYPE: F]
        L[Local Currency<br/>CURRENCY_TYPE: L]
        X[Mixed Currency<br/>CURRENCY_TYPE: X]
    end
    
    subgraph "Exchange Rate Indicators"
        EXCH[LCU per USD<br/>Exchange Rate]
        NEER[Nominal Effective<br/>Exchange Rate]
        REER[Real Effective<br/>Exchange Rate]
    end
    
    subgraph "Other Economic Factors"
        CPI[CPI Inflation]
        EXP[Export Earnings]
        DEFL[GDP Deflator]
    end
    
    F -->|Depreciation<br/>increases default| EXCH
    F -->|Depreciation<br/>increases default| NEER
    F -->|Exports provide<br/>FX earnings| EXP
    
    L -->|High inflation<br/>increases default| CPI
    L -->|Deflator affects<br/>real debt burden| DEFL
    
    X -->|Exposed to both<br/>FX and inflation| REER
    X -->|Combined risks| EXCH
    X -->|Combined risks| CPI
    
    style F fill:#f44336,color:#fff
    style L fill:#4caf50,color:#fff
    style X fill:#ff9800,color:#fff
```

---

## 9. Project Type Classification

```mermaid
graph TB
    ROOT[Project Types]
    
    CF[Corporate Finance<br/>PROJECT_TYPE: CF]
    PF[Project Finance<br/>PROJECT_TYPE: PF]
    FI[Financial Institutions<br/>PROJECT_TYPE: FI]
    SF[Structured Finance<br/>PROJECT_TYPE: SF]
    
    ROOT --> CF
    ROOT --> PF
    ROOT --> FI
    ROOT --> SF
    
    subgraph "Characteristics"
        CF_CHAR[Typical Sectors:<br/>All sectors<br/>Key Indicators:<br/>Stock Markets, GDP, Sector-specific]
        PF_CHAR[Typical Sectors:<br/>Infrastructure, Energy<br/>Key Indicators:<br/>GDP, Industrial Production, FX]
        FI_CHAR[Typical Sectors:<br/>Banking, NBFI<br/>Key Indicators:<br/>Stock Markets, Reserves, FX]
        SF_CHAR[Typical Sectors:<br/>Multiple<br/>Key Indicators:<br/>Stock Markets, GDP, Volatility]
    end
    
    CF --> CF_CHAR
    PF --> PF_CHAR
    FI --> FI_CHAR
    SF --> SF_CHAR
    
    style CF fill:#2196f3
    style PF fill:#4caf50
    style FI fill:#ff9800
    style SF fill:#9c27b0
```

---

## 10. Contract Size Distribution

```mermaid
graph TB
    ROOT[Contract Sizes]
    
    S1[< 1M EUR<br/>LT1M]
    S2[1-2M EUR<br/>1T2M]
    S3[2-5M EUR<br/>2T5M]
    S4[5-10M EUR<br/>5T10M]
    S5[10-25M EUR<br/>10T25M]
    S6[> 25M EUR<br/>GT25M]
    
    ROOT --> S1
    ROOT --> S2
    ROOT --> S3
    ROOT --> S4
    ROOT --> S5
    ROOT --> S6
    
    subgraph "Economic Sensitivity"
        S1 -->|High sensitivity| MICRO[Unemployment<br/>Retail Sales<br/>Local conditions]
        S2 -->|High sensitivity| MICRO
        S3 -->|Medium sensitivity| MESO[GDP<br/>Sector indicators<br/>Regional conditions]
        S4 -->|Medium sensitivity| MESO
        S5 -->|Lower sensitivity| MACRO[GDP<br/>Reserves<br/>Trade balance]
        S6 -->|Lower sensitivity| MACRO
    end
    
    style S1 fill:#e3f2fd
    style S2 fill:#bbdefb
    style S3 fill:#90caf9
    style S4 fill:#64b5f6
    style S5 fill:#42a5f5
    style S6 fill:#2196f3,color:#fff
```

---

## 11. Knowledge Graph Schema

```mermaid
graph TB
    subgraph "Core Entities"
        COUNTRY[Country Node<br/>code, name, region, income_level]
        REGION[Region Node<br/>code, name]
        YEAR[Year Node<br/>year: 1996-2024]
    end
    
    subgraph "Indicator Entities"
        ECON[Economic Indicator Node<br/>code, name, category, unit]
        RISK[Risk Indicator Node<br/>code, name, type, borrower_type]
    end
    
    subgraph "Classification Entities"
        SECTOR[Sector Node<br/>code, name, classification]
        PROJ[Project Type Node<br/>code, name]
    end
    
    subgraph "Relationships"
        REL1[BELONGS_TO_REGION]
        REL2[HAS_ECONOMIC_VALUE<br/>Properties: year, value, unit]
        REL3[HAS_RISK_MEASURE<br/>Properties: year, value, metric,<br/>sector, currency, size, seniority]
        REL4[CORRELATES_WITH<br/>Properties: correlation, lag, p_value]
        REL5[IMPACTS<br/>Properties: direction, magnitude, lag]
    end
    
    COUNTRY -->|REL1| REGION
    COUNTRY -->|REL2| ECON
    COUNTRY -->|REL3| RISK
    ECON -->|REL4| RISK
    ECON -->|REL5| RISK
    RISK -->|MEASURED_IN| SECTOR
    RISK -->|HAS_TYPE| PROJ
    
    style COUNTRY fill:#4caf50
    style REGION fill:#8bc34a
    style YEAR fill:#2196f3
    style ECON fill:#ff9800
    style RISK fill:#f44336
    style SECTOR fill:#9c27b0
    style PROJ fill:#00bcd4
```

---

## 12. Time Lag Structure

```mermaid
gantt
    title Leading and Lagging Indicators
    dateFormat X
    axisFormat %s
    
    section Economic Shock
    GDP Decline          :milestone, m1, 0, 0
    Exchange Rate Shock  :milestone, m2, 0, 0
    Unemployment Rise    :milestone, m3, 0, 0
    
    section Immediate Impact (0 year)
    Sovereign Defaults   :active, s1, 0, 1
    FX-denominated Defaults :active, s2, 0, 1
    Stock Market Crash   :active, s3, 0, 1
    
    section Short-term (1 year lag)
    Public Defaults      :active, l1, 1, 2
    Financial Sector Defaults :active, l2, 1, 2
    Overall Private Defaults :active, l3, 1, 2
    
    section Medium-term (2 year lag)
    Industrial Sector Defaults :active, m1, 2, 3
    Consumer Sector Defaults :active, m2, 2, 3
    Recovery Rates Bottom :active, m3, 2, 3
    
    section Long-term (3+ years)
    Recovery Rate Improvement :done, r1, 3, 5
    Risk Normalization   :done, r2, 4, 6
```

---

## 13. Regional Risk Profiles

```mermaid
graph TB
    subgraph "East Asia & Pacific"
        EAS_KEY[Key Drivers:<br/>Manufacturing, Exports]
        EAS_RISK[Risk Factors:<br/>Export dependence<br/>FX volatility]
        EAS_IND[Key Indicators:<br/>Industrial Production<br/>Exports, REER]
    end
    
    subgraph "Europe & Central Asia"
        ECS_KEY[Key Drivers:<br/>Diversified, EU links]
        ECS_RISK[Risk Factors:<br/>Political risk<br/>EU contagion]
        ECS_IND[Key Indicators:<br/>GDP, Stock Markets<br/>Exchange Rate]
    end
    
    subgraph "Latin America & Caribbean"
        LCN_KEY[Key Drivers:<br/>Commodities, Consumption]
        LCN_RISK[Risk Factors:<br/>Commodity shocks<br/>FX crises]
        LCN_IND[Key Indicators:<br/>Exports, Terms of Trade<br/>CPI, Exchange Rate]
    end
    
    subgraph "Sub-Saharan Africa"
        SSF_KEY[Key Drivers:<br/>Commodities, Agriculture]
        SSF_RISK[Risk Factors:<br/>Commodity dependence<br/>Reserve adequacy]
        SSF_IND[Key Indicators:<br/>GDP, Exports<br/>FX, Reserves]
    end
    
    style EAS_KEY fill:#2196f3
    style EAS_RISK fill:#f44336
    style EAS_IND fill:#4caf50
    style ECS_KEY fill:#2196f3
    style ECS_RISK fill:#f44336
    style ECS_IND fill:#4caf50
    style LCN_KEY fill:#2196f3
    style LCN_RISK fill:#f44336
    style LCN_IND fill:#4caf50
    style SSF_KEY fill:#2196f3
    style SSF_RISK fill:#f44336
    style SSF_IND fill:#4caf50
```

---

## 14. Analysis Flow

```mermaid
flowchart TD
    START[Start Analysis]
    
    Q1{Select Country<br/>or Region}
    Q2{Select Time Period<br/>1996-2024}
    Q3{Select Analysis Type}
    
    A1[Default Rate Analysis]
    A2[Recovery Rate Analysis]
    A3[Sector Analysis]
    A4[Currency Risk Analysis]
    A5[Time Series Analysis]
    
    R1[Identify Economic Indicators]
    R2[Calculate Correlations]
    R3[Test Lag Structures]
    R4[Build Predictive Model]
    
    OUTPUT[Insights & Visualizations]
    
    START --> Q1
    Q1 --> Q2
    Q2 --> Q3
    
    Q3 --> A1
    Q3 --> A2
    Q3 --> A3
    Q3 --> A4
    Q3 --> A5
    
    A1 --> R1
    A2 --> R1
    A3 --> R1
    A4 --> R1
    A5 --> R1
    
    R1 --> R2
    R2 --> R3
    R3 --> R4
    R4 --> OUTPUT
    
    style START fill:#4caf50,color:#fff
    style OUTPUT fill:#2196f3,color:#fff
    style Q1 fill:#ff9800
    style Q2 fill:#ff9800
    style Q3 fill:#ff9800
```

---

## 15. Implementation Phases

```mermaid
gantt
    title GEMR-KG Implementation Timeline
    dateFormat YYYY-MM-DD
    
    section Phase 1: Analysis
    Dataset Analysis         :done, p1_1, 2024-10-01, 2024-10-17
    Documentation           :done, p1_2, 2024-10-10, 2024-10-17
    
    section Phase 2: Preparation
    Country Mapping         :active, p2_1, 2024-10-18, 7d
    Data Standardization    :active, p2_2, 2024-10-20, 10d
    Missing Data Handling   :p2_3, 2024-10-25, 5d
    
    section Phase 3: Graph Construction
    Setup Database          :p3_1, 2024-11-01, 3d
    Load Core Entities      :p3_2, 2024-11-04, 5d
    Load Economic Data      :p3_3, 2024-11-09, 7d
    Load Risk Data          :p3_4, 2024-11-16, 7d
    Create Relationships    :p3_5, 2024-11-23, 5d
    
    section Phase 4: Analytics
    Calculate Correlations  :p4_1, 2024-11-28, 7d
    Lag Analysis           :p4_2, 2024-12-05, 7d
    Validation             :p4_3, 2024-12-12, 5d
    
    section Phase 5: Research
    Implement Queries      :p5_1, 2024-12-17, 14d
    Build Dashboards       :p5_2, 2025-01-01, 14d
    Research Paper         :p5_3, 2025-01-15, 30d
```

---

## Notes on Diagrams

These diagrams are rendered using Mermaid syntax, which is supported by:
- GitHub (native support in markdown files)
- GitLab (native support)
- Many markdown editors (VS Code with Mermaid extension, Typora, etc.)
- Mermaid Live Editor: https://mermaid.live/

If viewing in a tool that doesn't support Mermaid, you can:
1. Copy the code blocks to https://mermaid.live/ for rendering
2. Use a Mermaid-compatible markdown viewer
3. Export to PNG/SVG from the Mermaid Live Editor

---

## Diagram Legend

### Node Colors by Type
- **Blue shades**: Geographic/temporal dimensions
- **Green shades**: Economic indicators
- **Red/Orange shades**: Risk indicators
- **Purple shades**: Financial/market indicators
- **Brown/Gray shades**: Administrative/classification

### Relationship Arrows
- **Solid arrows**: Direct relationships
- **Dashed arrows**: Derived/computed relationships
- **Arrow labels**: Describe the nature of the relationship (correlation direction, lag)

### Layout Patterns
- **Top-to-bottom**: Hierarchical relationships
- **Left-to-right**: Causal or temporal flows
- **Clustered subgraphs**: Logical groupings

---

*End of Visual Relationships Document*

