# your-project-title

A solid start for Craft CMS projects at Malven Co.

---

## Create a new project with this template

```shell
npx degit https://github.com/cmalven/craft your-project-slug
cd your-project-slug
```

- Find-and-replace all occurrences of `your-project-title` and `your-project-slug` in the project with your actual project's title and slug.
- Follow the steps in `Setup` below.
- Run `ddev craft update all` to update Craft and plugins.
- Run `npx npm-check -u` to update all frontend dependencies.
- Run `ddev craft project-config/apply`
- Delete this section of the README and git commit.

---

## Setup
- Install [DDEV](https://ddev.com/get-started/)
- `ddev start`
- `ddev composer install`
- `cp .env.example.dev .env` and modify the contents of `.env` to match your setup
- `ddev php craft setup/app-id && ddev php craft setup/security-key`
- `ddev import-db`

### Front End Dependencies

First, make sure you have [NodeJS](http://nodejs.org) installed. Then:

* `npm i`
* `npm start`

### Development Server

Run `ddev start` and `npm start` to start the development server. Then you can access the site at the URL set for `PRIMARY_SITE_URL` in `.env`.

## Build for deployment

Run `npm run build` to build prepare all assets for deployment.
