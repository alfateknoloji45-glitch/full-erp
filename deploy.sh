#!/bin/bash

##############################################
# ALFAI ERP - Production Deployment Script
# Automated deployment to production
##############################################

set -e  # Exit on error

echo "🚀 ALFAI ERP Deployment Starting..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if production
if [ "$NODE_ENV" != "production" ]; then
    echo -e "${YELLOW}⚠️  Warning: NODE_ENV is not set to production${NC}"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 1. DATABASE BACKUP
echo -e "\n${GREEN}1. Backing up database...${NC}"
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql
echo "✓ Database backup created"

# 2. BUILD FRONTEND
echo -e "\n${GREEN}2. Building frontend...${NC}"
cd frontend
npm install --production
npm run build
echo "✓ Frontend build completed"

# 3. BUILD BACKEND
echo -e "\n${GREEN}3. Preparing backend...${NC}"
cd ../backend
npm install --production
echo "✓ Backend dependencies installed"

# 4. RUN MIGRATIONS
echo -e "\n${GREEN}4. Running database migrations...${NC}"
psql $DATABASE_URL < database.sql
echo "✓ Migrations completed"

# 5. RUN TESTS
echo -e "\n${GREEN}5. Running tests...${NC}"
npm test
echo "✓ Tests passed"

# 6. DEPLOY
echo -e "\n${GREEN}6. Deploying to production...${NC}"
# Add your deployment commands here
# Examples:
# - git push heroku main
# - vercel --prod
# - pm2 restart alfai-erp
echo "✓ Deployment completed"

# 7. HEALTH CHECK
echo -e "\n${GREEN}7. Running health check...${NC}"
sleep 5
curl -f http://localhost:5000/health || exit 1
echo "✓ Health check passed"

echo -e "\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Deployment successful!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

echo -e "\nNext steps:"
echo "1. Check application: https://alfaierp.com"
echo "2. Monitor logs: pm2 logs"
echo "3. Check metrics: /admin/metrics"
