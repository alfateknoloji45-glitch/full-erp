/**
 * ALFAI ERP - API Client
 * 
 * Axios-based API wrapper for backend communication.
 * When backend is unavailable, returns mock data so the UI can render and be tested offline.
 */
import axios from 'axios';

// Use REACT_APP_API_URL env variable or fall back to '/api'
const API_BASE = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL 
  ? import.meta.env.VITE_API_URL 
  : '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data for offline/demo mode when backend is unreachable
const MOCK_COMPANIES = [
  { id: 1, name: 'ABC Yazılım Ltd.', subdomain: 'abc', plan: 'pro', status: 'active', users: 5, mrr: 799, createdAt: '2024-01-15' },
  { id: 2, name: 'Demo Şirketi', subdomain: 'demo', plan: 'starter', status: 'trial', users: 2, mrr: 299, createdAt: '2024-02-20' },
  { id: 3, name: 'XYZ Danışmanlık', subdomain: 'xyz', plan: 'pro', status: 'active', users: 8, mrr: 799, createdAt: '2024-03-10' },
];

/**
 * Fetch all companies from the backend.
 * Falls back to mock data if the request fails (e.g., backend not running)
 * or if the response is not valid JSON (e.g., HTML error page from Vite).
 */
export async function getCompanies() {
  try {
    const response = await api.get('/companies');
    // Validate that response is an array (not HTML or other non-JSON response)
    if (Array.isArray(response.data)) {
      return response.data;
    }
    // If response is not an array, fall back to mock data
    console.warn('[odooApi] getCompanies: response is not an array, returning mock data');
    return [...MOCK_COMPANIES];
  } catch (error) {
    console.warn('[odooApi] getCompanies failed, returning mock data:', error.message);
    return [...MOCK_COMPANIES];
  }
}

/**
 * Update the status of a company (e.g., 'active', 'trial').
 */
export async function updateCompanyStatus(id, status) {
  try {
    const response = await api.patch(`/companies/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.warn('[odooApi] updateCompanyStatus failed:', error.message);
    // Return mock updated company for UI demonstration
    const company = MOCK_COMPANIES.find(c => c.id === id);
    if (company) {
      return { ...company, status };
    }
    throw error;
  }
}

/**
 * Update the plan of a company (e.g., 'starter', 'pro').
 */
export async function updateCompanyPlan(id, plan) {
  try {
    const response = await api.patch(`/companies/${id}/plan`, { plan });
    return response.data;
  } catch (error) {
    console.warn('[odooApi] updateCompanyPlan failed:', error.message);
    // Return mock updated company for UI demonstration
    const company = MOCK_COMPANIES.find(c => c.id === id);
    if (company) {
      const mrr = plan === 'pro' ? 799 : 299;
      return { ...company, plan, mrr };
    }
    throw error;
  }
}

/**
 * Delete a company by ID.
 */
export async function deleteCompany(id) {
  try {
    const response = await api.delete(`/companies/${id}`);
    return response.data;
  } catch (error) {
    console.warn('[odooApi] deleteCompany failed:', error.message);
    // Return the deleted company ID for UI demonstration
    const company = MOCK_COMPANIES.find(c => c.id === id);
    if (company) {
      return { id };
    }
    throw error;
  }
}

/**
 * User signup with email.
 */
export async function signup(email) {
  try {
    const response = await api.post('/auth/signup', { email });
    return response.data;
  } catch (error) {
    console.warn('[odooApi] signup failed:', error.message);
    // Return mock success for UI demonstration
    return { ok: true, token: 'mock-token-' + Date.now() };
  }
}

/**
 * Check if a subdomain is available.
 */
export async function checkSubdomainAvailable(subdomain) {
  try {
    const response = await api.get(`/subdomains/check/${subdomain}`);
    return response.data?.available ?? true;
  } catch (error) {
    console.warn('[odooApi] checkSubdomainAvailable failed:', error.message);
    // Return available for demo purposes unless it's a known subdomain
    const takenSubdomains = MOCK_COMPANIES.map(c => c.subdomain);
    return !takenSubdomains.includes(subdomain);
  }
}

/**
 * Create a new company.
 */
export async function createCompany(companyData) {
  try {
    const response = await api.post('/companies', companyData);
    return response.data;
  } catch (error) {
    console.warn('[odooApi] createCompany failed:', error.message);
    // Return mock created company for UI demonstration
    return {
      id: Date.now(),
      ...companyData,
      status: 'trial',
      users: 1,
      mrr: companyData.plan === 'pro' ? 799 : 299,
      createdAt: new Date().toISOString().split('T')[0],
    };
  }
}

export default api;
