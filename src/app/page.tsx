import { Button } from "@/components/ui/button"
import Link from "next/link"

function Homepage() {
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </>
  )
}

export default Homepage