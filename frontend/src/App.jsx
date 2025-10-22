import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import OrganizationList from './pages/OrganizationList';
import OrganizationForm from './pages/OrganizationForm';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/organizations" element={<OrganizationList />} />
          <Route path="/organizations/add" element={<OrganizationForm />} />
          <Route path="/organizations/edit/:id" element={<OrganizationForm />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/add" element={<UserForm />} />
          <Route path="/users/edit/:id" element={<UserForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
