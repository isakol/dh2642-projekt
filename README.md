# Entrivia
A web app for answering trivia questions.
Choose a category that you are interested in and a quiz will be generated for you. The more correct answers you have the more points you will get. Earn points to climb the leaderboards.

The quiz questions are fetched from [Open Trivia DB](https://opentdb.com).

## What we have done
We have gotten authentication working with Firebase. It is possible to sign up and sign in with your email and password. We have connected our app with the API and has managed to fetch categories and quiz questions.
The app also calculates points based on a variety of factors such as difficulty chosen, time taken answering, frequently picked categories etc. We also have leaderboards displaying the top15 users with highest scores as well as category specific leaderboards with a top5 for each category. When the user is logged in they are greated by a home screen that shows them their clear-rate (questions correct/answered), favorite categories as well as recent history. There is also a settings page where the user can change their displayed name.

## Project Structure
**index.js** - initialization of firebase and configuration of react-redux-firebase.  
**App.js** - root component with our router.  
**RequireAuth.js** - parent component to childs that require authentication. will display log in screen if user is not logged in.
**firebase.js** - containing firebase configuration parameters.

**/redux/actions/** - where the redux actions are stored.  
**/redux/reducers/** - where the reducers are stored. the reducers are combined in index.js  
**/redux/constants.js** - constants for all redux actions.  

## Deployment
The app is deployed to http://interaktionsprogrammering.herokuapp.com/
