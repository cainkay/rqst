import * as React from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css";
import { cn } from "@/lib/utils"

function Calendar({
  className,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
    className={cn("p-3 text-white", className)}
    classNames={{
      range_middle: "bg-bright-blue/30 rounded-full",
      range_end: "bg-bright-blue/70 rounded-full",
      range_start: "bg-bright-blue/70 rounded-full",
    
    }}
    captionLayout="dropdown"
    startMonth={new Date(2025, 0)}
    defaultMonth={new Date()}
    endMonth={new Date()}
      {...props}
    />
  )
}

export { Calendar }
