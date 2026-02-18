import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import styles from "./BarChart.module.css";

export default function MyBarchart({data}) {

//   console.log("bar data : " + data.map((item)=> [item.name,
// item.value]
// ));

  return (
    <div className={styles.barchart_section}>
      <h2>Top Expenses</h2>

      
    <ResponsiveContainer width="100%" height={340}>
      <BarChart className={styles.bar_chart} layout="vertical"  data={data}>
        <XAxis type='number' display="none"/>
        <YAxis type='category' width={120}
        dataKey="name"
        axisLine={false}/>        
        <Bar dataKey="value" fill="rgba(135, 132, 210, 1)"
        barSize={21} />        
      </BarChart>
    </ResponsiveContainer>
    
    </div>
  );
};