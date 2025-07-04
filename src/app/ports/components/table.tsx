import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EllipsisVertical, Pen, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Port = {
  id: string
  portName: string
  price: number
  description: string
}

export function PortsTable({
  ports,
  onEdit,
  onDelete
}: {
  ports: Port[]
  onEdit: (port: Port) => void
  onDelete: (id: string) => void
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ports?.map((port: Port, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{port.portName}</TableCell>
            <TableCell>{port.price}</TableCell>
            <TableCell className="capitalize">{port.description}</TableCell>
            <TableCell className="flex justify-end text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVertical className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => onEdit(port)}><Pen className="me-1" />Edit</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => onDelete(port.id)}><div className="flex gap-1 text-red-500"><Trash className="text-red-500"/> Delete</div></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
