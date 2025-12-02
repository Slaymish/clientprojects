// import express
import express from 'express';
import bodyParser from 'body-parser';
import { Project as ProjectType } from 'src/ProjectTypes.tsx';

const app = express();
app.use(bodyParser.json());

let projects: ProjectType[] = [];

app.get('/projects', (req, res) => {
  res.json(projects);
});

app.post('/projects', (req, res) => {
  const newProject: ProjectType = req.body;
  newProject.id = (projects.length + 1).toString();
  projects.push(newProject);
  res.status(201).json(newProject);
});

app.get('/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).send('Project not found');
  }
});

const PORT = process.env.API_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
