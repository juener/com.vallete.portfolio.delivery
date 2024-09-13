import { BestSellersChart } from '@/components/dashboard/best-sellers-chart'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { TotalRevenueCard } from '@/components/dashboard/total-revenue-card'
import { Helmet } from 'react-helmet-async'

export function Dashboard() {
  return (
    <div className="p-2 gap-3 flex flex-col">
      <Helmet title="Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <TotalRevenueCard />
        <TotalRevenueCard />
        <TotalRevenueCard />
        <TotalRevenueCard />
        <TotalRevenueCard />
        <TotalRevenueCard />
        <TotalRevenueCard />
      </div>
      <div className="grid grid-cols-12 gap-3">
        <RevenueChart />
        <BestSellersChart />
        <BestSellersChart />
        <BestSellersChart />
        <RevenueChart />
        <BestSellersChart />
        <BestSellersChart />
        <BestSellersChart />
        <RevenueChart />
        <RevenueChart />
        <RevenueChart />
      </div>
    </div>
  )
}
