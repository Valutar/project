import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';



export default function ProjectDetals(){

    const {id} = useParams()

    const [project,setProject] = useState (null);

    useEffect(() => {
        axios.get(`/api/projects/${id}`)
        .then(response =>{
            console.log(response)
            setProject(response.data)
        })
        .catch(err => console.log(err))
    }, [])


    return (
        <>
            {project === null ? <div>Loading... </div> : 
            <>
                <h1>Projectdetails</h1>
                <h3>{project.title}</h3>
                <h4>{project.description}</h4>
                <Link to={`/projects/edit/${project._id}`}>
                <button> Edit Project </button>
                </Link>

            </>
        }</>
    )
}