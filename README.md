# your-project-title

> your-project-description

---

## Setup
- Install [DDEV](https://ddev.com/get-started/)
- `ddev start`
- `ddev composer install`
- `cp .env.example.dev .env` and modify the contents of `.env` to match your setup
- `ddev php craft setup/app-id && ddev php craft setup/security-key`
- `ddev import-db` (if a database already exists)

### Front End Dependencies

First, make sure you have [Node.js](http://nodejs.org) installed. Then:

- `npm i`
- `npm start`

### Development Server

Run `ddev start` and `npm start` to start the development server. Then you can access the site at the URL set for `PRIMARY_SITE_URL` in `.env`.

## Build for deployment

Run `npm run build --omit=dev --ignore-scripts` to build prepare all assets for deployment.
