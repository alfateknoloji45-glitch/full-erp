/**
 * ALFAI ERP - Demo Data Seeder
 * Seeds database with realistic demo data for testing and demos
 */

const bcrypt = require('bcryptjs');

const seedDemoData = async (queryFn) => {
  console.log('🌱 Starting demo data seeding...');

  try {
    // Demo companies
    const companies = [
      { name: 'ABC Yazılım Ltd.', subdomain: 'abc', email: 'info@abcyazilim.com' },
      { name: 'Demo Şirketi', subdomain: 'demo', email: 'demo@demo.com' }
    ];

    for (const company of companies) {
      await queryFn(`
        INSERT INTO companies (name, subdomain, email, plan, status)
        VALUES ($1, $2, $3, 'pro', 'active')
        ON CONFLICT (subdomain) DO NOTHING
      `, [company.name, company.subdomain, company.email]);
    }

    // Demo user
    const hashedPassword = await bcrypt.hash('demo123', 10);
    await queryFn(`
      INSERT INTO users (email, password, name, role)
      VALUES ('demo@demo.com', $1, 'Demo User', 'admin')
      ON CONFLICT (email) DO NOTHING
    `, [hashedPassword]);

    console.log('✅ Demo data seeded!');
    console.log('Login: demo@demo.com / demo123');

  } catch (error) {
    console.error('❌ Error:', error);
  }
};

module.exports = seedDemoData;
