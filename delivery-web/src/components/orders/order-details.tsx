import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function OrderDetails() {
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order 123oaijdf12</DialogTitle>
          <DialogDescription>Order description</DialogDescription>
        </DialogHeader>
        <div className="p-2 bg-red-500">something</div>
      </DialogContent>
    </>
  )
}
