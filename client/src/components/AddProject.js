import React, {useState} from 'react'
import axios from 'axios';

export default function AddProject(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState ('');
   
    const handleSubmit = e => {
        e.preventDefault();
        axios.post('/api/projects', { title, description })
        .then(response => {
            console.log(response)
        })
        .catch(err => console.log(err))

        setTitle('')
        setDescription('')

        props.refreshProjects()
    }

    return (
        <> 
            <h1>AddProject</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'> Title: </label>
                <input
                    id = 'title'
                    type='text'
                    value = {title}
                    onChange={e => setTitle(e.target.value) }
                />
                <label htmlFor='description'>Description: </label>
                <input
                    id = 'description'
                    type='text'
                    value = {description}
                    onChange={e => setDescription(e.target.value) }
                />
                <button type='submit'> Add this project </button>
            </form>
        </>
    )
}