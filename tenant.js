// Multi-Tenant Middleware
const { query } = require('../config/database');

// Extract tenant from subdomain
const getTenantMiddleware = async (req, res, next) => {
  try {
    // Get subdomain from host
    const host = req.get('host');
    const subdomain = host.split('.')[0];
    
    // Skip for main domain
    if (subdomain === 'app' || subdomain === 'www' || subdomain === 'localhost') {
      return next();
    }
    
    // Find company by subdomain
    const result = await query(
      'SELECT * FROM companies WHERE subdomain = $1 AND status = $2',
      [subdomain, 'active']
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }
    
    // Attach company to request
    req.company = result.rows[0];
    req.companyId = result.rows[0].id;
    
    next();
  } catch (error) {
    console.error('Tenant middleware error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Ensure data isolation
const ensureTenantAccess = async (req, res, next) => {
  if (!req.companyId) {
    return res.status(403).json({ error: 'No company context' });
  }
  
  // Verify user belongs to this company
  if (req.user && req.user.company_id !== req.companyId) {
    return res.status(403).json({ error: 'Access denied to this company' });
  }
  
  next();
};

module.exports = { getTenantMiddleware, ensureTenantAccess };
