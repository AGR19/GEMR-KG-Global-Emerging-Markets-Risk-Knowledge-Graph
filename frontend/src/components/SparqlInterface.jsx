import React, { useState, useMemo } from 'react';

const SparqlInterface = () => {
  const [query, setQuery] = useState(`PREFIX gemr: <https://gemr-kg.org/ontology#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?country ?year ?gdp
WHERE {
  ?obs a gemr:GDP_CONST_2010_USD ;
       gemr:hasCountry ?c ;
       gemr:hasYear ?y ;
       gemr:observationValue ?gdp .
  
  ?c gemr:countryName "Brazil" .
  ?y gemr:yearValue ?year .
}
LIMIT 10`);
  
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedExampleCategory, setSelectedExampleCategory] = useState("Temporal Analysis");

  const examples = {
    "Comprehensive Risk": [
      {
        name: "Risk Profile Dashboard (2023)",
        description: "Total risk score & components for Poland (2023)",
        query: `PREFIX gemr: <https://gemr-kg.org/ontology#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?countryName ?year ?totalScore ?riskTier ?govScore ?econScore ?vulnScore ?contagionScore
WHERE {
    # Bind the specific year and country of interest
    BIND("2023"^^xsd:gYear AS ?targetYear)
    BIND("Poland" AS ?targetCountry)

    # Find the RiskScore individual
    ?scoreObs a gemr:RiskScore ;
              gemr:hasCountry ?country ;
              gemr:hasYear ?yearEntity ;
              gemr:totalRiskScore ?totalScore .

    # Traverse to Country and Year attributes
    ?country gemr:countryName ?countryName .
    ?yearEntity gemr:yearValue ?year .

    # Filter for the specific targets
    FILTER (?year = ?targetYear)
    FILTER (STR(?countryName) = ?targetCountry)

    # Retrieve attributes and component scores optionally
    OPTIONAL { ?scoreObs gemr:riskTier ?riskTier }
    OPTIONAL { ?scoreObs gemr:governanceScore ?govScore }
    OPTIONAL { ?scoreObs gemr:economicHealthScore ?econScore }
    OPTIONAL { ?scoreObs gemr:externalVulnerabilityScore ?vulnScore }
    OPTIONAL { ?scoreObs gemr:contagionRiskScore ?contagionScore }
}`
      }
    ],
    "Temporal Analysis": [
      {
        name: "1. Early Warning (Stock -> Default)",
        description: "Stock Market (t) vs Default Risk (t+1)",
        query: `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX gemr: <https://gemr-kg.org/ontology#>

SELECT ?countryName ?yearInt ?stockValue ?targetYearInt (AVG(xsd:float(?defaultRate)) AS ?avgDefaultRate)
WHERE {
    # 1. Source: Stock Market (Year T)
    ?obsStock a gemr:Stock_Market_Index_LCU ;
              gemr:hasCountry ?c ;
              gemr:hasYear ?yearEntity ;
              gemr:observationValue ?stockValue .

    # 2. Extract Integer Year
    ?yearEntity gemr:yearValue ?yearLiteral .
    BIND(xsd:integer(STR(?yearLiteral)) AS ?yearInt)

    # 3. Calculate Target (T+1)
    BIND(?yearInt + 1 AS ?targetYearInt)

    # 4. Target: Private Default Rate (Year T+1)
    ?targetYearEntity gemr:yearValue ?targetYearLiteral .
    FILTER(xsd:integer(STR(?targetYearLiteral)) = ?targetYearInt)

    ?obsDefault a gemr:PrivateDefaultRate ;
                gemr:hasCountry ?c ;
                gemr:hasYear ?targetYearEntity ;
                gemr:observationValue ?defaultRate .

    ?c gemr:countryName ?countryName .
}
GROUP BY ?countryName ?yearInt ?stockValue ?targetYearInt
ORDER BY ?countryName ?yearInt
LIMIT 100`
      },
      {
        name: "2. Political Stability -> GDP",
        description: "Impact of Political Stability (t) on GDP (t+1)",
        query: `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX gemr: <https://gemr-kg.org/ontology#>

SELECT ?countryName ?yearInt (AVG(xsd:float(?polStability)) AS ?avgPolStability) ?targetYearInt ?gdpValue
WHERE {
    # 1. Trigger: Political Stability
    ?obsPol a gemr:PoliticalStability ;
            gemr:hasCountry ?c ;
            gemr:hasYear ?yearEntity ;       
            gemr:observationValue ?polStability .

    # Filter for Risk (Negative)
    FILTER(?polStability < 0)

    # 2. Extract Year
    ?yearEntity gemr:yearValue ?yearLiteral .
    BIND(xsd:integer(STR(?yearLiteral)) AS ?yearInt)

    # 3. Target Year (T+1)
    BIND(?yearInt + 1 AS ?targetYearInt)

    # 4. Effect: GDP (Flexible Match)
    ?obsEco a gemr:GDP_CONST_2010_USD ;
            gemr:hasCountry ?c ;
            gemr:hasYear ?gdpYearRaw ;
            gemr:observationValue ?gdpValue .
            
    OPTIONAL { ?gdpYearRaw gemr:yearValue ?gdpYearVal }
    BIND(COALESCE(xsd:integer(STR(?gdpYearVal)), ?gdpYearRaw) AS ?gdpYearInt)
    
    FILTER(?gdpYearInt = ?targetYearInt)

    ?c gemr:countryName ?countryName .
}
GROUP BY ?countryName ?yearInt ?targetYearInt ?gdpValue
ORDER BY ?countryName ?yearInt
LIMIT 50`
      },
      {
        name: "3. Default -> Recovery",
        description: "Stock Market (t) vs Real Economy GDP (t+1)",
        query: `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX gemr: <https://gemr-kg.org/ontology#>

SELECT ?countryName ?yearT (AVG(xsd:float(?stockValue)) AS ?avgStockValue) ?yearTarget ?gdpValue
WHERE {
    # 1. Source: Stock Market (Year T)
    ?obsStock a gemr:Stock_Market_Index_LCU ; 
              gemr:hasCountry ?c ;
              gemr:hasYear ?yearT_Raw ; 
              gemr:observationValue ?stockValue .

    # 2. Target: GDP (Year T+1)
    ?obsGDP a gemr:GDP_CONST_2010_USD ; 
            gemr:hasCountry ?c ; 
            gemr:hasYear ?yearTarget_Raw ; 
            gemr:observationValue ?gdpValue .

    # 3. Flexible Time Handling
    OPTIONAL { ?yearT_Raw gemr:yearValue ?yValT } 
    OPTIONAL { ?yearTarget_Raw gemr:yearValue ?yValTarget } 
    
    BIND(COALESCE(xsd:integer(STR(?yValT)), ?yearT_Raw) AS ?yearT) 
    BIND(COALESCE(xsd:integer(STR(?yValTarget)), ?yearTarget_Raw) AS ?yearTarget) 

    # 4. Filter for Exact 1-Year Lag
    FILTER(?yearTarget = ?yearT + 1) 

    ?c gemr:countryName ?countryName . 
}
GROUP BY ?countryName ?yearT ?yearTarget ?gdpValue
ORDER BY ?countryName ?yearT`
      },
      {
        name: "4. GDP Growth Tracker",
        description: "Calculated annual GDP growth (t vs t-1)",
        query: `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX gemr: <https://gemr-kg.org/ontology#>

SELECT ?countryName ?year ?gdpVal_Current ?growthRatePercent
WHERE {
    # 1. Fetch GDP for Current Year (t)
    ?obsGDP_T a gemr:GDP_CONST_2010_USD ;
              gemr:hasCountry ?c ;
              gemr:hasYear ?yT_Raw ;
              gemr:observationValue ?gdpVal_Current .

    # 2. Fetch GDP for Previous Year (t-1)
    ?obsGDP_Prev a gemr:GDP_CONST_2010_USD ;
                 gemr:hasCountry ?c ;
                 gemr:hasYear ?yPrev_Raw ;
                 gemr:observationValue ?gdpVal_Prev .

    # 3. Handle Year Arithmetic (t vs t-1)
    OPTIONAL { ?yT_Raw gemr:yearValue ?yValT }
    OPTIONAL { ?yPrev_Raw gemr:yearValue ?yValPrev }
    
    BIND(COALESCE(xsd:integer(STR(?yValT)), ?yT_Raw) AS ?year)
    BIND(COALESCE(xsd:integer(STR(?yValPrev)), ?yPrev_Raw) AS ?yearPrev)

    # 4. Filter for consecutive years
    FILTER(?yearPrev = ?year - 1)

    # 5. Calculate Growth Rate Formula
    BIND(((?gdpVal_Current - ?gdpVal_Prev) / ?gdpVal_Prev) * 100 AS ?growthRatePercent)

    ?c gemr:countryName ?countryName .
}
ORDER BY ?countryName ?year
LIMIT 100`
      }
    ],
    "Contagion Analysis": [
      {
        name: "Trade-Based Contagion",
        description: "GDP (Source t) -> Exports (Partner t) -> GDP (Partner t+1)",
        query: `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX gemr: <https://gemr-kg.org/ontology#>

SELECT ?sourceCountry ?partnerCountry ?yearT 
       (AVG(?sourceGDP_Growth_Pct) AS ?avgSourceGrowth)
       (AVG(?partnerExport_Growth_Pct) AS ?avgPartnerExportGrowth)
       (AVG(?partnerGDP_Growth_NextYear_Pct) AS ?avgPartnerNextGDP)
WHERE {
    # 1. TRADE LINKAGE
    { ?partner gemr:similarTo ?source . } 
    UNION 
    { ?partner gemr:belongsToCluster ?cluster . ?source gemr:belongsToCluster ?cluster . FILTER(?source != ?partner) } 
    UNION 
    { 
        ?source gemr:countryName ?sName . ?partner gemr:countryName ?pName . 
        FILTER ((STR(?sName) = "Brazil" && STR(?pName) = "Mexico")) 
    }

    # 2. DATA
    # Source GDP
    ?obsSourceGDP_T a gemr:GDP_CONST_2010_USD ; gemr:hasCountry ?source ; gemr:hasYear ?yT_Raw ; gemr:observationValue ?s_gdp_T .
    ?obsSourceGDP_Prev a gemr:GDP_CONST_2010_USD ; gemr:hasCountry ?source ; gemr:hasYear ?yPrev_Raw ; gemr:observationValue ?s_gdp_Prev .

    # Partner Exports
    ?obsPartnerExp_T a gemr:EXPORTS_CURR_SEAS ; gemr:hasCountry ?partner ; gemr:hasYear ?yT_Raw ; gemr:observationValue ?p_exp_T .
    ?obsPartnerExp_Prev a gemr:EXPORTS_CURR_SEAS ; gemr:hasCountry ?partner ; gemr:hasYear ?yPrev_Raw ; gemr:observationValue ?p_exp_Prev .

    # Partner GDP
    ?obsPartnerGDP_Next a gemr:GDP_CONST_2010_USD ; gemr:hasCountry ?partner ; gemr:hasYear ?yNext_Raw ; gemr:observationValue ?p_gdp_Next .
    ?obsPartnerGDP_T_ForCalc a gemr:GDP_CONST_2010_USD ; gemr:hasCountry ?partner ; gemr:hasYear ?yT_Raw ; gemr:observationValue ?p_gdp_T .

    # 3. ROBUST TIME EXTRACTION
    OPTIONAL { ?yT_Raw gemr:yearValue ?yT_Val }
    OPTIONAL { ?yPrev_Raw gemr:yearValue ?yPrev_Val }
    OPTIONAL { ?yNext_Raw gemr:yearValue ?yNext_Val }

    BIND(COALESCE(xsd:integer(STR(?yT_Val)), ?yT_Raw) AS ?yearT)
    BIND(COALESCE(xsd:integer(STR(?yPrev_Val)), ?yPrev_Raw) AS ?yearPrev)
    BIND(COALESCE(xsd:integer(STR(?yNext_Val)), ?yNext_Raw) AS ?yearNext)

    FILTER(?yearPrev = ?yearT - 1)
    FILTER(?yearNext = ?yearT + 1)

    # 4. CALCULATIONS
    BIND(((?s_gdp_T - ?s_gdp_Prev) / ?s_gdp_Prev) * 100 AS ?sourceGDP_Growth_Pct)
    BIND(((?p_exp_T - ?p_exp_Prev) / ?p_exp_Prev) * 100 AS ?partnerExport_Growth_Pct)
    BIND(((?p_gdp_Next - ?p_gdp_T) / ?p_gdp_T) * 100 AS ?partnerGDP_Growth_NextYear_Pct)

    ?source gemr:countryName ?sourceCountry .
    ?partner gemr:countryName ?partnerCountry .
}
GROUP BY ?sourceCountry ?partnerCountry ?yearT
ORDER BY ?sourceCountry ?yearT
LIMIT 50`
      },
      {
        name: "Currency Crisis Early Warning",
        description: "Regional currency contagion spillover analysis",
        query: `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX gemr: <https://gemr-kg.org/ontology#>

SELECT ?sourceCountry ?targetCountry ?year 
       ?avgSourceDepr ?avgTargetDepr
       (IF(?avgTargetDepr > 10, "HIGH (Spillover Confirmed)", 
        IF(?avgTargetDepr > 5, "MODERATE (Stress)", "LOW (Resilient)")) 
        AS ?contagionRiskLevel)
WHERE {
    {
        SELECT ?sourceCountry ?targetCountry ?year 
               (AVG(?sourceDepreciation_Pct) AS ?avgSourceDepr) 
               (AVG(?targetDepreciation_Pct) AS ?avgTargetDepr) 
        WHERE { 
            # 1. FIND SOURCE CRISES (Year T)
            ?obsSource_T a gemr:Exchange_rate_new_LCU_per_USD ; gemr:hasCountry ?source ; gemr:hasYear ?yearEntity ; gemr:observationValue ?sVal_T .

            # Year Extraction
            ?yearEntity gemr:yearValue ?y_Lit .
            BIND(xsd:integer(STR(?y_Lit)) AS ?year)
            BIND(?year - 1 AS ?yearPrev) 

            # Previous Year
            ?obsSource_Prev a gemr:Exchange_rate_new_LCU_per_USD ; gemr:hasCountry ?source ; gemr:hasYear ?prevYearEntity ; gemr:observationValue ?sVal_Prev .
            ?prevYearEntity gemr:yearValue ?prevY_Lit .
            FILTER(xsd:integer(STR(?prevY_Lit)) = ?yearPrev)

            # Trigger Calculation
            BIND(((?sVal_T - ?sVal_Prev) / ?sVal_Prev) * 100 AS ?sourceDepreciation_Pct) 
            FILTER(?sourceDepreciation_Pct > 15) 

            # 2. MAP TO TARGET
            VALUES (?sName ?tName) { 
                 ("Brazil" "Mexico") 
                 ("Thailand" "Philippines") 
            } 
            ?source gemr:countryName ?sName . 
            ?target gemr:countryName ?tName . 

            # 3. TARGET IMPACT
            ?obsTarget_T a gemr:Exchange_rate_new_LCU_per_USD ; gemr:hasCountry ?target ; gemr:hasYear ?yearEntity ; gemr:observationValue ?tVal_T .
            ?obsTarget_Prev a gemr:Exchange_rate_new_LCU_per_USD ; gemr:hasCountry ?target ; gemr:hasYear ?prevYearEntity ; gemr:observationValue ?tVal_Prev .
            BIND(((?tVal_T - ?tVal_Prev) / ?tVal_Prev) * 100 AS ?targetDepreciation_Pct) 

            ?source gemr:countryName ?sourceCountry . 
            ?target gemr:countryName ?targetCountry . 
        } 
        GROUP BY ?sourceCountry ?targetCountry ?year
    }
}
ORDER BY DESC(?avgSourceDepr)
LIMIT 100`
      }
    ]
  };

  const handleExecute = () => {
    setLoading(true);
    setError(null);
    setResults(null);

    fetch(`/repositories/GEMR?query=${encodeURIComponent(query)}`, {
      headers: {
        'Accept': 'application/sparql-results+json'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', gap: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Left Column: Query & Examples */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '40%', gap: '20px' }}>
        
        {/* Query Editor */}
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, border: '1px solid #ccc', borderRadius: '8px', padding: '10px', background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ margin: 0 }}>SPARQL Query</h3>
            <button 
              onClick={handleExecute} 
              disabled={loading}
              style={{
                background: '#007bff', 
                color: 'white', 
                border: 'none', 
                padding: '8px 16px', 
                borderRadius: '4px', 
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Running...' : 'Run Query'}
            </button>
          </div>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ 
              flexGrow: 1, 
              width: '100%', 
              resize: 'none', 
              fontFamily: 'monospace', 
              padding: '10px', 
              boxSizing: 'border-box',
              border: '1px solid #eee',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Examples Section */}
        <div style={{ height: '40%', border: '1px solid #ccc', borderRadius: '8px', padding: '10px', background: '#fff', overflowY: 'auto' }}>
          <h3 style={{ marginTop: 0, marginBottom: '10px' }}>Use Cases</h3>
          
          {/* Category Selector */}
          <select 
            value={selectedExampleCategory} 
            onChange={(e) => setSelectedExampleCategory(e.target.value)}
            style={{ width: '100%', marginBottom: '15px', padding: '5px' }}
          >
            {Object.keys(examples).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Subsections List */}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {examples[selectedExampleCategory].map((ex, idx) => (
              <li 
                key={idx} 
                onClick={() => setQuery(ex.query)}
                style={{ 
                  padding: '10px', 
                  cursor: 'pointer', 
                  borderBottom: '1px solid #eee',
                  background: '#f9f9f9',
                  marginBottom: '5px',
                  borderRadius: '4px',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#e9ecef'}
                onMouseOut={(e) => e.currentTarget.style.background = '#f9f9f9'}
              >
                <div style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{ex.name}</div>
                <div style={{ fontSize: '0.8em', color: '#666', marginTop: '3px' }}>{ex.description}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column: Results */}
      <div style={{ flexGrow: 1, border: '1px solid #ccc', borderRadius: '8px', padding: '10px', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <h3 style={{ marginTop: 0 }}>Results</h3>
        <div style={{ flexGrow: 1, overflow: 'auto', background: '#f8f9fa', padding: '10px', borderRadius: '4px', border: '1px solid #eee' }}>
          
          {error && <div style={{ color: 'red' }}>Error: {error}</div>}
          
          {!results && !loading && !error && <div style={{ color: '#666', fontStyle: 'italic' }}>Run a query to see results here.</div>}
          
          {results && (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr>
                  {results.head.vars.map(v => (
                    <th key={v} style={{ borderBottom: '2px solid #ddd', padding: '8px', textAlign: 'left', background: '#eee', position: 'sticky', top: 0 }}>?{v}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.results.bindings.map((binding, idx) => (
                  <tr key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                    {results.head.vars.map(v => (
                      <td key={v} style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                        {binding[v] ? binding[v].value : ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  );
};

export default SparqlInterface;
