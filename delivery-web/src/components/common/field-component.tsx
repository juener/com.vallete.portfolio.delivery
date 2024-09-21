import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface FieldComponentInteface {
  id: string
  label: string
  value: string | undefined
}

export function FieldComponent({ id, label, value }: FieldComponentInteface) {
  return (
    <div className="flex flex-row items-center">
      <Label htmlFor={id} className="w-60 font-extralight text-xs">
        {label}:
      </Label>
      <Input id={id} value={value} className="border-none font-bold" />
    </div>
  )
}
