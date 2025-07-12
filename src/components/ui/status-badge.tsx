
import { CheckCircle, XCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    const lowerStatus = status.toLowerCase()
    
    switch (lowerStatus) {
      case 'success':
      case 'completed':
      case 'paid':
        return {
          variant: 'default' as const,
          className: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100',
          icon: <CheckCircle className="w-3 h-3" />,
          text: 'Success'
        }
      case 'pending':
      case 'processing':
      case 'waiting':
        return {
          variant: 'secondary' as const,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100',
          icon: <Clock className="w-3 h-3" />,
          text: 'Pending'
        }
      case 'canceled':
      case 'cancelled':
      case 'failed':
      case 'rejected':
        return {
          variant: 'destructive' as const,
          className: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-100',
          icon: <XCircle className="w-3 h-3" />,
          text: 'Canceled'
        }
      default:
        return {
          variant: 'outline' as const,
          className: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100',
          icon: null,
          text: status
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <Badge 
      variant={config.variant}
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium",
        config.className,
        className
      )}
    >
      {config.icon}
      {config.text}
    </Badge>
  )
} 