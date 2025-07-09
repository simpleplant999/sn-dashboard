'use client'
import { Button } from "@/components/ui/button"
import MainLayout from "@/app/main"
import { PortsTable } from "./components/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchApi } from "@/lib/fetchAPI"

type Port = {
  id: string
  name: string
  address: string
  hardcode: string
  long_lat: string
  created: string
  created_by: string
  updated: string
  updated_by: string
  price: string
}

function Ports() {

  const { data } = useQuery<Port[]>({
    queryKey: ['ports'],
    queryFn: async () => await fetchApi<Port[]>('/ports', { auth: true }),
  })

  const [portName, setPortName] = useState("")
  const [address, setAddress] = useState("")
  const [price, setPrice] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [editingPort, setEditingPort] = useState<Port | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean, portId: string | null }>({ isOpen: false, portId: null })

  const queryClient = useQueryClient()

  // Add a new port with all required fields
  const addPort = async (portName: string, address: string, price: string) => {
    const newPort: Omit<Port, 'id'> = {
      name: portName,
      address: address,
      hardcode: portName,     // Temporarily store price in hardc3ode
      long_lat: 'test',
      created: new Date().toISOString(),
      created_by: 'user',
      updated: new Date().toISOString(),
      updated_by: 'user',
      price: price
    };
    console.log(newPort)
    await fetchApi<Port>('/ports', {
      method: 'POST',
      body: JSON.stringify(newPort),
      auth: true,
    });
    // Optionally, you can refetch ports here or optimistically update
    // For now, let's refetch using the query
    // const updatedPorts = await fetchApi<Port[]>('/ports', { auth: true });
    queryClient.invalidateQueries({ queryKey: ['ports'] });
  };

  const handleSave = async () => {
    if (portName && address) {
      if (editingPort) {
        // Update existing port
        const updatedPort: Omit<Port, 'id'> = {
          name: portName,
          address: address,
          hardcode: portName,
          long_lat: 'test',
          created: editingPort.created || new Date().toISOString(),
          created_by: editingPort.created_by || 'user',
          updated: new Date().toISOString(),
          updated_by: 'user',
          price: price
        };
        await fetchApi<Port>(`/ports/${editingPort.id}`, {
          method: 'PATCH',
          body: JSON.stringify(updatedPort),
          auth: true,
        });
        queryClient.invalidateQueries({ queryKey: ['ports'] });
        setEditingPort(null);
      } else {
        console.log('add new')
        await addPort(portName, address, price);
      }
      setPortName("")
      setAddress("")
      setIsOpen(false)
    }
  }

  const handleEdit = (port: Port) => {
    setEditingPort(port)
    setPortName(port.name)
    setAddress(port.address)
    setPrice(port.price)
    setIsOpen(true)
  }

  const handleDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, portId: id })
  }

  const confirmDelete = async () => {
    if (deleteConfirm.portId) {
      try {
        await fetchApi(`/ports/${deleteConfirm.portId}`, {
          method: 'DELETE',
          auth: true,
        });
        queryClient.invalidateQueries({ queryKey: ['ports'] });
        setDeleteConfirm({ isOpen: false, portId: null });
      } catch (error) {
        console.log(error)
        setDeleteConfirm({ isOpen: false, portId: null });
      }
    }
  }

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, portId: null })
  }

  const handleClose = () => {
    setIsOpen(false)
    setEditingPort(null)
    setPortName("")
    setAddress("")
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
                  <Label>Address</Label>
                  <Input type="text" value={address} onChange={(e) => {
                    setAddress(e.target.value)
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
                  <Button className="w-full cursor-pointer" onClick={() => {
                    console.log('test')
                    handleSave()
                  }}>Save</Button>
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
              setAddress("")
              setPrice("")
              setIsOpen(true)
            }}>Add New</Button>
          </div>
          <div className="bg-white p-5 rounded-xl">
            <PortsTable ports={data || []} onDelete={handleDelete} onEdit={handleEdit} />
          </div>
        </MainLayout>
      </div>
    </>
  )
}

export default Ports