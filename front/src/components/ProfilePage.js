import React, { useContext, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'
import Header from './Header'
import axios from 'axios'
import PlacesPage from './PlacesPage'
import AccountNav from './AccountNav'

export default function ProfilePage() {
    const { user, ready, setUser } = useContext(UserContext)
    const [redirect, setRedirect] = useState(null)
    let { subpage } = useParams();
    if (subpage === undefined) {
        // doing this for the profile page as the params for the profile page is null
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout')
        setRedirect('/')
        setUser(null)
    }

    if (!ready) {
        return (
            <div>Loading....</div>
        )
    }
    if (ready && !user && !redirect) {
        return (
            <Navigate to={"/login"} />
        )
    }


    if (redirect) {
        console.log(redirect)
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <Header />
            <AccountNav />
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user.name}
                    <br />
                    <button onClick={logout} className='bg-primary mt-4 max-w-lg text-white rounded-full py-1 px-4'>Logout</button>
                </div>
            )}

            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    )
}
