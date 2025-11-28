import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../ProjectTypes';


export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/projects')
        .then(response => response.json()) // convert to json
        .then(data => setProjects(data))
        .catch(error => {
            console.error('Error fetching projects:', error);
            setProjects([]); // Fallback to empty array on error
        });
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project: Project) => (
            <li key={project.id}>
              <Link to={`/projects/${project.id}`}>
                {project.name} ({project.clientName}) - {project.status}
              </Link>
            </li>
            ))}
      </ul>
      <Link to="/projects/new">Create New Project</Link>
    </div>
  );
}
