import { fetchApi } from '@/lib/fetchAPI'
import { useQuery } from '@tanstack/react-query'

export const GetPorts = () => {
  return useQuery({ queryKey: ['ports'], queryFn: async ()=>{
    return await fetchApi('/ports')
  }})
}