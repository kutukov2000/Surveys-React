import React from 'react'
import Account from './Account'
import Register from './Register'
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

export default function Header() {
    return (
        <Navbar>
            <NavbarBrand>
                <Link to="/">
                    <p className="fw-bolder text-uppercase fs-5">Surveys</p>
                </Link>
            </NavbarBrand>
            <NavbarContent justify="end" className='gap-2'>
                <NavbarItem>
                    <Account />
                </NavbarItem>
                <NavbarItem>
                    <Register />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}