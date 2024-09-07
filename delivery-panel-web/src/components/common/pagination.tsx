import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { Button } from '../ui/button'

export interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
}

export function Pagination({
  pageIndex,
  perPage,
  totalCount,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1
  return (
    <div className="flex items-center justify-between bg-secondary rounded-lg">
      <span className="text-sm text-muted-foreground">
        Total of {totalCount} item(s).
      </span>

      <div className="flex items-center gap-4 lg:gap-8">
        <div className="text-sm">
          Page {pageIndex + 1} of {pages}
        </div>
        <div>
          <Button variant="outline" className="w-8 h-8 p-0 bg-secondary">
            <ChevronsLeft className="w-4 h-4" />
            <span className="sr-only">First page</span>
          </Button>

          <Button variant="outline" className="w-8 h-8 p-0 bg-secondary">
            <ChevronLeft className="w-4 h-4" />
            <span className="sr-only">Previous page</span>
          </Button>

          <Button variant="outline" className="w-8 h-8 p-0 bg-secondary">
            <ChevronRight className="w-4 h-4" />
            <span className="sr-only">Next page</span>
          </Button>

          <Button variant="outline" className="w-8 h-8 p-0 bg-secondary">
            <ChevronsRight className="w-4 h-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
