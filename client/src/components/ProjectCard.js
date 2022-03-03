import React from 'react';
import {Link} from 'react-router-dom';

export default function ProjectCard({title,description, _id}){
    return (
        <div> 
             <Link to={`/projects/${_id}`}>
                 <h3>{title}</h3>
             </Link>
        </div>
    )
}