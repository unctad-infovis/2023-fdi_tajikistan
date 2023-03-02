import React, { useState, useEffect } from 'react';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartColumn from './components/ChartColumn.jsx';

import '../styles/styles.less';

function Figure1() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el) => ({
    data: Object.values(el).map(val => parseFloat(val)).filter(val => !Number.isNaN(val)),
    labels: Object.keys(el).filter(val => val !== 'Name'),
    name: el.Name
  }));

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-fdi_tajikistan/' : './'}assets/data/2023-fdi_tajikistan_figure1.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON(body))));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="app">
      {dataFigure && (
      <ChartColumn
        idx="1"
        data={dataFigure}
        data_decimals={0}
        note="Data for 2021 is preliminary"
        source="National Bank of Tajikistan (2010–2020) and State Committee On Investments And State Property Management Of The Republic Of Tajikistan (2021)"
        subtitle="Foreign direct investment flows to Tajikistan, 2012–2021, millions of dollars"
        suffix="million dollars"
        title="Investments to Tajikistan bounced back to pre-covid levels in 2021"
        ylabel=""
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default Figure1;
