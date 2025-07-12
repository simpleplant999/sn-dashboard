export function formatText(string: string | null | undefined): string {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function getStatus(value: string | null | undefined): string {
  if (!value) return 'unknown'
  
  const lowerValue = value.toLowerCase()
  
  switch (lowerValue) {
    case 'success':
    case 'completed':
    case 'paid':
      return 'success'
    case 'pending':
    case 'processing':
    case 'waiting':
      return 'pending'
    case 'canceled':
    case 'cancelled':
    case 'failed':
    case 'rejected':
      return 'canceled'
    default:
      return lowerValue
  }
}