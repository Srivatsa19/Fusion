import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
export default function Header() {
    const { user } = useContext(UserContext);
    return (
        <header className="p-5 flex justify-between">
            {/* items center brings the center at exactly the middle to the logo */}
            <Link to={"/"} className="flex items-center gap-0.7">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                </svg>
                <span className='font-bold text-xl'>Fusion</span>
            </Link>
            <div className='flex border border-gray-300 rounded-full py-2 px-5 shadow-md shadow-gray-300'>
                <div>Anywhere</div>
                <div className='border border-l border-gray-300 mx-4'></div>
                <div>Any week</div>
                <div className='border border-l border-gray-300 mx-4'></div>
                <div>Add guests</div>
                <button className='mx-2 bg-primary rounded-full text-white p-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>
            <Link to={user ? '/account' : "/login"} className="flex items-center border border-gray-300 rounded-full py-2 px-3">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
                <div className="ml-2 bg-gray-500 text-white rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                </div>
                {!!user && (
                    <div className='flex items-center font-mono pl-2 font-bold text-lg'>
                        {user.name}
                    </div>
                )}
            </Link>
        </header>
    )
}
