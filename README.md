
# Task Manager Backend  

Final project for the Task Manager application. Team collaboration project.

## Overview  
This is the backend service for a task management platform, built using Node.js and Express. It provides APIs for user authentication and task management, utilizing MongoDB as the database. The project follows a modular structure, separating routes, models, controllers, middleware, and configurations to ensure maintainability and scalability.The application is designed to be deployed on cloud platforms like Render, Replit, or Railway, with environment variables used for storing sensitive information such as database connection strings and JWT secrets.

## Features  
- User authentication (JWT-based)  
- Task management (Create, Read, Update, Delete tasks)  
- Input validation  
- Secure password hashing  
- Role-based access control (RBAC)  
- Cross-Origin Resource Sharing (CORS) enabled  

## Technologies Used  
- Node.js (Express.js framework)  
- MongoDB (via Mongoose ODM)  
- JWT for authentication  
- bcryptjs for password hashing  
- Joi for input validation  
- dotenv for environment variable management  

## Installation

1. Clone the repository:
   ```sh
   git clone <https://github.com/togzhan23/backfinal>
   ```

2. Navigate to the project directory:
   ```sh
   cd task-manager
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Create a `.env` file and configure it:
   ```sh
   MONGO_URI=mongodb://127.0.0.1:27017/task-manager
   JWT_SECRET=my_super_secret_key
   ```

5. Start the server:
   ```sh
   npm start
   ```

## API Endpoints
### Authentication
- `POST /register` - Register a new user  
- `POST /login` - User login (returns JWT token)  

### Tasks
- `GET /tasks` - Fetch all tasks (Authenticated users only)  
- `POST /tasks` - Create a new task  
- `PUT /tasks/:id` - Update a task  
- `DELETE /tasks/:id` - Delete a task  

## Security Measures
- JWT authentication to secure private routes  
- Password hashing with bcrypt  
- Role-based access control (RBAC)  
- Validation with Joi to ensure proper data format  

## Deployment  
- The project is deployed on **Render/Replit/Railway**.  
- API base URL: `<deployed-url>`  

## Contributors  
- Team Members: *Raikhan Berkenova, Yelnura Akhmetova, Togzhan Oral*  

## License  
This project is licensed under the MIT License.  



