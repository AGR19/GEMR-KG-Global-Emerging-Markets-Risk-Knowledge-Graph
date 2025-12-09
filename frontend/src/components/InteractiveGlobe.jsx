import React, { useState, useEffect, useMemo } from 'react';
import Globe from 'react-globe.gl';

const TARGET_COUNTRIES = [
    'Brazil',
    'China',
    'Mexico',
    'Philippines',
    'Poland',
    'Thailand'
];

const InteractiveGlobe = ({ onCountrySelect, width, height }) => {
    const [countries, setCountries] = useState({ features: [] });
    const [hoverD, setHoverD] = useState();

    useEffect(() => {
        // Load GeoJSON data
        fetch('/datasets/ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(setCountries)
            .catch(err => console.error('Failed to load country data:', err));
    }, []);

    const colorScale = ({ properties: d }) => {
        if (TARGET_COUNTRIES.includes(d.NAME)) {
            return '#FFD700'; // Gold for target countries
        }
        return 'rgba(255, 255, 255, 0.1)'; // Low opacity white for others
    };

    return (
        <Globe
            width={width}
            height={height}
            globeImageUrl="/images/earth-night.jpg"
            backgroundImageUrl="/images/night-sky.png"
            polygonsData={countries.features}
            polygonAltitude={d => d === hoverD && TARGET_COUNTRIES.includes(d.properties.NAME) ? 0.12 : 0.06}
            polygonCapColor={d => d === hoverD && TARGET_COUNTRIES.includes(d.properties.NAME) ? 'steelblue' : colorScale(d)}
            polygonSideColor={() => 'rgba(255, 255, 255, 0.05)'}
            polygonStrokeColor={() => '#111'}
            polygonLabel={({ properties: d }) => TARGET_COUNTRIES.includes(d.NAME) ? `
        <div style="background: #333; color: #fff; padding: 4px; border-radius: 4px;">
          <b>${d.NAME}</b>
        </div>
      ` : null}
            onPolygonHover={setHoverD}
            onPolygonClick={({ properties: d }) => {
                if (TARGET_COUNTRIES.includes(d.NAME)) {
                    onCountrySelect(d.NAME);
                }
            }}
            polygonsTransitionDuration={300}
        />
    );
};

export default InteractiveGlobe;
