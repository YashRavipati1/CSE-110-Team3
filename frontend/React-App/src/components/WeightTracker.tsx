import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: '01/18',
    Weight: 200,
  },
  {
    name: '02/18',
    Weight: 195,
  },
  {
    name: '03/18',
    Weight: 190,
  },
  {
    name: '04/18',
    Weight: 185,
  },
  {
    name: '05/18',
    Weight: 180,
  },
  {
    name: '06/18',
    Weight: 175,
  },
  {
    name: '07/18',
    Weight: 170,
  },
  {
    name: '08/18',
    Weight: 165,
  },
  {
    name: '09/18',
    Weight: 160,
  },
  {
    name: '10/18',
    Weight: 155,
  },
  {
    name: '11/18',
    Weight: 150,
  },
];

export default class WeightTracker extends PureComponent {
  render() {
      const goal = 160;
      //Creates a buffer from the Min and Max Y axis
      const maxY = Math.max(...data.map(item => item.Weight), goal) + 10;
      const minY = Math.min(...data.map(item => item.Weight), goal) - 10;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 50,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{ value: 'Date', position: 'insideBottom', offset: -9 }}
          />
          <YAxis
            label={{ value: 'Weight', angle: -90, position: 'insideLeft' }}
            domain={[minY, maxY]}
          />
          <Tooltip />
          <Legend 
            wrapperStyle={{
              top: -30,
              left: 50,
              right: 0,
              bottom: 0,
              position: 'relative',
            }}
          />
          <ReferenceLine y={goal} label={{value: 'Goal', position: 'insideTop'}} stroke="blue" />
          <Line type="monotone" dataKey="Weight" stroke="green" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
