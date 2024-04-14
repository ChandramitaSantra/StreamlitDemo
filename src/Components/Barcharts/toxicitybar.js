import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { datas } from '../../data/export';
import { details } from '../../data/details';

const ToxicityBarChart = ({ selectedModel }) => {
  const [methods, setMethods] = useState([]);
  const [failedValues, setFailedValues] = useState([]);
  const [percentageFailed, setPercentageFailed] = useState([]);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modelData = datas[selectedModel];

        

        if (modelData && modelData.toxicity && modelData.toxicity.summary) {
          const toxicitySummary = modelData.toxicity.summary.toxicity;

          

          if (toxicitySummary.length > 0) {
            const methods = toxicitySummary.map(item => item.method);
            const totalValues = toxicitySummary.map(item => item.total);
            const failedValues = toxicitySummary.map(item => item.failed);
            const percentageFailed = failedValues.map((failed, index) => {
              const total = totalValues[index];
              return total !== 0 ? Math.round((failed / total) * 100) : 0;
            });

           

            setMethods(methods);
            setFailedValues(failedValues);
            setPercentageFailed(percentageFailed);

            const options = {
              chart: {
                type: 'bar',
                height: 350,
              },
              
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: '15%',
                  colors: { // Change bar colors
                    ranges: [{
                      from: 0,
                      to: Math.max(...percentageFailed),
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
                max: Math.max(...percentageFailed), // Set maximum value as the maximum of percentageFailed
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
                text: 'Toxicity Score by Method',
                style: {
                  fontSize: '12px',
                  fontWeight: 'normal',
                  colors: '#FFFFFF'

                }
              },
            };

            const series = [{
              name: 'Failed',
              data: percentageFailed,
            }];


            setOptions(options);
            setSeries(series);
          }
        } else {
          console.log('No toxicity data found for the selected model.');
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

export default ToxicityBarChart;
