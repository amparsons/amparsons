## Hi there 👋

## Getting Started

ddev start
ddev composer install (this will install the vendor files)

Create .env file in the backend folder.

Example:-

# Read about configuration, here:
# https://craftcms.com/docs/5.x/configure.html

# The application ID used to to uniquely store session and cache data, mutex locks, and more
CRAFT_APP_ID=enter-craft-id-here

# The environment Craft is currently running in (dev, staging, production, etc.)
CRAFT_ENVIRONMENT=dev

# Database connection settings
CRAFT_DB_DRIVER="mysql"
CRAFT_DB_SERVER="db"
CRAFT_DB_PORT="3306"
CRAFT_DB_DATABASE="db"
CRAFT_DB_USER="db"
CRAFT_DB_PASSWORD="db"
CRAFT_DB_SCHEMA=public
CRAFT_DB_TABLE_PREFIX=

# General settings
CRAFT_SECURITY_KEY=enter-key-here
CRAFT_DEV_MODE=true
CRAFT_ALLOW_ADMIN_CHANGES=true
CRAFT_DISALLOW_ROBOTS=true
MAILPIT_SMTP_HOSTNAME="127.0.0.1"
MAILPIT_SMTP_PORT="1025"
CRAFT_WEB_ROOT="/var/www/html/web"
PRIMARY_SITE_URL="enter-url-here


# Frontend
Fron the front-end directors use node version 23.3.0
npm install
npm run dev

API endpoint for local
https://freelance-frontend.ddev.site:33001/actions/graphql/api


