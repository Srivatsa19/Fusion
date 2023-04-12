import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import ProfilePage from './components/ProfilePage';
import PlacesPage from './components/PlacesPage';
import PlacesFormPage from './components/PlacesFormPage';
import EachPlacePage from './components/EachPlacePage';
import BookingPage from './components/BookingPage';
import EachBooking from './components/EachBooking';

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<ProfilePage />} />
        <Route path="/account/places" element={<PlacesPage />} />
        <Route path="/account/places/new" element={<PlacesFormPage />} />
        <Route path="/account/places/:id" element={<PlacesFormPage />} />
        <Route path='/place/:id' element={<EachPlacePage />} />
        <Route path="/account/bookings" element={<BookingPage />} />
        <Route path="/account/bookings/:id" element={<EachBooking />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
