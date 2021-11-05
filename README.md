![shields](https://img.shields.io/badge/version-v1.0-blue)
![shields](https://img.shields.io/badge/make_with-React_in_create--react--app-red)
![shields](https://img.shields.io/badge/make_with-react--router-yellow) ![shields](https://img.shields.io/badge/make_with-react--router--dom-yellow) ![shields](https://img.shields.io/badge/make_with-redux-yellow) ![shields](https://img.shields.io/badge/make_with-react--redux-yellow) ![shields](https://img.shields.io/badge/make_with-Immer-yellow) ![shields](https://img.shields.io/badge/make_with-Axios-yellow)
![shields](https://img.shields.io/badge/design-OpenClassroom-green) ![shields](https://img.shields.io/badge/web_dev-David_Weiland-green)

# ArgentBank - App

As part of the OpenClassroom training, in addition to the creation of a React app, this project aims to work on the use of complementary libraries to manage store (here using redux and react-redux).
This app using axios to call API.

__Note__ : The application needs to connect to an api to work : [ArgentBank-API](https://github.com/DavidWeiland/ArgentBank-API) *(to make the api work, consult the README.md first - this running on localhost:3001)*.
__Note__ : As soon as the final api is online, change the value of the path in Utils/data/index.js

## Technologies

- JavaScript (React, React-Router, Redux, React-Redux, Immer, Axios)
- HTML
- CSS in React (styled-components) for Loader
- CSS

### Command `yarn start`
#### Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### The page will reload if you make edits.\
You will also see any lint errors in the console.

#### Folders Structure
The src folder contains the development elements of the application : 
- /assets/Images : image, logo and icons of the application
- /components : components of the application (Header and Footer)
- /pages : Home, Login (to connect a user) or Profile (page of a connected user)
- /utils : callMethod (axios), /styles (style.css), selectors (link to store), store (create store and link to Redux-DevTool)
- index.jsx : ReactDom with Router and Provider

### Command `yarn test`
In branch withReduxToolKit, there are tests only on feature/user (actions and reducer)

Launches the test runner in the interactive watch mode.

### Command `yarn build`
#### Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

#### The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Command `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

__CRA :__ You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

__React :__ To learn React, check out the [React documentation](https://reactjs.org/).

__Redux :__ To learn React, check out the [Redux documentation](https://redux.js.org/).

__React-Redux :__ To learn React, check out the [React-Redux documentation](https://react-redux.js.org/).

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
