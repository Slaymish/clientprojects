# Client Projects Dash

- Created with `npx create-react-app clientprojects --template typescript`
- Uses React Router for routing

***

- API URL is configured via environment variables (`.env` file)
- Error handling is implemented for all API requests
- Form validation is included for project creation 
- Axios for HTTP requests


***

**Components:**

- `Projects.tsx`: Displays a list of projects fetched from the API.
- `NewProject.tsx`: Form for creating a new project with fields for name, client name, status, description, and start date.
- `Project.tsx`: Displays detailed information about a single project.

**Environment Variables:**

- `REACT_APP_API_URL`: Base URL for the API (e.g., `http://localhost:5000/api`)
- Ensure to create a `.env` file in the root directory with the above variable set.

**Running the Application:**

1. Install dependencies: `npm install`
2. Start the development server: `npm start`
