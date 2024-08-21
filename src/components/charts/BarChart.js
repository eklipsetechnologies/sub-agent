import React, { Component } from 'react';
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveParallelCoordinates } from '@nivo/parallel-coordinates'

let data = [
    {
      "temp": 21,
      "cost": 216467,
      "color": "red",
      "target": "A",
      "volume": 0.5929242742678522
    },
    {
      "temp": -6,
      "cost": 379026,
      "color": "yellow",
      "target": "B",
      "volume": 5.016561353011978
    },
    {
      "temp": 27,
      "cost": 6589,
      "color": "green",
      "target": "A",
      "volume": 4.334593287629216
    },
    {
      "temp": 35,
      "cost": 236185,
      "color": "red",
      "target": "E",
      "volume": 5.756154702923587
    },
    {
      "temp": 14,
      "cost": 164236,
      "color": "red",
      "target": "C",
      "volume": 7.435687398906858
    },
    {
      "temp": 34,
      "cost": 184092,
      "color": "red",
      "target": "C",
      "volume": 0.8467243852709154
    },
    {
      "temp": 8,
      "cost": 109163,
      "color": "green",
      "target": "C",
      "volume": 5.488652985873384
    },
    {
      "temp": 5,
      "cost": 156155,
      "color": "yellow",
      "target": "A",
      "volume": 3.0529953154587517
    },
    {
      "temp": -10,
      "cost": 243225,
      "color": "green",
      "target": "E",
      "volume": 2.5337729091163594
    },
    {
      "temp": -7,
      "cost": 298621,
      "color": "green",
      "target": "A",
      "volume": 5.315079628850756
    },
    {
      "temp": 37,
      "cost": 227028,
      "color": "green",
      "target": "A",
      "volume": 0.8234870723445342
    },
    {
      "temp": -3,
      "cost": 314396,
      "color": "yellow",
      "target": "C",
      "volume": 0.5550248964154485
    },
    {
      "temp": -6,
      "cost": 25342,
      "color": "green",
      "target": "A",
      "volume": 7.040986399336496
    },
    {
      "temp": 23,
      "cost": 333612,
      "color": "red",
      "target": "E",
      "volume": 7.2520419179276345
    },
    {
      "temp": 12,
      "cost": 300784,
      "color": "yellow",
      "target": "A",
      "volume": 2.313024532459058
    },
    {
      "temp": -2,
      "cost": 163193,
      "color": "yellow",
      "target": "A",
      "volume": 4.966883713557178
    },
    {
      "temp": 26,
      "cost": 84547,
      "color": "red",
      "target": "A",
      "volume": 5.353694096418023
    },
    {
      "temp": 31,
      "cost": 28000,
      "color": "red",
      "target": "D",
      "volume": 2.2426959462009117
    },
    {
      "temp": 35,
      "cost": 58753,
      "color": "red",
      "target": "A",
      "volume": 5.397115979286506
    },
    {
      "temp": 7,
      "cost": 202218,
      "color": "red",
      "target": "A",
      "volume": 1.2326158682898252
    },
    {
      "temp": 3,
      "cost": 142260,
      "color": "yellow",
      "target": "C",
      "volume": 6.59554307296096
    },
    {
      "temp": -5,
      "cost": 191300,
      "color": "green",
      "target": "D",
      "volume": 4.044914882210209
    },
    {
      "temp": 8,
      "cost": 45315,
      "color": "yellow",
      "target": "A",
      "volume": 2.346895888324554
    },
    {
      "temp": 32,
      "cost": 128795,
      "color": "green",
      "target": "D",
      "volume": 4.41997125641983
    },
    {
      "temp": 2,
      "cost": 807,
      "color": "yellow",
      "target": "E",
      "volume": 1.888504956575415
    },
    {
      "temp": 3,
      "cost": 265794,
      "color": "yellow",
      "target": "E",
      "volume": 3.343453015845609
    },
    {
      "temp": 38,
      "cost": 99134,
      "color": "yellow",
      "target": "D",
      "volume": 3.5083026283053993
    },
    {
      "temp": 20,
      "cost": 188299,
      "color": "green",
      "target": "D",
      "volume": 6.323736106084714
    },
    {
      "temp": 14,
      "cost": 210041,
      "color": "red",
      "target": "C",
      "volume": 2.3994674133578195
    },
    {
      "temp": 23,
      "cost": 279630,
      "color": "red",
      "target": "B",
      "volume": 3.751745501977418
    },
    {
      "temp": 9,
      "cost": 84136,
      "color": "green",
      "target": "A",
      "volume": 3.2757894171175024
    },
    {
      "temp": 10,
      "cost": 68246,
      "color": "yellow",
      "target": "A",
      "volume": 1.1910001687554728
    }
  ];
  
class BarChart extends Component {
    render() {
        return (
            <div style={{height:'400px',width:'600px'}}>
                <ResponsiveParallelCoordinates
        data={data}
        variables={[
            {
                key: 'temp',
                type: 'linear',
                min: 'auto',
                max: 'auto',
                ticksPosition: 'before',
                legend: 'temperature',
                legendPosition: 'start',
                legendOffset: 20
            },
            {
                key: 'cost',
                type: 'linear',
                min: 0,
                max: 'auto',
                ticksPosition: 'before',
                legend: 'cost',
                legendPosition: 'start',
                legendOffset: 20
            },
            {
                key: 'color',
                type: 'point',
                padding: 1,
                values: [
                    'red',
                    'yellow',
                    'green'
                ],
                legend: 'color',
                legendPosition: 'start',
                legendOffset: -20
            },
            {
                key: 'target',
                type: 'point',
                padding: 0,
                values: [
                    'A',
                    'B',
                    'C',
                    'D',
                    'E'
                ],
                legend: 'target',
                legendPosition: 'start',
                legendOffset: -20
            },
            {
                key: 'volume',
                type: 'linear',
                min: 0,
                max: 'auto',
                legend: 'volume',
                legendPosition: 'start',
                legendOffset: -20
            }
        ]}
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
    />
            </div>
        );
    }
}

export default BarChart;