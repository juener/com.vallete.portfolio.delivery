import { BestSellersChart } from '@/components/dashboard/best-sellers-chart'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { TotalRevenueCard } from '@/components/dashboard/total-revenue-card'
import { Helmet } from 'react-helmet-async'

export function Dashboard() {
  return (
    <div className="rounded-lg h-full p-2 flex flex-col gap-4">
      <Helmet title="Dashboard" />
      <h1>Dashboard :)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <TotalRevenueCard />
        <TotalRevenueCard />
        <TotalRevenueCard />
        <TotalRevenueCard />
      </div>
      <div className="grid grid-cols-12 gap-3">
        <RevenueChart />
        <BestSellersChart />
      </div>
    </div>
  )
}
