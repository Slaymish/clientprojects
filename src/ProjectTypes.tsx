type ProjectStatus = 'planned' | 'in_progress' | 'on_hold' | 'completed';
interface Project {
  id: string;
  name: string;
  clientName: string;
  status: ProjectStatus;
  description: string;
  startDate: string; // ISO date string
}

export type { Project, ProjectStatus };