import { arrayTypeAnnotation } from "@babel/types";
import userDataReducer from "../redux/reducers/userData";

const httpOptions = {method: "GET"};
const categories = [{id:9,name:"General Knowledge"},{id:10,name:"Entertainment: Books"},{id:11,name:"Entertainment: Film"},
{id:12,name:"Entertainment: Music"},{id:13,name:"Entertainment: Musicals & Theatres"},{id:14,name:"Entertainment: Television"},
{id:15,name:"Entertainment: Video Games"},{id:16,name:"Entertainment: Board Games"},{id:17,name:"Science & Nature"},{id:18,name:"Science: Computers"},
{id:19,name:"Science: Mathematics"},{id:20,name:"Mythology"},{id:21,name:"Sports"},{id:22,name:"Geography"},{id:23,name:"History"},
{id:24,name:"Politics"},{id:25,name:"Art"},{id:26,name:"Celebrities"},{id:27,name:"Animals"},{id:28,name:"Vehicles"},{id:29,name:"Entertainment: Comics"},
{id:30,name:"Science: Gadgets"},{id:31,name:"Entertainment: Japanese Anime & Manga"},{id:32,name:"Entertainment: Cartoon & Animations"}];

class QuizModel{

    constructor(store){
        this.store = store;
    }

    sortFavoriteCategories(results, points){
        let newState = this.store.getState().userDataReducer.categoryPreferences;
        //let results = this.store.getState().quizResultsReducer.results;
        newState.forEach(cat =>{
            if(cat.id === results.category.id){
                cat.times++;
                cat.points += points;
            }
        });
        newState.sort(function(a,b){
            return b.times - a.times;
        });
        this.store.dispatch({type: "UPDATE_CATEGORY_PREFERENCES", categoryPreferences: newState});
    }

    sortLeaderboard(users){
        let sortedScores = users.sort(function(a, b){
            return b.score - a.score;
        });
        return sortedScores;
    }

    updateUserScore(newPoints){
        let newScore = this.store.getState().userDataReducer.score + newPoints;
        this.store.dispatch({type: "UPDATE_SCORE", score: newScore});
    }



    calculatePoints(results){
        let points = 0;
        let time = 0.0;
        let weighting = 1.0;
        let user = this.store.getState().userDataReducer;
        if(results.category.id !== user.categoryPreferences[0].id){
            weighting = weighting * calculateCategoryScaling(user, results.category);
        }
        if(results.difficulty === "medium"){
            weighting= weighting *1.25;
        } else if(results.difficulty === "hard"){
            weighting = weighting*1.5;
        }
        results.questions.forEach((question) => {
            if(question.answer == question.correct_answer){
                points = points + 10;
                time = time + question.time-left;
            }
        });
        points = Math.round(((points + (time/100))*weighting));
        this.updateUserScore(points);
        this.sortFavoriteCategories(results, points);
        return points;
    }
    

    calculateCategoryScaling(user, category){
        let scaling = 1.0;
        let compCat = user.categoryPreferences.find(function(cat){
            return cat.id === category;
        });
        if((user.categoryPreferences[0].times/compCat.times) < 0.75){
            scaling = 1.25;
        } else if((user.categoryPreferences[0].times/compCat.times) < 0.50){
            scaling = 1.5;
        } else if((user.categoryPreferences[0].times/compCat.times) < 0.25){
            scaling = 2.0;
        }
        return scaling;
    }

    calculateTotalClearRate(){
        let cleared = 0;
        let total = 0;
        let quizzes = this.store.getState().userDataReducer.takenQuizzes;
        quizzes.forEach((result) => {
            //let results = quizzes.results;
            total += Array.length(result.questions);
            result.questions.forEach((question) => {
                if(question.answer == question.correct_answer){
                    cleared++;
                }
            });
        });
        let rate = cleared/total;
        return rate;
    }

    calculateClearRate(results){
        let cleared = 0;
        let total = Array.length(results.questions);
        //let results = this.store.getState().quizResultsReducer.results;
        results.questions.forEach((question) => {
            if(question.answer == question.correct_answer){
                cleared++;
            }
        });
        let rate = cleared/total;
        return rate;
    }

    fetchQuiz(noOfQuestions, category, difficulty){
        let reqCategory = categories.forEach(loopCategory => {
            if(loopCategory.name === category){
                return loopCategory.id;
            }
        })
        let reqString = "https://opentdb.com/api.php?amount=";
        reqString += noOfQuestions + "&category=";
        reqString += reqCategory + "&difficulty=";
        reqString += difficulty + "&type=multiple&encode=url3986";
        
        return fetch(reqString, httpOptions).then(this.processResponse);
    }

    processResponse(response) {
        if (response.ok) {
          return response.json();
        }
        throw response;
    }
}