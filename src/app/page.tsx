'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useSetAuthToken } from "../hooks/useAuthToken";
import { useState } from "react";
import { fetchApi } from "@/lib/fetchAPI";

export default function Home() {
  const setToken = useSetAuthToken()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {
    const res = await fetchApi('/auth/login', {
      method: 'POST', body: JSON.stringify({
        username,
        password
      })
    }) as { accessToken: string }
    setToken(res?.accessToken)
    if (res?.accessToken) {
      window.location.href = "/ports";
    }
  }

  return (
    <div className="flex justify-center items-center bg-blue-50 w-full h-screen">
      <div className="flex flex-col items-center gap-4 bg-white shadow p-10 rounded-lg w-[500px] card">
        <h1 className="font-bold text-[32px]">Login to Dashboard</h1>
        <div className="flex flex-col gap-2 w-full">
          <div className="items-center gap-3 grid w-full">
            <Label htmlFor="username">Username</Label>
            <Input type="username" id="username" placeholder="Username" onChange={(e) => {
              setUsername(e.target.value)
            }} />
          </div>
          <div className="items-center gap-3 grid w-full">
            <div className="flex justify-between items-center">
              <Label htmlFor="email">Password</Label>
              <Link href="#" className="text-[14px]">Forgot Password?</Link>
            </div>
            <Input type="password" id="password" placeholder="Password" onChange={(e) => {
              setPassword(e.target.value)
            }} />
          </div>
          {/* <Link href={'/transactions'}> */}
          <Button className="w-full" onClick={login}>Login</Button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}
