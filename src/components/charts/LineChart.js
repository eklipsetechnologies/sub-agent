import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'

let data = [
    {
      "id": "japan",
      "color": "hsl(309, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 175
        },
        {
          "x": "helicopter",
          "y": 209
        },
        {
          "x": "boat",
          "y": 275
        },
        {
          "x": "train",
          "y": 18
        },
        {
          "x": "subway",
          "y": 81
        },
        {
          "x": "bus",
          "y": 20
        },
        {
          "x": "car",
          "y": 69
        },
        {
          "x": "moto",
          "y": 114
        },
        {
          "x": "bicycle",
          "y": 104
        },
        {
          "x": "horse",
          "y": 152
        },
        {
          "x": "skateboard",
          "y": 49
        },
        {
          "x": "others",
          "y": 94
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(260, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 128
        },
        {
          "x": "helicopter",
          "y": 165
        },
        {
          "x": "boat",
          "y": 212
        },
        {
          "x": "train",
          "y": 171
        },
        {
          "x": "subway",
          "y": 233
        },
        {
          "x": "bus",
          "y": 262
        },
        {
          "x": "car",
          "y": 257
        },
        {
          "x": "moto",
          "y": 229
        },
        {
          "x": "bicycle",
          "y": 254
        },
        {
          "x": "horse",
          "y": 237
        },
        {
          "x": "skateboard",
          "y": 104
        },
        {
          "x": "others",
          "y": 39
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(23, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 125
        },
        {
          "x": "helicopter",
          "y": 201
        },
        {
          "x": "boat",
          "y": 281
        },
        {
          "x": "train",
          "y": 77
        },
        {
          "x": "subway",
          "y": 29
        },
        {
          "x": "bus",
          "y": 7
        },
        {
          "x": "car",
          "y": 94
        },
        {
          "x": "moto",
          "y": 198
        },
        {
          "x": "bicycle",
          "y": 221
        },
        {
          "x": "horse",
          "y": 279
        },
        {
          "x": "skateboard",
          "y": 222
        },
        {
          "x": "others",
          "y": 67
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(1, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 140
        },
        {
          "x": "helicopter",
          "y": 118
        },
        {
          "x": "boat",
          "y": 196
        },
        {
          "x": "train",
          "y": 146
        },
        {
          "x": "subway",
          "y": 240
        },
        {
          "x": "bus",
          "y": 29
        },
        {
          "x": "car",
          "y": 98
        },
        {
          "x": "moto",
          "y": 137
        },
        {
          "x": "bicycle",
          "y": 51
        },
        {
          "x": "horse",
          "y": 82
        },
        {
          "x": "skateboard",
          "y": 65
        },
        {
          "x": "others",
          "y": 280
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(99, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 6
        },
        {
          "x": "helicopter",
          "y": 18
        },
        {
          "x": "boat",
          "y": 185
        },
        {
          "x": "train",
          "y": 282
        },
        {
          "x": "subway",
          "y": 92
        },
        {
          "x": "bus",
          "y": 225
        },
        {
          "x": "car",
          "y": 203
        },
        {
          "x": "moto",
          "y": 179
        },
        {
          "x": "bicycle",
          "y": 154
        },
        {
          "x": "horse",
          "y": 175
        },
        {
          "x": "skateboard",
          "y": 153
        },
        {
          "x": "others",
          "y": 9
        }
      ]
    }
  ]
  
class LineChart extends Component {
    render() {
        return (
            <div style={{height:'400px',width:'700px'}}>
                <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
            </div>
        );
    }
}

export default LineChart;