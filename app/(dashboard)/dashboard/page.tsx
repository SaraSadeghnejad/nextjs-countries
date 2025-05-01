
import Loader from '@/components/Loader';
import dynamic from 'next/dynamic';
import React from 'react'
const Dashboard = dynamic(() => import("@/containers/charts"), {
  loading: () => <Loader/>,
});
const DashboardPage = () => {
  return (
    <Dashboard/>
  )
}

export default DashboardPage