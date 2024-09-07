import { Card } from '@/components/card'
import { Helmet } from 'react-helmet-async'

export function Dashboard() {
  return (
    <div className="bg-red-500 rounded-lg h-full p-2 gap-3">
      <Helmet title="Dashboard" />
      <h1>Dashboard :)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}
