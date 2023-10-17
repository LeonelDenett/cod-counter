"use client"

// Context
import { UserAuth } from '@/context/AuthContext';
// Pages
import Dashboard from './dashboard/page';
import Login from './auth/login/page';

const PrivatePage = () => {
    const { user } = UserAuth()

    return user ? <Dashboard/> : <Login/>
}

  export default PrivatePage;