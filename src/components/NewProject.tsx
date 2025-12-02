import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Project as ProjectType } from '../ProjectTypes';
import type { ProjectStatus } from '../ProjectTypes';

export default function NewProject() {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const projectData: ProjectType = {
            id: '', // ID will be assigned by the backend
            name: formData.get('name') as string,
            clientName: formData.get('clientName') as string,
            status: formData.get('status') as ProjectStatus,
            description: formData.get('description') as string,
            startDate: formData.get('startDate') as string,
        };



        try {
            const response = await fetch(`${apiUrl}/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            console.log('Response status:', response.status);
            console.log('Sending project data:', projectData);

            if (response.ok) {
                navigate('/projects');
            } else {
                console.error('Failed to create project');
            }
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <div>
            <h2>Create New Project</h2>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" id="name" required />
                <br />
                <label>Client Name</label>
                <input type="text" name="clientName" id="clientName" required />
                <br />
                <label>Status</label>
                <select name="status" id="status" required>
                    <option value="planned">Planned</option>
                    <option value="in_progress">In Progress</option>
                    <option value="on_hold">On Hold</option>
                    <option value="completed">Completed</option>
                </select>
                <br />
                <label>Description</label>
                <textarea name="description" id="description" required></textarea>
                <br />
                <label>Start Date</label>
                <input type="date" name="startDate" id="startDate" required />
                <br />
                <button type="submit">Create Project</button>
            </form>
            <Link to="/projects">Cancel</Link>
        </div>
    );
}
