import React, { useState, useEffect, useMemo } from 'react';
import InteractiveGlobe from './InteractiveGlobe';
import SparqlInterface from './SparqlInterface';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Home() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndicator, setSelectedIndicator] = useState('');

  // Helper to identify if a string is effectively ALL CAPS (ignoring non-letters)
  // This helps us filter out codes like REER, GDP_USD, etc. if better options exist
  const isAllCap = (str) => {
    // Only consider it all-caps if it has at least one letter and equals its upper case self
    return /[a-zA-Z]/.test(str) && str === str.toUpperCase();
  };

  useEffect(() => {
    if (!selectedCountry) {
      setStats([]);
      setSelectedIndicator('');
      return;
    }

    setLoading(true);

    // SPARQL Query: Fetches ALL data for the selected country
    const query = `
      PREFIX gemr: <https://gemr-kg.org/ontology#>
      SELECT DISTINCT ?indicator ?year ?value
      WHERE {
        ?obs a gemr:Observation ;
             gemr:hasCountry ?country ;
             gemr:hasIndicator ?indicator ;
             gemr:hasYear ?yearEntity ;
             gemr:observationValue ?value .
        
        ?country gemr:countryName "${selectedCountry}" .
        ?yearEntity gemr:yearValue ?year .
      }
      ORDER BY ?indicator ?year
    `;

    // Fetch from GraphDB (via proxy)
    fetch(`/repositories/GEMR?query=${encodeURIComponent(query)}`, {
      headers: {
        'Accept': 'application/sparql-results+json'
      }
    })
      .then(res => res.json())
      .then(data => {
        const formattedStats = data.results.bindings.map(b => ({
          indicator: b.indicator.value.split('#')[1] || b.indicator.value,
          year: parseInt(b.year.value, 10),
          value: parseFloat(b.value.value)
        }));
        setStats(formattedStats);

        // Set default indicator if available
        if (formattedStats.length > 0) {
          const allIndicators = [...new Set(formattedStats.map(s => s.indicator))];
          
          // Filter out ALL_CAPS codes if there are many indicators
          let filteredIndicators = allIndicators;
          if (allIndicators.length > 20) {
             const readable = allIndicators.filter(ind => !isAllCap(ind));
             
             // Only apply filter if we still have indicators left (safety check)
             if (readable.length > 0) {
                 filteredIndicators = readable;
             }
          }
          
          setSelectedIndicator(filteredIndicators[0]);
        }

        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching stats:", err);
        setLoading(false);
      });

  }, [selectedCountry]);

  // Filter data for the chart based on selected indicator
  const chartData = useMemo(() => {
    if (!selectedIndicator) return [];

    const filtered = stats.filter(s => s.indicator === selectedIndicator);

    // Aggregate data by year (average values for duplicates)
    const aggregated = Object.values(filtered.reduce((acc, curr) => {
      if (!acc[curr.year]) {
        acc[curr.year] = { year: curr.year, sum: 0, count: 0 };
      }
      acc[curr.year].sum += curr.value;
      acc[curr.year].count += 1;
      return acc;
    }, {})).map(item => ({
      year: item.year,
      value: item.sum / item.count
    }));

    return aggregated.sort((a, b) => a.year - b.year);
  }, [stats, selectedIndicator]);

  // Get unique indicators for the dropdown
  const indicators = useMemo(() => {
    const allIndicators = [...new Set(stats.map(s => s.indicator))].sort();
    
    // Apply the same filtering logic as in useEffect
    if (allIndicators.length > 20) {
        const readable = allIndicators.filter(ind => !isAllCap(ind));
        
        if (readable.length > 0) {
            return readable;
        }
    }
    return allIndicators;
  }, [stats]);

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      {/* Left Column: Globe + Stats - FIXED WIDTH */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '400px', // Fixed width
        minWidth: '400px',
        maxWidth: '400px',
        height: '100%',
        flexShrink: 0,
        marginRight: '20px'
      }}>

        {/* Globe Container - FIXED SIZE */}
        <div style={{
          width: '400px',
          height: '400px',
          minHeight: '400px',
          background: '#000',
          border: '1px solid #333',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '20px',
          flexShrink: 0
        }}>
          <InteractiveGlobe
            onCountrySelect={setSelectedCountry}
            width={400}
            height={400}
          />
        </div>

        {/* Stats Panel - FILLS REMAINING HEIGHT */}
        <div style={{
          flexGrow: 1,
          background: '#fff',
          borderRadius: '8px',
          padding: '15px',
          overflowY: 'auto', // Internal scroll only
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          height: 'calc(100% - 420px)' // Explicit height calculation as fallback
        }}>
          <h2 style={{ marginTop: 0, borderBottom: '2px solid #eee', paddingBottom: '10px', fontSize: '1.2em' }}>
            {selectedCountry ? selectedCountry : 'Select a Country'}
          </h2>

          {loading && <p>Loading stats...</p>}

          {!loading && selectedCountry && stats.length === 0 && (
            <p>No data available for this country.</p>
          )}

          {!loading && stats.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
              {/* Indicator Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8em', marginBottom: '5px', color: '#666' }}>Select Indicator:</label>
                <select
                  value={selectedIndicator}
                  onChange={(e) => setSelectedIndicator(e.target.value)}
                  style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  {indicators.map(ind => (
                    <option key={ind} value={ind}>{ind.replace(/_/g, ' ').replace(/%25/g, '%')}</option>
                  ))}
                </select>
              </div>

              {/* Chart - FLEX GROW to fill available space */}
              <div style={{ flexGrow: 1, width: '100%', minHeight: '200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" domain={['auto', 'auto']} />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} name="Value" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

            </div>
          )}
        </div>

      </div>

      {/* Right Column: SPARQL Interface - FILLS REMAINING WIDTH */}
      <div style={{
        flexGrow: 1,
        height: '100%',
        overflow: 'hidden'
      }}>
        <SparqlInterface />
      </div>
    </div>
  );
}

export default Home;
