import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'

export default function Home() {

    const [places, setPlaces] = useState([])

    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data)
        })
    }, [])

    return (
        <>
            <Header />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 px-8 gap-6 gap-y-8">
                {places.length > 0 && places.map(place => (
                    <Link to={'/place/' + place._id}>
                        <div className='bg-gray-500 rounded-2xl flex mb-3'>
                            {place.photos?.[0] && (
                                <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt="" />
                            )}
                        </div>
                        <h2 className='font-bold'>{place.address}</h2>
                        <h3 className='text-sm text-gray-500 font-bold'>{place.title}</h3>
                        <div className='mt-1'>
                            <div className="flex items-center">
                                <span className="font-bold"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                </span>
                                <div className='font-bold'>
                                    {place.price} / per night
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </ >
    )
}

