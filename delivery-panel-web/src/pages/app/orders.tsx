import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectItem, SelectTrigger } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { SelectContent } from '@/components/ui/select'
import { ArrowRight, Search, SearchIcon, X } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Pagination } from '@/components/common/pagination'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { OrderDetails } from '@/components/orders/order-details'

export function Orders() {
  return (
    <div className="flex flex-col m-2">
      <Helmet title="Orders" />
      <form className="flex flex-row gap-2 p-4 items-center bg-secondary rounded-lg">
        <Input placeholder="Order ID" className="h-8 w-auto" />
        <Input placeholder="Customer name" className="h-8 w-[320px]" />
        <Input placeholder="Customer name" className="h-8 w-full" />
        <Select defaultValue="all">
          <SelectTrigger className="h-8 w-[320px]"></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="delivering">Delivering</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">
          <SearchIcon className="w-3 h-3 mr-2" />
          Filter
        </Button>
        <Button variant="outline" type="button">
          <X className="w-3 h-3 mr-2" />
          Clear
        </Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]"></TableHead>
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Search className="w-3 h-3" />
                        <span className="sr-only">Order details</span>
                      </Button>
                    </DialogTrigger>
                    <OrderDetails />
                  </Dialog>
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
      <Pagination pageIndex={0} totalCount={112} perPage={20} />
    </div>
  )
}
