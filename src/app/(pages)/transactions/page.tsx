'use client'
import { Button } from "@/components/ui/button"
import MainLayout from "@/app/main"
import { TransactionsTable } from "./components/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState, ChangeEvent } from "react"
import { Pagination } from "@/components/ui/pagination"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchApi } from "@/lib/fetchAPI"

type Transaction = {
  id: string
  type: string
  app: string
  payment_gateway: string
  transaction_number: string
  payment_status: string
  finalAmount: string
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

type TransactionData = {
  transactions: Transaction[]
  total: number
  page: number
  limit: number
  totalPages: number
}

function Transactions() {
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [transactionTypeFilter, setTransactionTypeFilter] = useState("")

  const { data } = useQuery<TransactionData>({
    queryKey: ['transactions', currentPage, limit],
    queryFn: async () => await fetchApi<TransactionData>(`/transactions?page=${currentPage}&limit=${limit}`, { auth: true }),
  })

  // Filter transactions on the frontend
  const filteredTransactions = data?.transactions?.filter(transaction => {
    if (!transactionTypeFilter) return true // Show all if no filter
    
    if (transactionTypeFilter === 'euf') {
      return transaction.euf_port && transaction.euf_port.trim() !== ''
    }
    
    if (transactionTypeFilter === 'water_billing') {
      return transaction.water_billing_account && transaction.water_billing_account.account_number
    }
    
    return true
  }) || []
  const [isOpen, setIsOpen] = useState(false)
  const [editingPort, setEditingPort] = useState<Transaction | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean, portId: string | null }>({ isOpen: false, portId: null })

  // Add state for transaction fields
  const [type, setType] = useState("")
  const [app, setApp] = useState("")
  const [paymentGateway, setPaymentGateway] = useState("")
  const [transactionNumber, setTransactionNumber] = useState("")
  const [paymentStatus, setPaymentStatus] = useState("")
  const [paymentReferenceCode, setPaymentReferenceCode] = useState("")
  const [eufPort, setEufPort] = useState("")
  const [accountId, setAccountId] = useState("")
  const [price, setPrice] = useState("")

  const queryClient = useQueryClient()

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit)
    setCurrentPage(1) // Reset to first page when changing limit
  }

  const handleFilterChange = (filter: string) => {
    setTransactionTypeFilter(filter)
    setCurrentPage(1) // Reset to first page when filtering
  }

  // Add a new transaction with all required fields
  const addTransaction = async () => {
    const newTransaction = {
      type,
      app,
      payment_gateway: paymentGateway,
      transaction_number: transactionNumber,
      payment_status: paymentStatus,
      payment_reference_code: paymentReferenceCode,
      euf_port: eufPort,
      account_id: accountId,
      price,
    }
    await fetchApi('/transactions', {
      method: 'POST',
      body: JSON.stringify(newTransaction),
      auth: true,
    })
    queryClient.invalidateQueries({ queryKey: ['transactions'] })
  }

  const updateTransaction = async (id: string) => {
    const updatedTransaction = {
      type,
      app,
      payment_gateway: paymentGateway,
      transaction_number: transactionNumber,
      payment_status: paymentStatus,
      payment_reference_code: paymentReferenceCode,
      euf_port: eufPort,
      account_id: accountId,
      price,
    }
    await fetchApi(`/transactions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedTransaction),
      auth: true,
    })
    queryClient.invalidateQueries({ queryKey: ['transactions'] })
  }

  const handleSave = async () => {
    if (
      type && app && paymentGateway && transactionNumber && paymentStatus && paymentReferenceCode && eufPort && accountId && price
    ) {
      if (editingPort) {
        await updateTransaction(editingPort.id)
        setEditingPort(null)
      } else {
        await addTransaction()
      }
      setType("")
      setApp("")
      setPaymentGateway("")
      setTransactionNumber("")
      setPaymentStatus("")
      setPaymentReferenceCode("")
      setEufPort("")
      setAccountId("")
      setPrice("")
      setIsOpen(false)
    }
  }

  const confirmDelete = async () => {
    if (deleteConfirm.portId) {
      try {
        await fetchApi(`/transactions/${deleteConfirm.portId}`, {
          method: 'DELETE',
          auth: true,
        });
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
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
    setType("")
    setApp("")
    setPaymentGateway("")
    setTransactionNumber("")
    setPaymentStatus("")
    setPaymentReferenceCode("")
    setEufPort("")
    setAccountId("")
    setPrice("")
  }

  return (
    <>
      <div>
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingPort ? 'Edit Transaction' : 'Add New Transaction'}</DialogTitle>
              <div className="flex flex-col gap-2 mt-5 w-full">
                <div className="items-center gap-3 grid w-full">
                  <Label>Type</Label>
                  <Input type="text" value={type} onChange={(e: ChangeEvent<HTMLInputElement>) => setType(e.target.value)} />
                </div>
                <div className="items-center gap-3 grid w-full">
                  <Label>App</Label>
                  <Input type="text" value={app} onChange={(e: ChangeEvent<HTMLInputElement>) => setApp(e.target.value)} />
                </div>
                <div className="items-center gap-3 grid w-full">
                  <Label>Payment Gateway</Label>
                  <Input type="text" value={paymentGateway} onChange={(e: ChangeEvent<HTMLInputElement>) => setPaymentGateway(e.target.value)} />
                </div>
                <div className="items-center gap-3 grid w-full">
                  <Label>Transaction Number</Label>
                  <Input type="text" value={transactionNumber} onChange={(e: ChangeEvent<HTMLInputElement>) => setTransactionNumber(e.target.value)} />
                </div>
                <div className="items-center gap-3 grid w-full">
                  <Label>Payment Status</Label>
                  <Input type="text" value={paymentStatus} onChange={(e: ChangeEvent<HTMLInputElement>) => setPaymentStatus(e.target.value)} />
                </div>
                <div className="items-center gap-3 grid w-full">
                  <Label>Payment Reference Code</Label>
                  <Input type="text" value={paymentReferenceCode} onChange={(e: ChangeEvent<HTMLInputElement>) => setPaymentReferenceCode(e.target.value)} />
                </div>
                <div className="items-center gap-3 grid w-full">
                  <Label>EUF Port</Label>
                  <Input type="text" value={eufPort} onChange={(e: ChangeEvent<HTMLInputElement>) => setEufPort(e.target.value)} />
                </div>
                <div className="items-center gap-3 grid w-full">
                  <Label>Account ID</Label>
                  <Input type="text" value={accountId} onChange={(e: ChangeEvent<HTMLInputElement>) => setAccountId(e.target.value)} />
                </div>
                <div className="items-center gap-3 grid w-full">
                  <Label>Price</Label>
                  <Input type="text" value={price} onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} />
                </div>
                <div className="gap-2 grid grid-cols-2 mt-5">
                  <Button variant="outline" className="cursor-pointer" onClick={handleClose}>Cancel</Button>
                  <Button className="w-full cursor-pointer" onClick={handleSave}>Save</Button>
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
            <h1 className="font-semibold text-[32px]">Transactions</h1>
            {/* <Button className="cursor-pointer" onClick={() => {
              setEditingPort(null)
              setIsOpen(true)
            }}>Add New</Button> */}
          </div>
          <div className="bg-white p-5 rounded-xl">
            {/* Filter Buttons */}
            <div className="hidden bg-gray-50 mb-6 p-4 border rounded-lg">
              <h3 className="mb-4 font-medium text-lg">Filter by Transaction Type</h3>
              <div className="flex gap-3">
                <Button 
                  variant={transactionTypeFilter === "" ? "default" : "outline"}
                  onClick={() => handleFilterChange("")}
                >
                  All Transactions
                </Button>
                <Button 
                  variant={transactionTypeFilter === "euf" ? "default" : "outline"}
                  onClick={() => handleFilterChange("euf")}
                >
                  EUF Only
                </Button>
                <Button 
                  variant={transactionTypeFilter === "water_billing" ? "default" : "outline"}
                  onClick={() => handleFilterChange("water_billing")}
                >
                  Water Billing Only
                </Button>
              </div>
            </div>
            
            <TransactionsTable transactions={filteredTransactions} />
            {data && (
              <Pagination
                currentPage={currentPage}
                totalPages={data.totalPages}
                total={data.total}
                limit={limit}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
              />
            )}
          </div>
        </MainLayout>
      </div>
    </>
  )
}

export default Transactions