import React, { useState } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
import axios from 'axios';
export default function Singup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signupUser(e) {
    e.preventDefault();
    try {
      await axios.post('/signup', {
        name,
        email,
        password
      });
      alert('Registration successful!! you can login now')
    }
    catch (e) {
      alert('Registration failed, try again')
    }
  }

  return (
    <div>
      <Header />
      <div className='mt-28'>
        <h1 className='text-4xl text-center mb-4 font-medium'>Sign Up</h1>
        <form action="" className=' max-w-md mx-auto' onSubmit={signupUser}>
          <input type="text" placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
          <input type="email" placeholder='Email' name="" id="" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder='password' name="" id="" value={password} onChange={e => setPassword(e.target.value)} />
          <button className='login'>Signup</button>
          <div className="signup mt-2 text-md text-gray-600 text-center">
            <h2>Already a member, <Link className='text-blue underline' to={'/login'}>Login</Link></h2>
          </div>
        </form>
      </div>
    </div>
  )
}
