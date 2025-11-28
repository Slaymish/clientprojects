import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Project as ProjectType } from '../ProjectTypes';


export default function Project() {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<ProjectType | null>(null);

    useEffect(() => {
        if (!id) return;
        
        fetch(`http://localhost:3001/projects/${id}`)
        .then(response => response.json()) // convert to json
        .then(data => setProject(data))
        .catch(error => {
            console.error('Error fetching project:', error);
            setProject(null); // Fallback to null on error
        });
  }, [id]);

  return (
    <div>
      {project ? (
        <div>
          <h2>{project.name}</h2>
          <p><strong>Client:</strong> {project.clientName}</p>
          <p><strong>Status:</strong> {project.status}</p>
          <p><strong>Description:</strong> {project.description}</p>
          <p><strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Loading project details...</p>
      )}
      <Link to="/projects">Back to Projects</Link>
    </div>
  );
}
