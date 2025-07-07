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
  name: string
  address: string
  hardcode: string
  long_lat: string
  created: string
  created_by: string
  updated: string;
  updated_by: string
}

export function PortsTable({
  ports,
  onDelete
}: {
  ports: Port[]
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
            <TableCell className="font-medium">{port.name}</TableCell>
            <TableCell>{port.address}</TableCell>
            <TableCell>{port.created_by}</TableCell>
            {/* <TableCell>{port.price}</TableCell> */}
            {/* <TableCell className="capitalize">{port.description}</TableCell> */}
            <TableCell className="flex justify-end text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVertical className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer"><div className="flex items-center gap-2"><Pen className="" /> Edit</div></DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => onDelete(port.id)}><div className="flex items-center gap-2 text-red-500"><Trash className="text-red-500" /> Delete</div></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
