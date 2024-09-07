import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowRight, Search, X } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export function Orders() {
  return (
    <>
      <Helmet title="Orders" />
      <h1>Orders</h1>
      <form className="flex flex-row gap-2 m-2 items-center">
        <Input />
        <Input />
        <Input />
        <Button>Filter</Button>
      </form>
      <Table>
        <TableCaption>A list of your orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]"></TableHead>
            <TableHead className="w-[140px]">ID</TableHead>
            <TableHead className="w-[180px]">Ordered</TableHead>
            <TableHead className="w-[140px]">Status</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="w-[100px]">Total</TableHead>
            <TableHead className="w-[40px]" />
            <TableHead className="w-[40px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 20 }).map((_, i) => {
            return (
              <TableRow key={i}>
                <TableCell>
                  <Search className="w-3 h-3" />
                  <span className="sr-only">Order details</span>
                </TableCell>
                <TableCell className="font-mono">1123n1kl23jo</TableCell>
                <TableCell>20 minutes ago</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-500" />
                    <span>Pending</span>
                  </div>
                </TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>$190.00</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <ArrowRight className="mr-2 w-3 h-3" />
                    Approve
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <X className="mr-2 w-3 h-3" />
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
