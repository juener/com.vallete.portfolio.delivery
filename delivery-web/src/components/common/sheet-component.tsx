import React, { ReactNode } from 'react'
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
  sharedScreen?: ReactNode
  footer: React.ReactNode
}

export function SheetComponent({
  trigger,
  title,
  description,
  body,
  sharedScreen,
  footer,
}: SheetComponentProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-full h-full flex flex-row" side="top">
        <div className="hidden lg:block w-2/3">{sharedScreen}</div>
        <div className="flex flex-col w-full lg:w-1/3 h-full justify-between">
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
