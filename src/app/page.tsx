'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useSetAuthToken } from "@/hooks/useAuthToken";
import { useState } from "react";
import { fetchApi } from "@/lib/fetchAPI";
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader } from "lucide-react";

export default function Login() {
  const setToken = useSetAuthToken()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const login = async (e: React.FormEvent) => {
    setIsLoading(true)
    e.preventDefault()
    try {
      const res = await fetchApi('/auth/login', {
        method: 'POST', body: JSON.stringify({
          username,
          password
        })
      }) as { accessToken: string }
      setError(false)
      setToken(res?.accessToken)
      if (res?.accessToken) {
        window.location.href = "/ports";
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setError(true)
      setIsLoading(false)
    }

  }

  return (
    <>

      <div className="flex justify-center items-center bg-blue-50 w-full h-screen">
        <div className="flex flex-col items-center gap-4 bg-white shadow p-10 rounded-lg w-[500px] card">
          <h1 className="font-bold text-[32px]">Login to Dashboard</h1>
          <form onSubmit={login} className="flex flex-col gap-2 w-full">
            <div className="items-center gap-3 grid w-full">
              <Label htmlFor="username">Username</Label>
              <Input type="username" id="username" tabIndex={1} placeholder="Username" onChange={(e) => {
                setUsername(e.target.value)
              }} />
            </div>
            <div className="items-center gap-3 grid w-full">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-[14px]">Forgot Password?</Link>
              </div>
              <Input type="password" id="password" tabIndex={2} placeholder="Password" onChange={(e) => {
                setPassword(e.target.value)
              }} />
            </div>
            {error &&
              <Alert variant="destructive">
                <AlertCircle />
                <AlertDescription>
                  Username or password is incorrect.
                </AlertDescription>
              </Alert>}

            {/* <Link href={'/transactions'}> */}
            <Button className="w-full" onClick={login} disabled={isLoading}>
              {isLoading ? <Loader /> : 'Login'}</Button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </>

  );
}