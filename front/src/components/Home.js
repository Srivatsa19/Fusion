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
                            <span className="font-bold">{place.price}</span> rupees per night
                        </div>
                    </Link>
                ))}
            </div>
        </ >
    )
}

