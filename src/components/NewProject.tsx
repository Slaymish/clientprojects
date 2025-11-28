import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function NewProject() {
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const projectData = {
            name: formData.get('name'),
            clientName: formData.get('clientName'),
            status: formData.get('status'),
            description: formData.get('description'),
            startDate: formData.get('startDate'),
        };

        try {
            const response = await fetch('http://localhost:3001/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

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
                <input type="text" name="name" required />
                <br />
                <label>Client Name</label>
                <input type="text" name="clientName" required />
                <br />
                <label>Status</label>
                <select name="status" required>
                    <option value="planned">Planned</option>
                    <option value="in_progress">In Progress</option>
                    <option value="on_hold">On Hold</option>
                    <option value="completed">Completed</option>
                </select>
                <br />
                <label>Description</label>
                <textarea name="description" required></textarea>
                <br />
                <label>Start Date</label>
                <input type="date" name="startDate" required />
                <br />
                <button type="submit">Create Project</button>
            </form>
            <Link to="/projects">Cancel</Link>
        </div>
    );
}
