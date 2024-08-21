import React, { Component } from 'react';
import { ResponsiveSunburst } from '@nivo/sunburst'

let data = {
    "name": "nivo",
    "color": "hsl(53, 70%, 50%)",
    "children": [
      {
        "name": "viz",
        "color": "hsl(183, 70%, 50%)",
        "children": [
          {
            "name": "stack",
            "color": "hsl(350, 70%, 50%)",
            "children": [
              {
                "name": "cchart",
                "color": "hsl(126, 70%, 50%)",
                "loc": 100014
              },
              {
                "name": "xAxis",
                "color": "hsl(234, 70%, 50%)",
                "loc": 21925
              },
              {
                "name": "yAxis",
                "color": "hsl(354, 70%, 50%)",
                "loc": 197609
              },
              {
                "name": "layers",
                "color": "hsl(158, 70%, 50%)",
                "loc": 171124
              }
            ]
          },
          {
            "name": "ppie",
            "color": "hsl(331, 70%, 50%)",
            "children": [
              {
                "name": "chart",
                "color": "hsl(137, 70%, 50%)",
                "children": [
                  {
                    "name": "pie",
                    "color": "hsl(217, 70%, 50%)",
                    "children": [
                      {
                        "name": "outline",
                        "color": "hsl(191, 70%, 50%)",
                        "loc": 158812
                      },
                      {
                        "name": "slices",
                        "color": "hsl(306, 70%, 50%)",
                        "loc": 61550
                      },
                      {
                        "name": "bbox",
                        "color": "hsl(329, 70%, 50%)",
                        "loc": 43951
                      }
                    ]
                  },
                  {
                    "name": "donut",
                    "color": "hsl(344, 70%, 50%)",
                    "loc": 115853
                  },
                  {
                    "name": "gauge",
                    "color": "hsl(295, 70%, 50%)",
                    "loc": 132181
                  }
                ]
              },
              {
                "name": "legends",
                "color": "hsl(305, 70%, 50%)",
                "loc": 180439
              }
            ]
          }
        ]
      },
      {
        "name": "colors",
        "color": "hsl(155, 70%, 50%)",
        "children": [
          {
            "name": "rgb",
            "color": "hsl(56, 70%, 50%)",
            "loc": 172573
          },
          {
            "name": "hsl",
            "color": "hsl(162, 70%, 50%)",
            "loc": 5392
          }
        ]
      },
      {
        "name": "utils",
        "color": "hsl(213, 70%, 50%)",
        "children": [
          {
            "name": "randomize",
            "color": "hsl(82, 70%, 50%)",
            "loc": 196199
          },
          {
            "name": "resetClock",
            "color": "hsl(173, 70%, 50%)",
            "loc": 89756
          },
          {
            "name": "noop",
            "color": "hsl(226, 70%, 50%)",
            "loc": 126313
          },
          {
            "name": "tick",
            "color": "hsl(350, 70%, 50%)",
            "loc": 54215
          },
          {
            "name": "forceGC",
            "color": "hsl(148, 70%, 50%)",
            "loc": 173493
          },
          {
            "name": "stackTrace",
            "color": "hsl(284, 70%, 50%)",
            "loc": 5532
          },
          {
            "name": "dbg",
            "color": "hsl(224, 70%, 50%)",
            "loc": 195714
          }
        ]
      },
      {
        "name": "generators",
        "color": "hsl(175, 70%, 50%)",
        "children": [
          {
            "name": "address",
            "color": "hsl(231, 70%, 50%)",
            "loc": 73852
          },
          {
            "name": "city",
            "color": "hsl(354, 70%, 50%)",
            "loc": 21924
          },
          {
            "name": "animal",
            "color": "hsl(236, 70%, 50%)",
            "loc": 164574
          },
          {
            "name": "movie",
            "color": "hsl(75, 70%, 50%)",
            "loc": 113018
          },
          {
            "name": "user",
            "color": "hsl(104, 70%, 50%)",
            "loc": 47339
          }
        ]
      },
      {
        "name": "set",
        "color": "hsl(333, 70%, 50%)",
        "children": [
          {
            "name": "clone",
            "color": "hsl(65, 70%, 50%)",
            "loc": 28403
          },
          {
            "name": "intersect",
            "color": "hsl(6, 70%, 50%)",
            "loc": 79558
          },
          {
            "name": "merge",
            "color": "hsl(247, 70%, 50%)",
            "loc": 11476
          },
          {
            "name": "reverse",
            "color": "hsl(348, 70%, 50%)",
            "loc": 173032
          },
          {
            "name": "toArray",
            "color": "hsl(72, 70%, 50%)",
            "loc": 5606
          },
          {
            "name": "toObject",
            "color": "hsl(242, 70%, 50%)",
            "loc": 32061
          },
          {
            "name": "fromCSV",
            "color": "hsl(162, 70%, 50%)",
            "loc": 109972
          },
          {
            "name": "slice",
            "color": "hsl(258, 70%, 50%)",
            "loc": 171624
          },
          {
            "name": "append",
            "color": "hsl(93, 70%, 50%)",
            "loc": 141884
          },
          {
            "name": "prepend",
            "color": "hsl(76, 70%, 50%)",
            "loc": 182532
          },
          {
            "name": "shuffle",
            "color": "hsl(52, 70%, 50%)",
            "loc": 141513
          },
          {
            "name": "pick",
            "color": "hsl(60, 70%, 50%)",
            "loc": 105041
          },
          {
            "name": "plouc",
            "color": "hsl(66, 70%, 50%)",
            "loc": 7086
          }
        ]
      },
      {
        "name": "text",
        "color": "hsl(232, 70%, 50%)",
        "children": [
          {
            "name": "trim",
            "color": "hsl(155, 70%, 50%)",
            "loc": 155109
          },
          {
            "name": "slugify",
            "color": "hsl(346, 70%, 50%)",
            "loc": 137354
          },
          {
            "name": "snakeCase",
            "color": "hsl(235, 70%, 50%)",
            "loc": 135158
          },
          {
            "name": "camelCase",
            "color": "hsl(187, 70%, 50%)",
            "loc": 114927
          },
          {
            "name": "repeat",
            "color": "hsl(231, 70%, 50%)",
            "loc": 47752
          },
          {
            "name": "padLeft",
            "color": "hsl(223, 70%, 50%)",
            "loc": 160023
          },
          {
            "name": "padRight",
            "color": "hsl(34, 70%, 50%)",
            "loc": 134400
          },
          {
            "name": "sanitize",
            "color": "hsl(318, 70%, 50%)",
            "loc": 65604
          },
          {
            "name": "ploucify",
            "color": "hsl(80, 70%, 50%)",
            "loc": 140716
          }
        ]
      },
      {
        "name": "misc",
        "color": "hsl(276, 70%, 50%)",
        "children": [
          {
            "name": "greetings",
            "color": "hsl(149, 70%, 50%)",
            "children": [
              {
                "name": "hey",
                "color": "hsl(6, 70%, 50%)",
                "loc": 24134
              },
              {
                "name": "HOWDY",
                "color": "hsl(187, 70%, 50%)",
                "loc": 163057
              },
              {
                "name": "aloha",
                "color": "hsl(101, 70%, 50%)",
                "loc": 181869
              },
              {
                "name": "AHOY",
                "color": "hsl(168, 70%, 50%)",
                "loc": 2280
              }
            ]
          },
          {
            "name": "other",
            "color": "hsl(320, 70%, 50%)",
            "loc": 164504
          },
          {
            "name": "path",
            "color": "hsl(350, 70%, 50%)",
            "children": [
              {
                "name": "pathA",
                "color": "hsl(192, 70%, 50%)",
                "loc": 66626
              },
              {
                "name": "pathB",
                "color": "hsl(292, 70%, 50%)",
                "children": [
                  {
                    "name": "pathB1",
                    "color": "hsl(27, 70%, 50%)",
                    "loc": 60578
                  },
                  {
                    "name": "pathB2",
                    "color": "hsl(315, 70%, 50%)",
                    "loc": 136254
                  },
                  {
                    "name": "pathB3",
                    "color": "hsl(122, 70%, 50%)",
                    "loc": 46281
                  },
                  {
                    "name": "pathB4",
                    "color": "hsl(172, 70%, 50%)",
                    "loc": 129337
                  }
                ]
              },
              {
                "name": "pathC",
                "color": "hsl(284, 70%, 50%)",
                "children": [
                  {
                    "name": "pathC1",
                    "color": "hsl(227, 70%, 50%)",
                    "loc": 90556
                  },
                  {
                    "name": "pathC2",
                    "color": "hsl(252, 70%, 50%)",
                    "loc": 99534
                  },
                  {
                    "name": "pathC3",
                    "color": "hsl(116, 70%, 50%)",
                    "loc": 82755
                  },
                  {
                    "name": "pathC4",
                    "color": "hsl(261, 70%, 50%)",
                    "loc": 14832
                  },
                  {
                    "name": "pathC5",
                    "color": "hsl(109, 70%, 50%)",
                    "loc": 46254
                  },
                  {
                    "name": "pathC6",
                    "color": "hsl(163, 70%, 50%)",
                    "loc": 8598
                  },
                  {
                    "name": "pathC7",
                    "color": "hsl(127, 70%, 50%)",
                    "loc": 97965
                  },
                  {
                    "name": "pathC8",
                    "color": "hsl(20, 70%, 50%)",
                    "loc": 30286
                  },
                  {
                    "name": "pathC9",
                    "color": "hsl(155, 70%, 50%)",
                    "loc": 85828
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  
class SunBurstChart extends Component {
    render() {
        return (
            <div style={{height:'400px',width:'300px'}}>
                <ResponsiveSunburst
        data={data}
        margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
        id="name"
        value="loc"
        cornerRadius={2}
        borderWidth={1}
        borderColor="white"
        colors={{ scheme: 'nivo' }}
        childColor={{ from: 'color' }}
        animate={false}
        motionConfig="gentle"
        isInteractive={true}
    />
            </div>
        );
    }
}

export default SunBurstChart;