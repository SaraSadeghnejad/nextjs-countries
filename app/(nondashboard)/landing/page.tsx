"use client"

import Loader from '@/components/Loader';
import dynamic from 'next/dynamic';
import React from 'react'
const HomeContainer = dynamic(
  () => import("@/containers/home/home-container"),
  {
    loading: () => <Loader />,
  }
);
const LandingPage = () => {
  return (
    <HomeContainer/>
  )
}

export default LandingPage