function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex">
        {/* Sidenav  */}
        <div>
          <div className="border-r w-[300px] h-screen">
            <div className="flex justify-center items-center p-5 border-b">
              <div className="bg-slate-300 rounded-full w-[150px] h-[150px]"></div>
            </div>
            <div>
              <div className="px-5 py-3 border-b">
                <p className="font-medium">Transactions</p>
              </div>
              <div className="px-5 py-3 border-b">
                <p className="font-medium">EUF Bot Config</p>
              </div>
            </div>
          </div>
        </div>
        {/* Right Component */}
        <div className="w-full">
          {/* navbar */}
          <div className="flex justify-end items-center px-5 border-b w-full h-[70px]">
            <div className="bg-slate-300 rounded-full w-[40px] h-[40px]"></div>
          </div>
          <div className="bg-blue-50 p-5 h-[calc(100vh-70px)]">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default MainLayout