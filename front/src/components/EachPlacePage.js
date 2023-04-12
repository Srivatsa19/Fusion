import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header';
import axios from 'axios';
import BookingWidget from './BookingWidget';
import EachPlacePageGallery from './EachPlacePageGallery';

export default function EachPlacePage() {

    const [place, setPlace] = useState(null);

    const { id } = useParams();
    useEffect(() => {
        if (!id) {
            return
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data)
        })
    }, [id])

    if (!place) return ''



    return (
        <div className='bg-gray-100'>
            <Header />
            <div className='mt-4 bg-gray-100 -mx-8 pt-8 px-8 ml-8'>
                <h1 className='text-3xl'>{place.title}</h1>
                <a target='_blank' rel='noreferrer' className='flex my-3 block font-semibold underline' href={'https://maps.google.com/?q=' + place.address}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {place.address}</a>
                <EachPlacePageGallery place={place} />
                <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr] mr-2 mt-8">
                    <div>
                        <div className="mb-4">
                            <h2 className='font-semibold text-2xl'>Description</h2>
                            {place.description}
                        </div>
                        Check-in : {place.checkIn}<br />
                        Check-out : {place.checkOut}<br />
                        Max number of guests : {place.maxGuests}
                    </div>
                    <div>
                        <BookingWidget place={place} />
                    </div>
                </div>
                <div className="bg-white mt-4 -mx-16 px-16 py-8 border-t">
                    <div>
                        <h2 className='font-semibold text-2xl'>Extra Info</h2>
                    </div>
                    <div className="mt-1 mb-4 text-sm text-gray-700 leading-4">
                        {place.extraInfo}
                    </div>
                </div>
            </div>
        </div>
    )
}
