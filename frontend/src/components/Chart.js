import React from 'react';
import {Bar} from 'react-chartjs';

const Chart = (props) => {
    const booking_chart = {
      Cheap : {
        min : 0.1,
        max : 50
      },
      Normal : {
        min : 50,
        max : 500
      },
      Expencive : {
        min : 500,
        max : 10000
      }
    }
    const outPut = {};
    for (var key in booking_chart) {
      let filtered = props.bookings.reduce((accum,currentValue) => {
        if (currentValue.event.price > booking_chart[key].min && currentValue.event.price < booking_chart[key].max ) {
          return (accum + 1);
        }
        return accum;
      },0);
      outPut[key] = filtered
    }
    const random = Math.round(Math.random() * 2);
    let options;
    switch (random) {
      case 0:
       options = {
          fillColor: ["rgba(179, 128, 255,0.5)","rgba(255, 102, 102,0.5)","rgba(51, 153, 255,0.5)"],
          strokeColor: ["rgba(179, 128, 255,0.8)","rgba(255, 102, 102,0.8)","rgba(51, 153, 255,0.8)"],
          highlightFill: ["rgba(179, 128, 255,0.75)","rgba(255, 102, 102,0.75)","rgba(51, 153, 255,0.75)"],
          highlightStroke: ["rgba(179, 128, 255,1)","rgba(255, 102, 102,1)","rgba(51, 153, 255,1)"]
        }
        break;
      case 1:
        options = {
          fillColor: ["rgba(255, 166, 77,0.5)","rgba(92, 214, 92,0.5)","rgba(255, 140, 102,0.5)"],
          strokeColor: ["rgba(255, 166, 77,0.8)","rgba(92, 214, 92,0.8)","rgba(255, 140, 102,0.8)"],
          highlightFill: ["rgba(255, 166, 77,0.75)","rgba(92, 214, 92,0.75)","rgba(255, 140, 102,0.75)"],
          highlightStroke: ["rgba(255, 166, 77,1)","rgba(92, 214, 92,1)","rgba(255, 140, 102,1)"]
        }
        break;
      case 2:
       options = {
          fillColor: ["rgba(170, 255, 0,0.5)","rgba(217, 217, 217,0.5)","rgba(140, 217, 179,0.5)"],
          strokeColor: ["rgba(170, 255, 0,0.8)","rgba(217, 217, 217,0.8)","rgba(140, 217, 179,0.8)"],
          highlightFill: ["rgba(170, 255, 0,0.75)","rgba(217, 217, 217,0.75)","rgba(140, 217, 179,0.75)"],
          highlightStroke: ["rgba(170, 255, 0,1)","rgba(217, 217, 217,1)","rgba(140, 217, 179,1)"]
        }
        break;
    }
    const chartData = {
      labels: ["Cheap","Normal","Expencive"],
    	datasets: [
    		{
    			fillColor: options.fillColor,
    			strokeColor: options.strokeColor,
    			highlightFill: options.highlightFill,
    			highlightStroke: options.highlightStroke,
    			data: [outPut.Cheap,outPut.Normal,outPut.Expencive]
    		},
        {}
    	]
    };
    return(
      <div className = 'themeChart'><Bar data={chartData} width = '600' height = '350'/></div>
    )
}
export default Chart;
