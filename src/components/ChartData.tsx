import React from 'react';
import { RootState } from "../reducers/rootReducer";
import {useSelector} from "react-redux";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);




const ChartData: React.FC = () =>{

    let  data = useSelector((state: RootState) =>state.appReducer.data);
    let  country = useSelector((state: RootState) =>state.appReducer.country);
    let  isCountry = useSelector((state: RootState) =>state.appReducer.isCountry);

    const barChart = (
      isCountry ===true ? (
          <Bar
            data={{
              labels: ['Infected', 'Recovered', 'Deaths'],
              datasets: [
                {
                  label: 'People',
                  backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                  data: [data[0]?.confirmed.value, data[0]?.recovered.value, data[0]?.deaths.value],
                },
              ],
            }}
          
            options= {{
              plugins: {
                  legend: {
                      display: true,
                      labels: {
                          color: 'rgb(255, 99, 162)'
                      },
                      title: { display: true, text: `Current state in ${country}` },
                  }
              }
          }}
          />
        ) : (
          <Bar
          data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [
              {
                label: 'People',
                backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                data: [data[0]?.confirmed.value, data[0]?.recovered.value, data[0]?.deaths.value],
              },
            ],
          }}
        
          options= {{
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'rgb(255, 99, 162)'
                    },
                    // title: { display: true, text: `Current state in the ${country}` },
                }
            }
        }}
        />
      )
      )
    return (

        <React.Fragment>
          {data[0] && barChart}
        </React.Fragment>
    )
}

export default ChartData;