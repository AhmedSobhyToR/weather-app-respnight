import React, { useRef, useState } from 'react';
import './Dayforecast.css'
import {  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);
const Dayforecast = (props) => {

    const filteredHours = Array.isArray(props.filteredHours ) ? props.filteredHours : [];
    const filteredIconHours = Array.isArray(props.filteredIconHours) ? props.filteredIconHours : [];
    const  filteredDegreeHours = Array.isArray(props.filteredDegreeHours) ? props.filteredDegreeHours : [];
    const data = {
        labels: filteredDegreeHours.map((_, index) => index + 1), 
        datasets: [
          {
            label: "Degree Hours",
            data: filteredDegreeHours,
            borderColor: props.backGround? "rgba(43, 15, 109, 0.721)": "rgba(31, 114, 182, 0.759)",
            backgroundColor: "transparent", 
            pointBackgroundColor: "white", 
            pointBorderWidth: 2, 
            pointRadius: 5, 
            borderWidth: 2 
          }
        ],
      };
      const options = {
        plugins: {
          legend: {
            display: false, 
          },
          tooltip: {
            enabled: false, 
          }
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false, 
            beginAtZero: true,
          }
        },
        elements: {
          line: {
            tension: 0.1,
          },
          point: {
            radius: 0, 
          }
        }
    }

    return (
  
        <div className='day-forecast'>
                <div className= 'day-hour-forecast'>
                    <ul>
                        {
                            filteredHours.map((hour, index) => (
                                <li key={index}>{hour}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className= 'day-icon-forecast'>
                    <ul>
                        {
                 filteredIconHours.map((icon, index) => (
                    <li key={index}><img src={icon} alt="" /></li>
                ))
                        }
                    </ul>
                </div>

                <div className= 'day-degree-forecast'>
                    <ul>
                        {
                            filteredDegreeHours.map((deg, index) => (
                                <li key={index}>{deg}&deg;</li>
                            ))
                        }
                    </ul>
                </div>

                <div className= 'day-chart-forecast'>
                <Line data={data} options={options} />
                </div>
        </div>
    );
}

export default Dayforecast;
