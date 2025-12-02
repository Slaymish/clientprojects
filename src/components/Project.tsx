import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Project as ProjectType } from '../ProjectTypes';


export default function Project() {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<ProjectType | null>(null);
    const [count,setCount] = useState(0);

    function handleClick(){
      setCount(count+1);
    }

    useEffect(() => {
        if (!id) return;

        const controller = new AbortController();
        const fetchProject = async () => {
            const apiUrl = process.env.REACT_APP_API_URL;

            try {
                const response = await fetch(`${apiUrl}/projects/${id}`, { signal: controller.signal });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (!data) {
                    throw new Error('No data found');
                }
                setProject(data);
            } catch (error) {
                if (error instanceof DOMException && error.name === 'AbortError') {
                    // request was aborted, ignore
                    return;
                }
                console.error('Error fetching project:', error);
                setProject(null); // Fallback to null on error
            }
        };

        fetchProject();

        return () => {
            controller.abort();
        };
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
          <p><strong>Count:</strong>{ count }</p>
          <button onClick={handleClick}>Click!</button>
        </div>
      ) : (
        <p>Loading project details...</p>
      )}
      <Link to="/projects">Back to Projects</Link>
    </div>
  );
}
