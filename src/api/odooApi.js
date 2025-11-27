/**
 * odooApi.js - API wrapper for backend communication
 * 
 * Configuration:
 * - Uses REACT_APP_API_URL environment variable if set
 * - Falls back to '/api' as the default base URL
 * 
 * Fallback Behavior:
 * - getCompanies() will return a small mock dataset if the backend is unreachable
 * - This allows the frontend to be developed/demoed without a running backend
 * 
 * To configure the API base URL:
 * - Set REACT_APP_API_URL in your .env file (e.g., REACT_APP_API_URL=http://localhost:3000/api)
 * - Or configure it in vite.config.mjs using define or envPrefix
 */
import axios from 'axios';

// Base URL configuration - uses env variable or defaults to /api
const BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data for fallback when backend is unreachable
const MOCK_COMPANIES = [
  {
    id: 1,
    name: 'Demo Şirket A.Ş.',
    subdomain: 'demo',
    plan: 'pro',
    status: 'active',
    users: 5,
    mrr: 799,
  },
  {
    id: 2,
    name: 'Test Yazılım Ltd.',
    subdomain: 'test-yazilim',
    plan: 'starter',
    status: 'trial',
    users: 2,
    mrr: 299,
  },
  {
    id: 3,
    name: 'Örnek Danışmanlık',
    subdomain: 'ornek',
    plan: 'starter',
    status: 'active',
    users: 3,
    mrr: 299,
  },
];

/**
 * Get list of companies
 * Falls back to mock data if backend is unreachable
 */
export async function getCompanies() {
  try {
    const response = await api.get('/companies');
    return response.data;
  } catch (error) {
    // Fallback: return mock data if backend is unreachable
    console.warn('Backend unreachable, using mock company data:', error.message);
    return MOCK_COMPANIES;
  }
}

/**
 * Update company status (active/trial)
 */
export async function updateCompanyStatus(id, status) {
  const response = await api.patch(`/companies/${id}/status`, { status });
  return response.data;
}

/**
 * Update company plan (starter/pro)
 */
export async function updateCompanyPlan(id, plan) {
  const response = await api.patch(`/companies/${id}/plan`, { plan });
  return response.data;
}

/**
 * Delete a company
 */
export async function deleteCompany(id) {
  const response = await api.delete(`/companies/${id}`);
  return response.data;
}

/**
 * Sign up with email
 */
export async function signup(email) {
  const response = await api.post('/signup', { email });
  return response.data;
}

/**
 * Check if a subdomain is available
 */
export async function checkSubdomainAvailable(subdomain) {
  try {
    const response = await api.get(`/subdomains/check/${subdomain}`);
    // Explicitly check if available is a boolean, default to true otherwise
    const available = response.data?.available;
    return typeof available === 'boolean' ? available : true;
  } catch (error) {
    // Default to available if check fails
    console.warn('Subdomain check failed, assuming available:', error.message);
    return true;
  }
}

/**
 * Create a new company
 */
export async function createCompany(companyData) {
  const response = await api.post('/companies', companyData);
  return response.data;
}

export default api;
