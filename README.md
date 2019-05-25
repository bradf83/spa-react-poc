This project is me playing around.....again.  I am currently using a React front end UI with a backend Spring Boot API
built using Spring Data REST.  The notes in this document should pertain mostly to the React portion of my messing around
but when evaluating different things I may bleed over into the API side.

### Running

1. Download and do a yarn install
1. Run yarn start (notice in package.json currently proxying to localhost:8080 for api calls)
1. Navigate to localhost:3000
1. Home (Index/Click on React POC) is public, company endpoints expect you to be logged in.

#### How I was built

1. Created a new app using the create-react-app and then gutted the default app and started from there.

#### Examples
I have added an examples section that is not protected by security this will allow me to mock out some ideas that I want
to build with the full api.

### TODO

* Delete a company

### Things To Figure Out

* Cleaner use of the access token with hooks, feel like it can be better.
* How to save search params (for example params for searching companies)

###  Libraries I am using

* React (yarn add react react-dom)
* React Router Dom (yarn add react-router-dom)
* Okta (yarn add @okta/okta-react)
* Reactstrap (yarn add bootstrap reactstrap)
* react-toastify (yarn add react-toastify)
* Font Awesome (yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome)

### Customize Reactstrap Bootstrap

* Install node-sass ```yarn add node-sass```
* Create a styles directory in your src directory
* Create a custom.scss similar to the following.  Note the custom styling is above the bootstrap import, refer to Bootstraps
documentation for more information.  Yes you could also create another file for custom styles and import it before Bootstrap
```
$theme-colors: (
        "primary": #ffb800
);

$btn-border-radius: 3000px;
@import "~bootstrap/scss/bootstrap";
```
* Make sure to import this file at your entry point (index.js)
```
import './styles/custom.scss';
```
  
### Things to look into 

* Traverson and traverson-hal
* Formik
* Suspense For Data Fetching (Minor Release Mid 2019)
  
### Helpful Links

* https://stackoverflow.com/questions/48523371/how-to-customize-bootstrap-4-in-reactjs-app-with-reactstrap-dependency

### Alternative Approaches

* Not sure I like how the companies list is using an effect to get the token.  It causes a few extra component renders.

```
// Need to add 'auth' to the useEffect dependency block
// This should be wrapped in a try/catch for error handling
// The async method can be defined inside or outside the useEffect call.  Wonder which is better or if it matters?
const fetchData = async () => {
    const response = await fetch("/companies/search/findByCodeContainsOrNameContainsAllIgnoreCase?search=" + search, {headers: {"Authorization": "Bearer " + await auth.getAccessToken()}});
    const data = await response.json();
    setCompanies(data._embedded.companies);
};
fetchData();
```

* Right now when loading a company on edit in the CompanyManage I do two calls to hydrate the component it would be nice
if I could do a single call to hydrate the component.  One thing we could do is create a projection in the API that allows
us to pass back all the information we need.
    * I came across another way to accommodate this goal on the Spring Boot API side.  Create a resource processor to give us
    the additional information that we need.
    
### Wrapping My Head Around HAL API
So this is my first time using a HAL API and after writing my pagination example I started to realize I am fighting against
the HAL API rather than embracing it.  Old ways I used to build applications are forcing me to think a certain way when I
need to step back and think how would I do this with a HAL API instead.

* Resources do not have an ID present they provide a *self* link instead.
    * This allows the client to follow/use the link rather than having to construct it
    * How do you bookmark an individual item?  Do you only bookmark lists of items?
* How does a list page for a resource work?
    * Traditionally it would list the items and construct a link to the edit/view of the item
        * This would mean a company list could have an item with the following edit link */companies/1*
    * Using HAL it seems a list of items would instead pass the item and use the *self* link to load the item
        * Would the link then be */company/edit* on the front end and pass the resource which would then load from the *self* link?
            * Notice you would not be able to bookmark */company/edit* as going to it without a Company passed to it would fail.