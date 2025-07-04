import MainLayout from "../main"
import { TransactionLogsTable } from "./components/table"

function Dashboard() {
  return (
    <>
      <div>
        <MainLayout>
          <div className="mb-5">
            <h1 className="font-semibold text-[32px]">Transaction Logs</h1>
          </div>
          <div className="bg-white p-5 rounded-xl">
            <TransactionLogsTable/>
          </div>
        </MainLayout>
      </div>
    </>
  )
}

export default Dashboard