# ![RealWorld Example App](logo.png)

> ### [React + Typescript + Vite] codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

### [Demo](https://demo.realworld.io/)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)

This codebase was created to demonstrate a fully fledged fullstack application built with **[React + Typescript + Vite]** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **[React + Typescript + Vite]** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

# How it works

The React application was designed with a modular architecture. Inside the app/ folder, you will find the pages/ folder containing components for different application pages, and a modules/ folder with various subfolders housing different modules. The distinctive module is the shared/ module, where components, guards, services, Redux, hooks, and other files are located. These files can be used across different modules or pages of the application.

> ## Api Configuration

Vite allows using environment variables similar to how Node.js does it on the backend. The application has only one environment variable, which is the API URL. In the repository, you will find the .env file with the VITE_API_URI variable. By default, you can use the URL: ***https://api.realworld.io/api/***, which is the demo API provided by [thinkster](https://thinkster.io/). If you have your own backend, add your URL and ensure that when you start the frontend, it has access to that URL.

> ## Routing Guidelines

- Home page (URL: /#/ )
  - List of tags
  - List of articles pulled from either Feed, Global, or by Tag
  - Pagination for list of articles
- Sign in/Sign up pages (URL: /#/login, /#/register )
  - Uses JWT (store the token in sessionStorage)
- Settings page (URL: /#/settings )
- Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
- Article page (URL: /#/article/article-slug-here )
  - Delete article button (only shown to article's author)
  - Render markdown from server client side
  - Comments section at bottom of page
  - Delete comment button (only shown to comment's author)
- Profile page (URL: /#/profile/:username, /#/profile/:username/favorites )
  - Show basic user info
  - List of articles populated from author's created articles or author's favorited articles

# Getting started

Before running this project, make sure you have Node.js installed on your system. If you don't have Node.js installed yet, you can follow the instructions at
[NodeJs](https://nodejs.org/) to install it.

Once you have Node.js installed, you can proceed with the following steps to set up and run the project locally:

1. Clone this repository: git clone https://github.com/GountzJs/real-world-project.git
2. Navigate to the project directory: cd web-rwp
3. Install the dependencies: <code>npm install</code>
4. Start the application: <code>npm run dev</code>
5. Open your browser and visit http://localhost:3000 to see the application.
