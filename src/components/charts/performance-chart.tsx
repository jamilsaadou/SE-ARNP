'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { mois: 'Oct 2024', DG: 82, DOL: 78, 'DG/SSE': 90 },
  { mois: 'Nov 2024', DG: 85, DOL: 80, 'DG/SSE': 91 },
  { mois: 'Déc 2024', DG: 83, DOL: 85, 'DG/SSE': 89 },
  { mois: 'Jan 2025', DG: 88, DOL: 89, 'DG/SSE': 93 },
  { mois: 'Fév 2025', DG: 85, DOL: 92, 'DG/SSE': 94 },
  { mois: 'Mar 2025', DG: 87, DOL: 89, 'DG/SSE': 92 },
]

export function PerformanceChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Évolution Performance par Responsable - 6 derniers mois</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f4" />
            <XAxis 
              dataKey="mois" 
              stroke="#6c757d"
              fontSize={12}
            />
            <YAxis 
              domain={[70, 100]}
              stroke="#6c757d"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="DG" 
              stroke="#ff6b35" 
              strokeWidth={3}
              dot={{ fill: '#ff6b35', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#ff6b35', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="DOL" 
              stroke="#0071ce"
              strokeWidth={3}
              dot={{ fill: '#0071ce', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#0071ce', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="DG/SSE" 
              stroke="#2d5016"
              strokeWidth={3}
              dot={{ fill: '#2d5016', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#2d5016', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
