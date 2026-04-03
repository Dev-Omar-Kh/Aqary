import React from 'react'
import Header from '../components/header/Header'
import { Outlet } from 'react-router-dom'

export default function Home() {

    return <React.Fragment>

        <section className='pt-22'>

            <Header />

            <Outlet />

        </section>

    </React.Fragment>

}
