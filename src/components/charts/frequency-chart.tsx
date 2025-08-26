'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const data = [
  { name: 'Mensuelle', value: 19, color: '#0d6efd' },
  { name: 'Trimestrielle', value: 2, color: '#ffc107' },
  { name: 'Annuelle', value: 4, color: '#6c757d' },
]

export function FrequencyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Répartition Indicateurs par Fréquence</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
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
