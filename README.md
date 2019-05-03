This project is me playing around.....again

### Running

1. Download and do a yarn install
1. Run yarn start (notice in package.json currently proxying to localhost:8080 for api calls)
1. Navigate to localhost:3000
1. Home (Index/Click on React POC) is public, company endpoints expect you to be logged in.

#### Steps

1. Created a new app using create-react-app app-name
1. Removed all of the App.css code, gutted the App.js code and created basic HelloWorld
1. Deleted the react logo 
1. Created my POC app in App.js for now
1. Some config is located in config.js

### TODO

* Customize React Strap
* Edit, Delete a company
* Beef up add company, error handling, forward on save...

### Things To Figure Out

* Cleaner on change
* Cleaner use of the access token with hooks, feel like it can be better.
* How to save search params (for example params for searching companies)

###  Libraries I am using

* React
* React Router Dom
* Okta
* Reactstrap

### Commands I need to get used to

* npm start / yarn start
* yarn add react-router-dom
* yarn add @okta/okta-react
* yarn add bootstrap reactstrap react react-dom
* yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome

### Questions

* Secure Route does not seem to be working
  * This was because of the not found route,not sure why at this point
  * Try using a component on the not found route
* How do I stop /companies/:id from rendering when going to /companies/garbage, force id as an number?
  
### Things to look into 

* Traverson and traverson-hal
* Formik
  
### Helpful Links

* https://stackoverflow.com/questions/48523371/how-to-customize-bootstrap-4-in-reactjs-app-with-reactstrap-dependency