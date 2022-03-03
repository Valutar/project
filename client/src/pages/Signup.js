import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function Signup(){

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);


    const navigate = useNavigate()


    const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { name, surname, email, password }
		axios.post('/api/auth/signup', requestBody)
			.then(response => {
				navigate('/login')
			})
			.catch(err => {
				const errorDescription = err.response.data.message
				setErrorMessage(errorDescription)
			})
    }
    
    const handleName = e => setName(e.target.value)
    const handleSurname = e => setSurname(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)



    return (
        <>
        <h1>Signup Page</h1>
        <form onSubmit={handleSubmit}> 
            <label htmlFor='name'>Name: </label>
            <input 
                type='text'
                value={name}
                onChange={handleName}
            />
            <label htmlFor='surname'>Surname: </label>
            <input 
                type='text'
                value={surname}
                onChange={handleSurname}
            />
            <label htmlFor='email'>Email: </label>
            <input 
                type='text'
                value={email}
                onChange={handleEmail}
            />
            <label htmlFor='password'>Password: </label>
            <input 
                type='text'
                value={password}
                onChange={handlePassword}
            />
            <button type='submit'> Signup</button>
        </form>

        {errorMessage && <h5>{errorMessage}</h5>}

        <h3>Already an Account</h3>
        <Link to='/login'>Login </Link>
        </>
    )
}