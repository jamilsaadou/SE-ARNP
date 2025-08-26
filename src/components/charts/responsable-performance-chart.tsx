'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const performanceData = [
  { responsable: 'DG', indicateurs: 1, performance: 87, cible: 90 },
  { responsable: 'DOL', indicateurs: 3, performance: 89, cible: 85 },
  { responsable: 'DG/SSE', indicateurs: 3, performance: 92, cible: 88 },
  { responsable: 'DISAC', indicateurs: 6, performance: 84, cible: 80 },
  { responsable: 'DH', indicateurs: 3, performance: 91, cible: 87 },
  { responsable: 'DVUE', indicateurs: 5, performance: 78, cible: 82 },
]

export function ResponsablePerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Comparative par Responsable</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f4" />
            <XAxis dataKey="responsable" stroke="#6c757d" fontSize={12} />
            <YAxis stroke="#6c757d" fontSize={12} />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
              formatter={(value, name) => [
                `${value}%`,
                name === 'performance' ? 'Performance' : 'Cible'
              ]}
            />
            <Legend />
            <Bar dataKey="performance" fill="#ff6b35" name="Performance Réelle" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cible" fill="#e9ecef" name="Cible" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
