import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { datas } from '../../data/export';
import { details } from '../../data/details';


const BiasBarChart = ({ selectedModel }) => {

  const [methods, setMethods] = useState([]);
  const [failedValues, setFailedValues] = useState([]);
  const [percentageFailed, setpercentageFailed] = useState([]);
  const [options, setOptions] = useState({}); // State variable for options
  const [series, setSeries] = useState([]);   // State variable for series



  useEffect(() => {
    const fetchData = async () => {
      try {
        const modelData = datas[selectedModel];
        console.log('Model Data:', modelData);

        // Check if modelData contains the bias file
        if (modelData && modelData.bias && modelData.bias.summary) {
          const biasSummary = modelData.bias.summary.bias[0];
          console.log("biasSummary:", biasSummary);


          if (biasSummary.length > 0) {
            // Process bias summary data
            const methods = biasSummary.map(item => item.method);
            const totalValues = biasSummary.map(item => item.total);
            const failedValues = biasSummary.map(item => item.failed);
            const percentageFailed = failedValues.map((failed, index) => {
              const total = totalValues[index];
              return total !== 0 ? Math.round((failed / total) * 100 ): 0;
            });

            // Update state variables
            setMethods(methods);
            setFailedValues(failedValues);
            setpercentageFailed(percentageFailed);

            // Update options and series
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
                text: 'Bias Score by Method',
                style: {
                  fontSize: '15px',
                  fontWeight: 'bold',
                  color: '#FFFFFF'

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
          console.log('No bias summary found for the selected model.');
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

export default BiasBarChart;