import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { FiSave, FiX } from 'react-icons/fi';

const OrganizationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      fetchOrganization();
    }
  }, [id]);

  const fetchOrganization = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/organizations/${id}/`);
      setFormData({
        name: response.data.name,
        address: response.data.address,
      });
      setError(null);
    } catch (err) {
      setError('Failed to load organization. Please try again.');
      console.error('Error fetching organization:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Organization name is required';
    }
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      if (isEdit) {
        await api.put(`/organizations/${id}/`, formData);
      } else {
        await api.post('/organizations/', formData);
      }
      navigate('/organizations');
    } catch (err) {
      setError(`Failed to ${isEdit ? 'update' : 'create'} organization. Please try again.`);
      console.error('Error saving organization:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Edit Organization' : 'Add New Organization'}
        </h1>
        <p className="mt-2 text-gray-600">
          {isEdit ? 'Update the organization details below' : 'Fill in the details to create a new organization'}
        </p>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="bg-white shadow sm:rounded-lg">
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Organization Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                validationErrors.name ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="e.g., Massachusetts Institute of Technology"
            />
            {validationErrors.name && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              id="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                validationErrors.address ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="e.g., 77 Massachusetts Ave, Cambridge, MA 02139"
            />
            {validationErrors.address && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.address}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/organizations')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FiX className="mr-2 h-4 w-4" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSave className="mr-2 h-4 w-4" />
              {loading ? 'Saving...' : isEdit ? 'Update Organization' : 'Create Organization'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizationForm;
