# Organization & Users Management System

A full-stack web application for managing organizations and users with role-based assignments and memberships.

## 🚀 Features

- **Dashboard**: Overview with statistics and quick actions
- **Organization Management**: Create, read, update, and delete organizations
- **User Management**: Manage users with roles and organization assignments
- **Membership System**: Associate users with multiple organizations
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **RESTful API**: Django REST Framework backend with comprehensive endpoints
- **Real-time Updates**: Instant feedback with loading states and error handling

## 🛠 Tech Stack

### Frontend
- React 18
- React Router DOM (for routing)
- Tailwind CSS (styling)
- Axios (HTTP requests)
- React Icons (UI icons)
- Vite (build tool)

### Backend
- Python 3.11
- Django 5.0.1
- Django REST Framework 3.14.0
- PostgreSQL (database)
- CORS Headers (cross-origin support)

## 📋 Prerequisites

- Python 3.11+
- Node.js 20+
- PostgreSQL database
- pip (Python package manager)
- npm (Node package manager)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd organization-users-management
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env and add your database credentials

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create a superuser for admin access (optional)
python manage.py createsuperuser

# Load seed data (optional but recommended for testing)
python manage.py seed_data

# Start the backend server
python manage.py runserver 0.0.0.0:8000
```

The backend API will be available at `http://localhost:8000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Set up environment variables (optional)
cp .env.example .env

# Start the development server
npm run dev
```

The frontend application will be available at `http://localhost:5000`

## 📁 Project Structure

```
.
├── backend/                    # Django backend
│   ├── api/                    # Main API application
│   │   ├── models.py           # Database models
│   │   ├── serializers.py      # DRF serializers
│   │   ├── views.py            # API viewsets
│   │   ├── urls.py             # API routes
│   │   ├── admin.py            # Django admin config
│   │   └── management/         # Management commands
│   │       └── commands/
│   │           └── seed_data.py # Database seeding script
│   ├── orgmanagement/          # Django project settings
│   │   ├── settings.py         # Main settings
│   │   └── urls.py             # Root URL configuration
│   ├── requirements.txt        # Python dependencies
│   └── manage.py               # Django management script
│
└── frontend/                   # React frontend
    ├── src/
    │   ├── api/                # API configuration
    │   │   └── axios.js        # Axios instance
    │   ├── components/         # Reusable components
    │   │   ├── Layout.jsx
    │   │   ├── LoadingSpinner.jsx
    │   │   └── ErrorMessage.jsx
    │   ├── pages/              # Page components
    │   │   ├── Dashboard.jsx
    │   │   ├── OrganizationList.jsx
    │   │   ├── OrganizationForm.jsx
    │   │   ├── UserList.jsx
    │   │   └── UserForm.jsx
    │   ├── App.jsx             # Main app component
    │   ├── main.jsx            # App entry point
    │   └── index.css           # Global styles
    ├── public/                 # Static assets
    ├── package.json            # Node dependencies
    ├── vite.config.js          # Vite configuration
    └── tailwind.config.js      # Tailwind CSS config
```

## 🗄 Database Schema

### Organization Model
- `id`: Primary key (auto-generated)
- `name`: Organization name (CharField)
- `address`: Organization address (TextField)
- `created_at`: Timestamp (auto-generated)

### User Model
- `id`: Primary key (auto-generated)
- `name`: User's full name (CharField)
- `email`: Email address (unique, EmailField)
- `role`: User role - admin, manager, employee, intern (CharField with choices)
- `organization`: Foreign key to Organization (optional)
- `created_at`: Timestamp (auto-generated)

### Membership Model
- `id`: Primary key (auto-generated)
- `user`: Foreign key to User
- `organization`: Foreign key to Organization
- `role`: Role in the organization (CharField)
- `joined_at`: Timestamp (auto-generated)
- **Constraint**: Unique together (user, organization)

## 🔌 API Endpoints

### Organizations
- `GET /api/organizations/` - List all organizations
- `POST /api/organizations/` - Create a new organization
- `GET /api/organizations/{id}/` - Get organization details
- `PUT /api/organizations/{id}/` - Update organization
- `DELETE /api/organizations/{id}/` - Delete organization
- `GET /api/organizations/stats/` - Get organization statistics

### Users
- `GET /api/users/` - List all users
- `POST /api/users/` - Create a new user
- `GET /api/users/{id}/` - Get user details
- `PUT /api/users/{id}/` - Update user
- `DELETE /api/users/{id}/` - Delete user
- `GET /api/users/stats/` - Get user statistics
- Query parameter: `?organization={id}` - Filter users by organization

### Memberships
- `GET /api/memberships/` - List all memberships
- `POST /api/memberships/` - Create a new membership
- `GET /api/memberships/{id}/` - Get membership details
- `PUT /api/memberships/{id}/` - Update membership
- `DELETE /api/memberships/{id}/` - Delete membership
- Query parameters:
  - `?organization={id}` - Filter by organization
  - `?user={id}` - Filter by user

## 🎨 Features & Pages

### 1. Dashboard
- Overview statistics (total organizations, users, roles)
- Users by role breakdown
- Quick action buttons
- Navigation to all sections

### 2. Organizations
- **List View**: Search and filter organizations
- **Add/Edit**: Form with validation for creating and updating organizations
- **Delete**: Confirmation dialog before deletion
- User count per organization
- Responsive card layout

### 3. Users
- **List View**: Search by name/email, filter by organization
- **Add/Edit**: Form with role selection and organization assignment
- **Delete**: Confirmation dialog
- Role badges with color coding
- Email validation

## 🧪 Testing the Application

### Using the Seeded Data

After running `python manage.py seed_data`, you'll have:
- 5 organizations (MIT, Stanford, Harvard, Google, Microsoft)
- 10 users with various roles
- 3 cross-organization memberships

### Manual Testing Checklist

1. **Dashboard**
   - ✅ View statistics
   - ✅ Check users by role
   - ✅ Click quick action buttons

2. **Organizations**
   - ✅ View organization list
   - ✅ Search organizations
   - ✅ Add new organization
   - ✅ Edit existing organization
   - ✅ Delete organization

3. **Users**
   - ✅ View user list
   - ✅ Search users
   - ✅ Filter by organization
   - ✅ Add new user
   - ✅ Edit existing user
   - ✅ Delete user

### Testing API Endpoints with Postman/cURL

```bash
# Get all organizations
curl http://localhost:8000/api/organizations/

# Create a new organization
curl -X POST http://localhost:8000/api/organizations/ \
  -H "Content-Type: application/json" \
  -d '{"name":"New Org","address":"123 Main St"}'

# Get all users
curl http://localhost:8000/api/users/

# Create a new user
curl -X POST http://localhost:8000/api/users/ \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","role":"employee","organization":1}'
```

## 🔐 Admin Panel

Access the Django admin panel at `http://localhost:8000/admin/`

Features:
- Full CRUD operations on all models
- User-friendly interface for data management
- Search and filtering capabilities
- Bulk operations

## 🚀 Deployment

### Backend (Django)

1. Update `settings.py` for production:
   - Set `DEBUG = False`
   - Update `ALLOWED_HOSTS`
   - Use environment variables for secrets
   - Configure static files

2. Use a production-ready server (e.g., Gunicorn):
   ```bash
   pip install gunicorn
   gunicorn orgmanagement.wsgi:application --bind 0.0.0.0:8000
   ```

### Frontend (React)

1. Build for production:
   ```bash
   cd frontend
   npm run build
   ```

2. Serve the `dist` folder using a web server (Nginx, Apache, or CDN)

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
```

### Frontend (.env)
```
VITE_API_BASE_URL=https://your-api-domain.com/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name

## 🙏 Acknowledgments

- Django & Django REST Framework documentation
- React & Vite documentation
- Tailwind CSS team
- All contributors and testers

## 📞 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Built with ❤️ using Django, React, and PostgreSQL**
