import React, { useState, useEffect } from 'react';

// Load helpers.
// import { transpose } from 'csv-transpose';

import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartBar from './components/ChartBar.jsx';

import '../styles/styles.less';

function Figure1() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el) => ({
    data: Object.values(el).map(val => parseFloat(val)).slice(1).filter(val => !Number.isNaN(val)),
    labels: Object.keys(el).slice(1).filter(val => val !== 'Name'),
    name: el.Name
  }));

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-fdi_tajikistan/' : './'}assets/data/2023-fdi_tajikistan_figure2.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => {
          console.log(body);
          setDataFigure(cleanData(CSVtoJSON((body))));
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="app">
      {dataFigure && (
      <ChartBar
        idx="2"
        data={dataFigure}
        data_decimals={0}
        note="Data for 2021 is preliminary"
        source="National Bank of Tajikistan (2012–2020) and State Committee On Investments And State Property Management Of The Republic Of Tajikistan (2021)"
        subtitle="Foreign direct investment inflows by sector, 2012–2016 vs 2017–2021, millions of dollars"
        suffix=""
        title="Investments to manufacturing and construction have dropped drastically"
        ylabel=""
        ymax={1000}
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default Figure1;
