import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../ProjectTypes';


export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${apiUrl}/projects`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, [apiUrl]);

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.length === 0 && <li>No projects found.</li>}
        {projects.map(project => (
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
