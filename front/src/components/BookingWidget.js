import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import { UserContext } from '../UserContext'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

export default function BookingWidget({ place }) {

    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuets] = useState(1)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [redirect, setRedirect] = useState('')
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user) {
            setName(user.name)
        }
    }, [user])

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function BookPlace() {
        const response = await axios.post('/bookings', {
            checkIn, checkOut, numberOfGuests, name, phone,
            place: place._id,
            price: numberOfNights * place.price,
        })
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center mb-2">
                Price : <div className='flex items-center pl-20'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {place.price} / per night
                </div>
            </div>
            <div className="flex">
                <div className='border py-4 px-4 rounded-2xl'>
                    <label htmlFor="">Check in : </label>
                    <input value={checkIn} onChange={e => setCheckIn(e.target.value)} type="date" name="" id="" />
                </div>
                <div className='border py-4 px-4 rounded-2xl'>
                    <label htmlFor="">Check out : </label>
                    <input value={checkOut} onChange={e => setCheckOut(e.target.value)} type="date" name="" id="" />
                </div>
            </div>
            <div className='border py-4 px-4 rounded-2xl flex'>
                <label htmlFor="">Number of guests : </label>
                <input value={numberOfGuests} onChange={e => setNumberOfGuets(e.target.value)} type="number" name="" id="" />
            </div>
            {numberOfNights > 0 && (
                <>
                    <div className='border py-4 px-4 rounded-2xl flex'>
                        <label htmlFor="">Your full name : </label>
                        <input value={name} onChange={e => setName(e.target.value)} type="text" name="" id="" />
                    </div>
                    <div className='border py-4 px-4 rounded-2xl flex'>
                        <label htmlFor="">Phone number : </label>
                        <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" name="" id="" />
                    </div>
                    <div className='border py-4 px-4 rounded-2xl flex'>
                        Total price :&nbsp;&nbsp;&nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span> {numberOfNights * place.price}</span>
                    </div>
                </>
            )}
            <button onClick={BookPlace} className='mt-3 bg-primary rounded-full px-4 py-1 text-white min-w-full'>
                Book
            </button>
        </div>
    )
}
