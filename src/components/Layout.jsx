import React from 'react'
import { Outlet } from 'react-router'
import Nav from './nav'
import Footer from './Footer'

const Layout = () => {
    return (
        <>
            <Nav />
            <Outlet />
            <Footer/>
        </>
    )
}

export default Layout
