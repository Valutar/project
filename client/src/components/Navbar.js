import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'


export default function Navbar() {

    const {isLoggedIn, user} = useContext(AuthContext)

    return(
        <nav>
            <Link to='/'>
                <button>Home</button>
            </Link>
            {isLoggedIn ?
            (
                <>
                <Link to='/projects'>
                <button>Projects</button>
                </Link>
                <Link to='/home'>
                <button>Logout</button>
                </Link>
                </>
            ) : (
                <>
                <Link to='/signup'>
                <button>Signup</button>
                </Link>
                <Link to='/login'>
                <button>Login</button>
                </Link>
                </>
            )
            }
        </nav>
   )
}