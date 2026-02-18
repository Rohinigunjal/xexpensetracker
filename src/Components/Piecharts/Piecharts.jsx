/** @type {import('recharts').PieChartProps} */
import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from 'recharts';

const RADIAN = Math.PI / 180;
const COLORS = ['#A000FF', '#FF9304', '#FDE006'];

/**
 * @param {{
 *   cx: number, cy: number, midAngle: number, innerRadius: number,
 *   outerRadius: number, percent: number
 * }} props
 */
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent = 1 }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

/**
 * @param {{ data: Array<{name: string, value: number}> }} props
 */
export default function Piecharts({ data }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" iconType="rect" />
      </PieChart>
    </ResponsiveContainer>
  );
}
