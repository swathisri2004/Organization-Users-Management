# Organization & Users Management System

## Project Overview
A full-stack web application for managing organizations, users, and their memberships. Built with React frontend, Django backend, and PostgreSQL database.

## Recent Changes (October 22, 2025)
- Initial project setup and complete implementation
- Created Django backend with RESTful API
- Implemented React frontend with responsive design
- Set up PostgreSQL database with migrations
- Added seed data for testing
- Configured workflows for both frontend and backend

## Project Architecture

### Backend (Django)
- **Framework**: Django 5.0.1 with Django REST Framework
- **Database**: PostgreSQL
- **Location**: `/backend/`
- **Port**: 8000
- **Models**:
  - Organization: Stores organization information
  - User: User data with role and organization assignment
  - Membership: Many-to-many relationship between users and organizations
- **API Endpoints**: `/api/organizations/`, `/api/users/`, `/api/memberships/`

### Frontend (React)
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS v3
- **Location**: `/frontend/`
- **Port**: 5000
- **Pages**:
  - Dashboard: Statistics and quick actions
  - Organizations: List, add, edit, delete organizations
  - Users: List, add, edit, delete users with role management

## User Preferences
- Clean, production-ready code
- Responsive design matching Figma specifications
- Comprehensive error handling and loading states
- Form validation on both frontend and backend

## How to Run

### Start Backend
```bash
cd backend && python manage.py runserver 0.0.0.0:8000
```

### Start Frontend
```bash
cd frontend && npm run dev
```

### Seed Database
```bash
cd backend && python manage.py seed_data
```

## Key Files
- `backend/api/models.py` - Database models
- `backend/api/serializers.py` - DRF serializers
- `backend/api/views.py` - API viewsets
- `frontend/src/App.jsx` - Main React app with routing
- `frontend/src/pages/Dashboard.jsx` - Dashboard component
- `frontend/src/pages/OrganizationList.jsx` - Organizations page
- `frontend/src/pages/UserList.jsx` - Users page

## Environment Variables
- Backend uses environment variables for database connection (automatically set by Replit)
- Frontend configured to connect to backend at `http://localhost:8000/api`

## Database Schema
See README.md for detailed database schema information.

## Next Steps / Future Enhancements
- User authentication and authorization
- Advanced search and filtering with pagination
- Data export functionality (CSV/PDF)
- Activity logs and audit trails
- Bulk operations for users and organizations
- ER diagram generation
- GitHub repository setup
