import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import AccountNav from './AccountNav';
import Header from './Header';

export default function PlacesPage() {

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data);
        })
    }, [])

    return (
        <>
            <Header />
            <AccountNav />
            <div className='text-center'>
                <Link className='inline-flex bg-primary text-white px-4 py-2 rounded-full' to={"/account/places/new"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
            </div>
            <div className='mt-4'>
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/' + place._id} className='cursor-pointer flex gap-4 bg-gray-100 rounded-2xl p-4 m-4'>
                        <div className=" flex w-40 h-32 bg-gray-300 shrink-0 rounded-md">
                            {place.photos.length > 0 && (
                                <img className='object-cover rounded-md' src={"http://localhost:4000/uploads/" + place.photos[0]} alt="" />
                            )}
                        </div>
                        <div className='grow shrink-0'>
                            <h2 className='text-xl'>{place.title}</h2>
                            <p className='text-sm mt-2'>{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}
