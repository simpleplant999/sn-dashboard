import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { formatText } from "@/lib/helpers"
import moment from 'moment'
type Transaction = {
  id: string
  type: string
  app: string
  payment_gateway: string
  transaction_number: string
  payment_status: string
  payment_reference_code: string
  euf_port: string
  account_id: string
  creator_username: string
  updater_username: string
  euf_port_name: string
  water_billing_account: {
    account_number: string
  }
  created: string
  created_by: string
  updated: string
  updated_by: string
  price: string
}

export function TransactionsTable({
  transactions,
}: {
  transactions: Transaction[]
}) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>App</TableHead>
            <TableHead>Payment Gateway</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Account Number</TableHead>
            <TableHead>Transaction Date</TableHead>
            {/* <TableHead className="text-right">Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
        {transactions?.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium capitalize">{formatText(transaction?.type)}</TableCell>
            <TableCell className="capitalize">{formatText(transaction?.app)}</TableCell>
            <TableCell className="capitalize">{formatText(transaction?.payment_gateway)}</TableCell>
            <TableCell className="capitalize">
              <StatusBadge status={transaction?.payment_status} />
            </TableCell>
            <TableCell className="capitalize">{transaction?.water_billing_account?.account_number}</TableCell>
            <TableCell className="capitalize">{moment(transaction?.created).format("lll")}</TableCell>
            {/* <TableCell className="flex justify-end text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVertical className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => onEdit(transaction)}><div className="flex items-center gap-2"><Pen className="" /> Edit</div></DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => onDelete(transaction.id)}><div className="flex items-center gap-2 text-red-500"><Trash className="text-red-500" /> Delete</div></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </>
  )
}
