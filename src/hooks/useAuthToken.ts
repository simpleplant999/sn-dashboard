import { useQueryClient, useQuery } from '@tanstack/react-query'

export const useSetAuthToken = () => {
  const queryClient = useQueryClient()
  return (token: string) => {
    queryClient.setQueryData(['auth-token'], token)
    localStorage.setItem('auth-token', token)
  }
}

export const useAuthToken = () => {
  return useQuery<string | null>({
    queryKey: ['auth-token'],
    queryFn: async () => {
      return localStorage.getItem('auth-token')
    },
    initialData: () => localStorage.getItem('auth-token'),
  })
}

export const useRemoveAuthToken = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.removeQueries({ queryKey: ['auth-token'] });
    localStorage.removeItem('auth-token');
  };
}