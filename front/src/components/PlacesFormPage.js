import React, { useEffect } from 'react'
import { useState } from 'react';
import Perks from './Perks';
import PhotosUploader from './PhotosUploader';
import axios from 'axios';
import Header from './Header';
import AccountNav from './AccountNav';
import { Navigate, useParams } from 'react-router-dom';

export default function PlacesFormPage() {

    const { id } = useParams();

    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [adddedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [redirect, setRedirect] = useState(false)
    const [price, setPrice] = useState(100)

    useEffect(() => {
        if (!id) {
            return
        }
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
            setPrice(data.price)
        })
    }, [id])

    async function savePlace(e) {
        e.preventDefault();

        if (id) {
            //update place
            await axios.put('/places', {
                id, title, address, adddedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            })
            setRedirect(true)
        }
        else {
            //add new place
            await axios.post('/places', {
                title, address, adddedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            })
            setRedirect(true)
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <>
            <Header />
            <AccountNav />
            <div className='ml-2'>
                <form action="" onSubmit={savePlace}>
                    <h2 className='text-2xl ml-2'>Title</h2>
                    <input type="text" name="" placeholder='title' id="" value={title} onChange={e => setTitle(e.target.value)} />
                    <h2 className='text-2xl ml-2'>Address</h2>
                    <input type="text" placeholder='address' value={address} onChange={e => setAddress(e.target.value)} />
                    <h2 className='text-2xl ml-2'>Photos</h2>
                    <PhotosUploader adddedPhotos={adddedPhotos} onchange={setAddedPhotos} />
                    <h2 className='text-2xl ml-2'>Description</h2>
                    <textarea cols="30" rows="10" value={description} onChange={e => setDescription(e.target.value)} />
                    <h2 className='text-2xl ml-2 mb-4'>Perks</h2>
                    <div className='grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-4'>
                        <Perks selected={perks} onChange={setPerks} />
                    </div>
                    <h2 className='text-2xl ml-2 mb-4 mt-4'>Extra info</h2>
                    <textarea name="" id="" cols="30" rows="5" value={extraInfo} onChange={e => setExtraInfo(e.target.value)}></textarea>
                    <h2 className='text-2xl ml-2 mb-4 mt-4'>Check-in & out times, max guests</h2>
                    <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
                        <div>
                            <h3 className='ml-2'>Check-in time</h3>
                            <input type="text" placeholder='12:00 AM/PM' value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                        </div>
                        <div>
                            <h3 className='ml-2'>Check-out time</h3>
                            <input type="text" placeholder='12:00 AM/PM' value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                        </div>
                        <div>
                            <h3 className='ml-2'>Max guests</h3>
                            <input type="number" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} />
                        </div>
                        <div>
                            <h3 className='ml-2'>Price per night</h3>
                            <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className="bg-primary my-4 text-white text-center rounded-full">
                        <button className='py-2'>Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}
