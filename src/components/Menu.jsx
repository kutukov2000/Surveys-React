import React from 'react'
import { Link } from 'react-router-dom'
import '../components/Styles/Menu.css'

export default function Menu() {
    return (
        <nav className='MenuList'>
            <ul>
                <li>
                    <Link to="/">Surveys</Link>
                </li>
            </ul>
        </nav>
    )
}