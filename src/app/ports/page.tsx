'use client'
import { Button } from "@/components/ui/button"
import MainLayout from "../main"
import { PortsTable } from "./components/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type Port = {
  id: string
  portName: string
  price: number
  description: string
}

function Ports() {

  const [portName, setPortName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [editingPort, setEditingPort] = useState<{ id: string, portName: string, price: number, description: string } | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean, portId: string | null }>({ isOpen: false, portId: null })
  const [ports, setPorts] = useState<Port[]>([])

  useEffect(() => {
    setPorts([
      {
        id: "1",
        portName: "White Beach",
        description: "Famous white sand beach with crystal clear waters",
        price: 160.0,
      },
      {
        id: "2",
        portName: "Sabang Beach",
        description: "Popular beach known for diving and nightlife",
        price: 160.0,
      },
      {
        id: "3",
        portName: "Muelle Port",
        description: "Historic port area with scenic views",
        price: 160.0,
      },
      {
        id: "4",
        portName: "Tamaraw Falls",
        description: 'Beautiful waterfall with natural swimming pools',
        price: 160.0,
      },
      {
        id: "5",
        portName: "Puerto Galera Yacht Club",
        description: 'Exclusive yacht club with marina facilities',
        price: 160.0,
      },
    ]);
  }, []);

  const handleSave = () => {
    if (portName.trim() && description.trim() && price.trim()) {
      if (editingPort) {
        // Update existing port
        setPorts(ports.map(port =>
          port.id === editingPort.id
            ? { ...port, portName: portName.trim(), description: description.trim(), price: parseFloat(price) }
            : port
        ))
        setEditingPort(null)
      } else {
        // Add new port
        const newPort = {
          id: (ports.length + 1).toString(),
          portName: portName.trim(),
          description: description.trim(),
          price: parseFloat(price),
        }
        setPorts([...ports, newPort])
      }

      setPortName("")
      setPrice("")
      setDescription("")
      setIsOpen(false)
    }
  }

  const handleEdit = (port: { id: string, portName: string, price: number, description: string }) => {
    setEditingPort(port)
    setPortName(port.portName)
    setPrice(port.price.toString())
    setDescription(port.description)
    setIsOpen(true)
  }

  const handleDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, portId: id })
  }

  const confirmDelete = () => {
    if (deleteConfirm.portId) {
      setPorts(ports.filter(port => port.id !== deleteConfirm.portId))
      setDeleteConfirm({ isOpen: false, portId: null })
    }
  }

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, portId: null })
  }

  const handleClose = () => {
    setIsOpen(false)
    setEditingPort(null)
    setPortName("")
    setPrice("")
    setDescription("")
  }

  return (
    <>
      <div>
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingPort ? 'Edit Port' : 'Add New Port'}</DialogTitle>
              <div className="flex flex-col gap-2 mt-5 w-full">
                <div className="items-center gap-3 grid w-full">
                  <Label>Port Name</Label>
                  <Input type="text" value={portName} onChange={(e) => {
                    setPortName(e.target.value)
                  }} />
                </div>
                <div className="items-center gap-3 grid w-full">
                  <Label>Description</Label>
                  <Input type="text" value={description} onChange={(e) => {
                    setDescription(e.target.value)
                  }} />
                </div>
                <div className="items-center gap-3 grid w-full">
                  <Label>Price</Label>
                  <Input type="text" value={price} onChange={(e) => {
                    setPrice(e.target.value)
                  }} />
                </div>
                <div className="gap-2 grid grid-cols-2 mt-5">
                <Button variant="outline" className="cursor-pointer" onClick={handleClose}>Cancel</Button>
                  <Button className="w-full cursor-pointer" onClick={() => { handleSave() }}>Save</Button>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteConfirm.isOpen} onOpenChange={cancelDelete}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
              <div className="mt-5">
                <p>Are you sure you want to delete this port? This action cannot be undone.</p>
                <div className="gap-2 grid grid-cols-2 mt-5">
                  <Button variant="outline" className="cursor-pointer" onClick={cancelDelete}>Cancel</Button>
                  <Button className="bg-red-500 hover:bg-red-600 cursor-pointer" onClick={confirmDelete}>Delete</Button>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <MainLayout>
          <div className="flex justify-between items-center mb-5">
            <h1 className="font-semibold text-[32px]">Ports</h1>
            <Button className="cursor-pointer" onClick={() => {
              setEditingPort(null)
              setPortName("")
              setPrice("")
              setDescription("")
              setIsOpen(true)
            }}>Add New</Button>
          </div>
          <div className="bg-white p-5 rounded-xl">
            <PortsTable ports={ports} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        </MainLayout>
      </div>
    </>
  )
}

export default Ports