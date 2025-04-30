import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
export const Navbar = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-xl"
      style={{ height: `50px` }}
    >
      <div className="flex justify-between item-center w-full py-3 px-8 bg-primary-700 text-white">
        <div>
          <h2>Countries</h2>
     </div>
        <div className='gap-4 flex'>
          <Link href="/landing">
            <Button
              variant={"outline"}
              className="text-white vorder-white bg-transparent hover:bg-white hover:text-primary-700 rounded-lg"
            >
             Home
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button
              variant={"outline"}
              className="bg-secondary-600 text-white hover:bg-white hover:text-primary-700 rounded-lg"
            >
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
