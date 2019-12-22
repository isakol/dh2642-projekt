# Quiz Application
A web app for answering trivia questions.
Choose a category that you are interested in and a quiz will be generated for you. The more correct answers you have the more points you will get. Earn points to climb the leaderboards.

The quiz questions are fetched from [Open Trivia DB](https://opentdb.com).

## What we have done
We have gotten authentication working with Firebase. It is possible to sign up and sign in with your email and password. We have connected our app with the API and has managed to fetch categories and quiz questions.

## What we plan to do
* Points calculation based on different factors such as favorite category, time spent on each quiz etc.
* Leaderboards for each category. Also show display names instead of user ids.
* Home dashboard where a user can see statistics, activity, ranking etc.
* More advanced settings such as change password, reset password, set profile picture.


## Project Structure
**index.js** - initialization of firebase and configuration of react-redux-firebase.  
**App.js** - root component with our router.  
**RequireAuth.js** - parent component to childs that require authentication. will display log in screen if user is not logged in.

**/model/** - here we store some methods that we will use in the future, these methods will eventually be moved to the redux folder or to the components where the methods will be used.

**/redux/actions/** - where the redux actions are stored.  
**/redux/reducers/** - where the reducers are stored. the reducers are combined in index.js  
**/redux/constants.js** - constants for all redux actions.  

## Deployment
The app is deployed to http://interaktionsprogrammering.herokuapp.com/
