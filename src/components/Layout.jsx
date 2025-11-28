import React from 'react'
import { Outlet } from 'react-router'
import Nav from './Nav'
import Footer from './Footer'

const Layout = () => {
    return (
        <>

            <Nav />
            <div className='mb-5'> <Outlet /></div>
            
            <Footer />

        </>
    )
}

export default Layout
