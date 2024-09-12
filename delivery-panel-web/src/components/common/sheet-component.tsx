import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'

interface SheetComponentProps {
  trigger: React.ReactNode
  title: string
  description: string
  body?: React.ReactNode
  footer: React.ReactNode
}

export function SheetComponent({
  trigger,
  title,
  description,
  body,
  footer,
}: SheetComponentProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-[700px]">
        <div className="flex flex-col h-full justify-between">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
            {body}
          </SheetHeader>
          <SheetFooter className="">
            <SheetClose asChild>{footer}</SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}
