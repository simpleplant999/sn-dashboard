'use client'
import { Bot, BotIcon, ListCheckIcon, PowerOff, Sailboat } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRemoveAuthToken } from "@/hooks/useAuthToken"
import { useRouter } from "next/navigation"


function MainLayout({ children }: { children: React.ReactNode }) {
  const removeAuthToken = useRemoveAuthToken()
  const router = useRouter()

  const handleLogout = () => {
    removeAuthToken()
    router.push("/")
  }
  // const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null
  // useEffect(() => {
  //   if (!token) {
  //     router.replace("/login")
  //   }
  // }, [router, token])


  // if (!token) {
  //   return null
  // }
  return (
    <>
      <div className="flex">
        {/* Sidenav  */}
        <div>
          <div className="border-r w-[300px] h-screen">
            <div className="flex justify-center items-center p-5 border-b">
              <div className="flex justify-center items-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full w-[150px] h-[150px]">
                <Bot className="w-[80px] h-[80px] text-white" />
              </div>
            </div>
            <div>
              <Link href="/transactions" >
                <div className="flex items-center gap-2 px-5 py-3 border-b cursor-pointer">
                  <ListCheckIcon />
                  <p className="font-medium">Transactions</p>
                </div>
              </Link>
              <div className="flex items-center gap-2 px-5 py-3 border-b cursor-pointer">
                <BotIcon />
                <p className="font-medium">EUF Bot Config</p>
              </div>
              <Link href="/ports" >
                <div className="flex items-center gap-2 px-5 py-3 border-b cursor-pointer">
                  <Sailboat />
                  <p className="font-medium">Ports</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* Right Component */}
        <div className="w-full">
          {/* navbar */}
          <div className="flex justify-end items-center px-5 border-b w-full h-[70px]">

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex justify-center items-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full w-[40px] h-[40px] cursor-pointer">
                  <Bot className="w-[30px] h-[30px] text-white" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <div className="flex items-center gap-2">
                    <PowerOff className="" /> Logout
                  </div>
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="bg-blue-50 p-5 h-[calc(100vh-70px)]">
            {children}
          </div>
        </div>
      </div >
    </>
  )
}

export default MainLayout