import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { FiPlus, FiEdit, FiTrash2, FiMapPin } from 'react-icons/fi';

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const response = await api.get('/organizations/');
      setOrganizations(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load organizations. Please try again.');
      console.error('Error fetching organizations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this organization? This will also delete all associated users.')) {
      try {
        await api.delete(`/organizations/${id}/`);
        setOrganizations(organizations.filter((org) => org.id !== id));
      } catch (err) {
        setError('Failed to delete organization. Please try again.');
        console.error('Error deleting organization:', err);
      }
    }
  };

  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organizations</h1>
          <p className="mt-2 text-gray-600">Manage all organizations in the system</p>
        </div>
        <Link
          to="/organizations/add"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <FiPlus className="mr-2 h-5 w-5" />
          Add Organization
        </Link>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search organizations by name or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {filteredOrganizations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No organizations found.</p>
            <Link
              to="/organizations/add"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <FiPlus className="mr-2 h-5 w-5" />
              Add First Organization
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredOrganizations.map((org) => (
              <li key={org.id}>
                <div className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{org.name}</h3>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                          {org.user_count} {org.user_count === 1 ? 'user' : 'users'}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <FiMapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {org.address}
                      </div>
                      <p className="mt-1 text-xs text-gray-400">
                        Created: {new Date(org.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="ml-4 flex items-center space-x-2">
                      <Link
                        to={`/organizations/edit/${org.id}`}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <FiEdit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(org.id)}
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                      >
                        <FiTrash2 className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrganizationList;
