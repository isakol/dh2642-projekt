# Quiz Application
A web app for answering trivia questions.
Choose a category that you are interested in and a quiz will be generated for you. The more correct answers you have the more points you will get. Earn points to climb the leaderboards.

The quiz questions are fetched from [Open Trivia DB](https://opentdb.com).

## What we have done
We have gotten authentication working with Firebase. It is possible to sign up and sign in with your email and password. We have connected our app with the API and has managed to fetch categories and quiz questions.

## What we plan to do
* Make users able to change settings such as display name and password.
* Leaderboards for each category.
* Home dashboard where a user can see statistics, activity, ranking etc.

## Project Structure
index.js - initialization of firebase and configuration of react-redux-firebase.
App.js - root component with our router.
RequireAuth.js - parent component to childs that require authentication. will display log in screen if user is not logged in.

/redux/actions/ - where the redux actions are stored.
/redux/reducers/ - where the reducers are stored. the reducers are combined in index.js
/redux/constants.js - constants for all redux actions.

## Deployment
The app is deployed to http://interaktionsprogrammering.herokuapp.com/
