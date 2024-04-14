import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { datas } from '../../data/export';

const preprocess = (dataDict) => {
  const processedDict = {};
  for (const [key, value] of Object.entries(dataDict)) {
    const keys = key.split(",");
    keys.forEach((k) => {
      processedDict[k] = (processedDict[k] || 0) + value;
    });
  }
  return processedDict;
};

const JailbreaksBarChart = ({ selectedModel }) => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modelData = datas[selectedModel];

        if (modelData && modelData.jailbreak && modelData.jailbreak.details) {
          const jailbreaksSummary = modelData.jailbreak.details;

          const counts = {};
          jailbreaksSummary.forEach((item) => {
            const categories = item.category.split(',');
            categories.forEach((category) => {
              counts[category] = (counts[category] || 0) + 1;
            });
          });

        
          
          if (jailbreaksSummary.length > 0) {
            // Preprocess data
            const countDict = preprocess(counts);
      
            const sortedCountDict = Object.fromEntries(
              Object.entries(countDict).sort((a, b) => a[0].localeCompare(b[0]))
            );
            console.log("countDict:",countDict);
            const methods = Object.keys(sortedCountDict);
            const totalValues = Object.values(sortedCountDict);

            console.log("methods:",methods);

            const matchingData = jailbreaksSummary.filter((item) => item.success === 1);
            const upDict = preprocess(counts);

            console.log("matchingData",matchingData);
            console.log("upDict",upDict);

            // Add missing keys to upDict
            for (const key of Object.keys(sortedCountDict)) {
              if (!(key in upDict)) {
                upDict[key] = 0;
              }
            }

            const sortedUpDict = Object.fromEntries(
              Object.entries(upDict).sort((a, b) => a[0].localeCompare(b[0]))
            );
            const failedValues = Object.values(sortedUpDict);

            setOptions({
              chart: {
                type: 'bar',
                height: 350,
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: '30%',
                  colors: { // Change bar colors
                    ranges: [{
                      from: 0,
                      to: Math.max(...totalValues),
                      color: '#FF0000'
                    }],
                    
                  }
                },
              },
              dataLabels: {
                enabled: false,
              },
              xaxis: {
                categories: methods, // Use categories instead of data
                title: {
                  text: 'Methods',
                  style: { // Change text style
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#FFFFFF'
                  }
                },
                labels: { // Change labels style
                  style: {
                    fontSize: '12px',
                    fontWeight: 'normal',
                    colors: '#FFFFFF'
                  }
                }
              },
              yaxis: {
               
                title: {
                  text: 'Failed',
                  style: { // Change text style
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#FFFFFF'
                  }
                },
                labels: {
                  // Change labels style
                 style: {
                   fontSize: '12px',
                   fontWeight: 'normal',
                   colors: '#FFFFFF'

                 }
               },
                max: Math.max(...failedValues),
              },
              fill: {
                opacity: 1,
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return val + '%';
                  },
                },
              },
              title: {
                text: 'Jailbreak Score by Method',
                style: {
                  fontSize: '15px',
                  fontWeight: 'bold',
                  color: '#FFFFFF'

                }
              },
            });

            const series = [{
              name: 'Failed',
              data: failedValues,
            }];

            setSeries(series);
          }
        } else {
          console.log('No jailbreaks data found for the selected model.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedModel]);

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default JailbreaksBarChart;
