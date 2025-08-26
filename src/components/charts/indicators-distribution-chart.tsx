'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const distributionData = [
  { name: 'DOL', value: 3, color: '#0071ce' },
  { name: 'DISAC', value: 6, color: '#28a745' },
  { name: 'DH', value: 3, color: '#ffc107' },
  { name: 'DVUE', value: 5, color: '#17a2b8' },
  { name: 'DG/SSE', value: 3, color: '#6f42c1' },
  { name: 'DG', value: 1, color: '#fd7e14' },
  { name: 'Non défini', value: 4, color: '#dc3545' },
]

export function IndicatorsDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Répartition des Indicateurs par Responsable</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={distributionData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value} indicateurs`, 'Nombre']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
