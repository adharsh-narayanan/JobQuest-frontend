import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';

function Statistics({users,recruiters,jobs}) {

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['Recruiters', 'Users', 'Jobs'] }]}
      series={[ { data: [recruiters.length, users.length,jobs.length ] }]}
      width={1000}
      height={500}
    />)
}

export default Statistics