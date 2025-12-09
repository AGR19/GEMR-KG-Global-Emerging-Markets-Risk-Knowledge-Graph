import React from 'react';

const About = () => {
  const queries = [
    {
      title: "Comprehensive Risk Profile (Dashboard View)",
      description: "Retrieves the total risk score, risk classification, and all underlying component scores (Governance, Economic, etc.) for a specific country in a specific year.",
      reason: "To provide a holistic snapshot of a country's risk status, enabling quick assessment of its overall stability and specific areas of concern (e.g., high governance risk vs. low economic risk).",
      query: `PREFIX gemr: <https://gemr-kg.org/ontology#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?countryName ?year ?totalScore ?riskTier ?govScore ?econScore ?vulnScore ?contagionScore
WHERE {
    BIND("2023"^^xsd:gYear AS ?targetYear)
    BIND("Poland" AS ?targetCountry)

    ?scoreObs a gemr:RiskScore ;
              gemr:hasCountry ?country ;
              gemr:hasYear ?yearEntity ;
              gemr:totalRiskScore ?totalScore .

    ?country gemr:countryName ?countryName .
    ?yearEntity gemr:yearValue ?year .

    FILTER (?year = ?targetYear)
    FILTER (STR(?countryName) = ?targetCountry)

    OPTIONAL { ?scoreObs gemr:riskTier ?riskTier }
    OPTIONAL { ?scoreObs gemr:governanceScore ?govScore }
    OPTIONAL { ?scoreObs gemr:economicHealthScore ?econScore }
    OPTIONAL { ?scoreObs gemr:externalVulnerabilityScore ?vulnScore }
    OPTIONAL { ?scoreObs gemr:contagionRiskScore ?contagionScore }
}`
    },
    {
      title: "Early Warning: Stock Market vs Default Risk",
      description: "Analyzes the relationship between Stock Market performance in Year T and Private Default Rates in Year T+1.",
      reason: "To test the hypothesis that stock market declines act as a leading indicator for subsequent credit defaults. This helps in building early warning systems for credit risk.",
      query: `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX gemr: <https://gemr-kg.org/ontology#>

SELECT ?countryName ?yearInt ?stockValue ?targetYearInt (AVG(xsd:float(?defaultRate)) AS ?avgDefaultRate)
WHERE {
    ?obsStock a gemr:Stock_Market_Index_LCU ;
              gemr:hasCountry ?c ;
              gemr:hasYear ?yearEntity ;
              gemr:observationValue ?stockValue .

    ?yearEntity gemr:yearValue ?yearLiteral .
    BIND(xsd:integer(STR(?yearLiteral)) AS ?yearInt)
    BIND(?yearInt + 1 AS ?targetYearInt)

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
      title: "Political Stability Impact Tracker",
      description: "Tracks how negative Political Stability scores in Year T impact GDP in Year T+1.",
      reason: "To quantify the economic cost of political instability. This query validates the 'Governance-Growth' transmission channel, showing how political shocks translate into real economic downturns.",
      query: `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX gemr: <https://gemr-kg.org/ontology#>

SELECT ?countryName ?yearInt (AVG(xsd:float(?polStability)) AS ?avgPolStability) ?targetYearInt ?gdpValue
WHERE {
    ?obsPol a gemr:PoliticalStability ;
            gemr:hasCountry ?c ;
            gemr:hasYear ?yearEntity ;       
            gemr:observationValue ?polStability .

    FILTER(?polStability < 0)

    ?yearEntity gemr:yearValue ?yearLiteral .
    BIND(xsd:integer(STR(?yearLiteral)) AS ?yearInt)
    BIND(?yearInt + 1 AS ?targetYearInt)

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
      title: "Default -> Recovery: Stock Market vs Real Economy",
      description: "Analyzes the lag between stock market performance and real economic recovery (GDP) following a default event.",
      reason: "To understand the recovery trajectory of emerging markets. Stock markets often recover faster than the real economy, and quantifying this lag is crucial for investment timing.",
      query: `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX gemr: <https://gemr-kg.org/ontology#>

SELECT ?countryName ?yearT (AVG(xsd:float(?stockValue)) AS ?avgStockValue) ?yearTarget ?gdpValue
WHERE {
    ?obsStock a gemr:Stock_Market_Index_LCU ; 
              gemr:hasCountry ?c ;
              gemr:hasYear ?yearT_Raw ; 
              gemr:observationValue ?stockValue .

    ?obsGDP a gemr:GDP_CONST_2010_USD ; 
            gemr:hasCountry ?c ; 
            gemr:hasYear ?yearTarget_Raw ; 
            gemr:observationValue ?gdpValue .

    OPTIONAL { ?yearT_Raw gemr:yearValue ?yValT } 
    OPTIONAL { ?yearTarget_Raw gemr:yearValue ?yValTarget } 
    
    BIND(COALESCE(xsd:integer(STR(?yValT)), ?yearT_Raw) AS ?yearT) 
    BIND(COALESCE(xsd:integer(STR(?yValTarget)), ?yearTarget_Raw) AS ?yearTarget) 

    FILTER(?yearTarget = ?yearT + 1) 

    ?c gemr:countryName ?countryName . 
}
GROUP BY ?countryName ?yearT ?yearTarget ?gdpValue
ORDER BY ?countryName ?yearT`
    },
    {
      title: "GDP Growth Tracker",
      description: "Calculates the annual GDP growth percentage by comparing the current year's GDP with the previous year's GDP.",
      reason: "To provide a fundamental measure of economic health. While raw GDP numbers are useful, growth rates are the standard metric for comparing economic performance across different sized economies.",
      query: `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX gemr: <https://gemr-kg.org/ontology#>

SELECT ?countryName ?year ?gdpVal_Current ?growthRatePercent
WHERE {
    ?obsGDP_T a gemr:GDP_CONST_2010_USD ;
              gemr:hasCountry ?c ;
              gemr:hasYear ?yT_Raw ;
              gemr:observationValue ?gdpVal_Current .

    ?obsGDP_Prev a gemr:GDP_CONST_2010_USD ;
                 gemr:hasCountry ?c ;
                 gemr:hasYear ?yPrev_Raw ;
                 gemr:observationValue ?gdpVal_Prev .

    OPTIONAL { ?yT_Raw gemr:yearValue ?yValT }
    OPTIONAL { ?yPrev_Raw gemr:yearValue ?yValPrev }
    
    BIND(COALESCE(xsd:integer(STR(?yValT)), ?yT_Raw) AS ?year)
    BIND(COALESCE(xsd:integer(STR(?yValPrev)), ?yPrev_Raw) AS ?yearPrev)

    FILTER(?yearPrev = ?year - 1)

    BIND(((?gdpVal_Current - ?gdpVal_Prev) / ?gdpVal_Prev) * 100 AS ?growthRatePercent)

    ?c gemr:countryName ?countryName .
}
ORDER BY ?countryName ?year
LIMIT 100`
    },
    {
      title: "Trade-Based Contagion Analysis",
      description: "Traces the propagation of economic shocks from a Source Country to a Dependent Partner via trade links (GDP Source -> Exports Partner -> GDP Partner).",
      reason: "To identify contagion risks where a crisis in a major trading partner (like China) spills over into dependent emerging markets (like Thailand) through reduced export demand.",
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

    # ... (Data fetching logic omitted for brevity) ...
}
GROUP BY ?sourceCountry ?partnerCountry ?yearT
ORDER BY ?sourceCountry ?yearT
LIMIT 50`
    },
    {
      title: "Currency Crisis Early Warning",
      description: "Detects regional currency contagion by analyzing simultaneous depreciation events across countries in the same cluster or region.",
      reason: "To identify immediate spillover effects. Currency crises in emerging markets are rarely isolated; this query helps detect when a shock in one country (e.g., Thailand) is dragging down its neighbors.",
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
            ?obsSource_T a gemr:Exchange_rate_new_LCU_per_USD ; gemr:hasCountry ?source ; gemr:hasYear ?yearEntity ; gemr:observationValue ?sVal_T .

            ?yearEntity gemr:yearValue ?y_Lit .
            BIND(xsd:integer(STR(?y_Lit)) AS ?year)
            BIND(?year - 1 AS ?yearPrev) 

            ?obsSource_Prev a gemr:Exchange_rate_new_LCU_per_USD ; gemr:hasCountry ?source ; gemr:hasYear ?prevYearEntity ; gemr:observationValue ?sVal_Prev .
            ?prevYearEntity gemr:yearValue ?prevY_Lit .
            FILTER(xsd:integer(STR(?prevY_Lit)) = ?yearPrev)

            BIND(((?sVal_T - ?sVal_Prev) / ?sVal_Prev) * 100 AS ?sourceDepreciation_Pct) 
            FILTER(?sourceDepreciation_Pct > 15) 

            VALUES (?sName ?tName) { 
                 ("Brazil" "Mexico") 
                 ("Thailand" "Philippines") 
            } 
            ?source gemr:countryName ?sName . 
            ?target gemr:countryName ?tName . 

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
  ];

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '900px', 
      margin: '0 auto', 
      lineHeight: '1.6', 
      color: '#333',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px', marginBottom: '10px' }}>About GEMR: KG</h1>
      <p style={{ fontStyle: 'italic', color: '#666', marginBottom: '30px' }}>
        Global Emerging Markets Risk Knowledge Graph
      </p>
      
      <div style={{ background: '#e9f7fe', padding: '15px', borderRadius: '8px', marginBottom: '30px', borderLeft: '5px solid #007bff' }}>
        <strong>Attribution:</strong> This work was done by the authors based on the research paper: <em>GEMR_KG.pdf</em>.
        <br /><br />
        <strong>Authors:</strong>
        <ul style={{ marginTop: '5px', marginBottom: '0', paddingLeft: '20px' }}>
          <li>Adishesh Gonibeed Ravishankar</li>
          <li>Hemakshi Pandey</li>
          <li>Hitesh Kolluru</li>
          <li>Lalitha Shreya Vanam</li>
          <li>Likitha Sathvik Potineni</li>
          <li>Srividya Bansal</li>
        </ul>
      </div>

      <section style={{ marginBottom: '40px' }}>
        <h2>Overview</h2>
        <p>
          The <strong>Global Emerging Markets Risk Knowledge Graph (GEMR: KG)</strong> is a semantic platform designed to 
          integrate, reason over, and visualize complex risk data from emerging markets. It bridges the gap between 
          disparate datasets macroeconomic indicators, governance metrics, and financial data enabling holistic 
          risk assessment and contagion analysis.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Key Use Cases & Queries</h2>
        <p>The following SPARQL queries demonstrate the analytical power of the Knowledge Graph, moving beyond simple data retrieval to complex relationship discovery and temporal reasoning.</p>
        
        {queries.map((q, idx) => (
          <div key={idx} style={{ marginBottom: '30px', background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
            <div style={{ background: '#f8f9fa', padding: '15px', borderBottom: '1px solid #e0e0e0' }}>
              <h3 style={{ margin: 0, fontSize: '1.2em', color: '#0056b3' }}>{idx + 1}. {q.title}</h3>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ marginBottom: '15px' }}>
                <strong>Description:</strong> {q.description}
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>Why this is required:</strong> {q.reason}
              </div>
              <div style={{ background: '#2d2d2d', color: '#f8f8f2', padding: '15px', borderRadius: '4px', overflowX: 'auto' }}>
                <pre style={{ margin: 0, fontSize: '0.85em', fontFamily: 'Consolas, monospace' }}>
                  {q.query}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2>Project Goals</h2>
        <ul style={{ paddingLeft: '20px' }}>
          <li><strong>Unify Data:</strong> Create a single source of truth for emerging market risks.</li>
          <li><strong>Enable Reasoning:</strong> Use semantic relationships to infer contagion paths and causality.</li>
          <li><strong>Facilitate Decisions:</strong> Empower investors and policy makers with actionable, data-driven insights.</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
