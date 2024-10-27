'use client'

import { useGlobalContext } from '@/app/Context/store';
import { useSearchParams } from 'next/navigation';

import React, { useEffect } from 'react'

const Dashboard = () => {
  
  const { setToken} = useGlobalContext();
  const params = useSearchParams();
  var token = params.get('customToken')!;
  console.log(token)
  setToken(token);

 

  return (
    <div><h2>dashboard</h2></div>
  )
}

export default Dashboard