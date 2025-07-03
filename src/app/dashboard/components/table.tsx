import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { EllipsisVertical } from "lucide-react"

const transactions = [
  {
    transactionId: "TRANS001",
    phoneNumber: "639304657862",
    platform: 'whatsapp',
    paymentType: 'EUF Payment',
    destination: "Sabang Beach",
    amount: "250.00",
    createdAt: "06-02-2025 10:00AM",
    status: 'Paid'
  },
  {
    transactionId: "TRANS002",
    phoneNumber: "639304657862",
    platform: 'telegram',
    paymentType: 'Water Bill Payment',
    destination: "N/A",
    amount: "500.00",
    createdAt: "06-02-2025 10:00AM",
    status: 'Paid'
  },
]

const getPlatform = (type: string) =>{
  return (
    <p className={cn(type==='telegram' ? 'text-[#24A1DE]' : 'text-[#25d366]', 'font-semibold')}>{type}</p>
  )
}
export function TransactionLogsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction #</TableHead>
          <TableHead>Phone #</TableHead>
          <TableHead>Platform</TableHead>
          <TableHead>Payment Type</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Amount(PHP)</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{transaction.transactionId}</TableCell>
            <TableCell>{transaction.phoneNumber}</TableCell>
            <TableCell className="capitalize">{getPlatform(transaction.platform)}</TableCell>
            <TableCell className="capitalize">{transaction.paymentType}</TableCell>
            <TableCell>{transaction.destination}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>{transaction.createdAt}</TableCell>
            <TableCell>{transaction.status}</TableCell>
            <TableCell className="text-right"><EllipsisVertical /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
