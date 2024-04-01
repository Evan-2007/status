'use client'

import { Loader2 } from 'lucide-react'
import React, {useEffect, useState} from 'react';

type Status = {
  link_state: string
  services: any[]
}




export default function Page() {
  const [status, setStatus] = useState<Status> ({} as Status)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchStatus()
  }, [])

  async function fetchStatus() {
    const res = await fetch('https://api.evanc.dev/home/status')
    if (res.status !== 200) {
      setError(true)
      setLoading(false)
      return
    }
    setLoading(false)
    const data = await res.json()
    setStatus(data)
  }

  if (loading) {
    return (
      <div className='flex justify-center align-middle items-center h-screen'>
        <Loader2 size={100} className='animate-spin' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex justify-center align-middle items-center h-screen text-xl'>
        <Dot color='red'/>
        <p>Error fetching status</p>
      </div>
    )
  }

  return (
    <div className='flex justify-center align-middle items-center h-screen text-2xl w-screen'>
      <div className='w-4/12 border-border border rounded-md'>
        <div className=' h-14 bg-secondary flex items-center'>
          {status.link_state === 'ok' ? (
            <div className='flex items-center justify-center align-middle'>
              <Dot color='green'/>
              <p>Link is up</p>
            </div>
          ) : (
            <div className='flex items-center'>
              <Dot color='red'/>
              <p>Link is down</p>
            </div>
          )}
        </div>
        {status.services && status.services.map((service: any) => (
            <div className='flex items-center h-10 bg-primary border-t border-border'>
              <Dot color={service.state === 'ok' ? 'green' : 'red'}/>
              <p>{service.name}</p>
            </div>
          ))}
      </div>
    </div>
  )

}

export function Dot({color}: {color: string}) {
  if (color === 'green') {
    return (
      <div className='w-4 h-4 bg-green-500 rounded-full mr-2'/>
    )
  }
  return (
    <div className='w-4 h-4 bg-red-500 rounded-full mr-2'/>
  )
}