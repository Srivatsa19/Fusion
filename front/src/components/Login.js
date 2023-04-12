import React, { useContext, useState } from 'react'
import Header from './Header'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext'


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const { setUser } = useContext(UserContext);

    async function LoginUser(e) {
        e.preventDefault()
        try {
            //returns a lot of stuff like data, headers etc but we will only need data
            const userInfo = await axios.post('/login', {
                email, password
            })
            // console.log(userInfo.data)
            setUser(userInfo.data)
            //withCredentials:true to accept cookies
            // alert('Login successful')
            setRedirect(true)
        }
        catch (e) {
            alert('Incorrect credentials')
        }
    }
    if (redirect)
        return <Navigate to={"/"} />
    return (
        <div>
            <Header />
            <div className='mt-28'>
                <h1 className='text-4xl text-center mb-4 font-medium'>Login</h1>
                <form action="" className=' max-w-md mx-auto' onSubmit={LoginUser}>
                    <input type="email" placeholder='Email' name="" id="" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder='password' name="" id="" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className='login'>Login</button>
                    <div className="signup mt-2 text-md text-gray-600 text-center">
                        <h2>Don't have an account, <Link className='text-blue underline' to={'/signup'}>sign up</Link></h2>
                    </div>
                </form>
            </div>
        </div>
    )
}
