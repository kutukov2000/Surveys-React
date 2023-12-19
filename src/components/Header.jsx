import React from 'react'
import Menu from './Menu'
import Account from './Account'
import Register from './Register'
export default function Header() {


    return (
        <header>
            <Menu />
            <Account />
            <Register/>
        </header>
    )
}