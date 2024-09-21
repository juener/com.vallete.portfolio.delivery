import { getOrdersApi } from '@/api/get-orders'
import { FieldComponent } from '@/components/common/field-component'
import { Pagination } from '@/components/common/pagination'
import { SheetComponent } from '@/components/common/sheet-component'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Label } from '@radix-ui/react-label'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, Search, SearchIcon, X } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export function Orders() {
  const { data: ordersList } = useQuery({
    queryKey: ['orders-list'],
    queryFn: getOrdersApi,
  })

  return (
    <div className="flex flex-col">
      <Helmet title="Orders" />
      <form className="flex flex-row items-center gap-2 bg-secondary p-4 rounded-lg">
        <Input placeholder="Order ID" className="w-auto h-8" />
        <Input placeholder="Customer name" className="w-[320px] h-8" />
        <Input placeholder="Customer name" className="w-full h-8" />
        <Select>
          <SelectTrigger className="w-[320px] h-8">
            <SelectValue defaultValue="all" placeholder="All status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filter by Status</SelectLabel>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="delivering">Delivering</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button type="submit">
          <SearchIcon className="mr-2 w-3 h-3" />
          Filter
        </Button>
        <Button variant="outline" type="button">
          <X className="mr-2 w-3 h-3" />
          Clear
        </Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[5%]"></TableHead>
            <TableHead className="w-[10%]">ID</TableHead>
            <TableHead className="w-[15%]">Ordered</TableHead>
            <TableHead className="w-[15%]">Status</TableHead>
            <TableHead className="w-full">Customer</TableHead>
            <TableHead className="w-[10%]">Total</TableHead>
            <TableHead className="w-[10%]" />
            <TableHead className="w-[10%]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersList?.orders.map((order) => {
            return (
              <TableRow className="p-0 truncate" key={order.id}>
                <TableCell>
                  <SheetComponent
                    trigger={
                      <Button variant="outline">
                        <Search className="w-3 h-3" />
                        <span className="sr-only">Order details</span>
                      </Button>
                    }
                    title={'Order details'}
                    description="Check the general details of the order and its items."
                    secondaryDiv={
                      order?.items.length !== 0 ? (
                        <Table className="table-fixed bg-muted rounded-lg text-foreground">
                          <TableHeader>
                            <TableRow className="bg-primary text-secondary">
                              <TableHead>Name</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.items.map((item) => (
                              <>
                                <TableRow>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell>{item.quantity}</TableCell>
                                  <TableCell>${item.price}</TableCell>
                                  <TableCell>
                                    $
                                    {Math.round(
                                      item.quantity * item.price * 100,
                                    ) / 100}
                                  </TableCell>
                                </TableRow>
                                {item.obs ? (
                                  <TableRow>
                                    <TableCell
                                      colSpan={4}
                                      className="text-right bg-background pt-0 pb-8 font-extralight text-foreground text-xs italic"
                                    >
                                      {item.obs}
                                    </TableCell>
                                  </TableRow>
                                ) : undefined}
                              </>
                            ))}
                            <TableRow className="bg-primary text-secondary">
                              <TableCell colSpan={3} className="text-right">
                                Total Items:
                              </TableCell>
                              <TableCell>${order.totalItems}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      ) : (
                        <span className="font-light italic">
                          No items have been added to this order.
                        </span>
                      )
                    }
                    primaryDiv={
                      <div className="gap-4">
                        <div className="bg-muted my-4 p-4 rounded-lg">
                          <h2 className="text-xl">General details:</h2>
                          <FieldComponent
                            id="name"
                            label="Name"
                            value={order.id}
                          />
                          <FieldComponent
                            id="status"
                            label="Status"
                            value={order.status}
                          />
                          <FieldComponent
                            id="total"
                            label="Total"
                            value={order.total.toString()}
                          />
                        </div>
                        <div className="bg-muted my-4 p-4 rounded-lg">
                          <h2 className="text-xl">Customer details:</h2>
                          <FieldComponent
                            id="customerName"
                            label="Name"
                            value={order.customer.name}
                          />
                          <FieldComponent
                            id="phoneNumber"
                            label="Phone number"
                            value={order.customer.phoneNumber}
                          />
                          <FieldComponent
                            id="address"
                            label="Address"
                            value={`${order.customer.address.street}, ${order.customer.address.number}`}
                          />
                          <FieldComponent
                            id="complement"
                            label="Complement"
                            value={order.customer.address?.complement}
                          />
                          <FieldComponent
                            id="reference"
                            label="Reference"
                            value={order.customer.address?.reference}
                          />
                          <FieldComponent
                            id="neighborhood"
                            label="Neighborhood"
                            value={order.customer.address?.neighborhood}
                          />
                          <FieldComponent
                            id="city"
                            label="City"
                            value={order.customer.address?.city}
                          />
                        </div>
                        <div className="bg-muted my-4 p-4 rounded-lg">
                          <h2 className="text-xl">Totals:</h2>
                          <FieldComponent
                            id="name"
                            label="Name"
                            value={order.id}
                          />
                          <FieldComponent
                            id="status"
                            label="Status"
                            value={order.status}
                          />
                          <FieldComponent
                            id="total"
                            label="Total"
                            value={order.total.toString()}
                          />
                        </div>
                      </div>
                    }
                    footer={
                      <span className="font-thin text-sm italic">
                        {order.restaurant?.title}
                      </span>
                    }
                  />
                </TableCell>
                <TableCell className="font-mono">
                  {order.id.split('-')[4]}
                </TableCell>
                <TableCell>20 minutes ago</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-500 rounded-full w-2 h-2" />
                    <span>{order.status}</span>
                  </div>
                </TableCell>
                <TableCell className="truncate">
                  {order.customer.name}
                </TableCell>
                <TableCell>${order.total}</TableCell>
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
