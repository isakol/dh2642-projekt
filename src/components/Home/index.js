import React, {Component} from "react";
import {connect} from "react-redux";
import {get_categories} from "../../redux/actions/categories";

class Home extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    if (this.props.cats.length == 0) {
      this.props.get_categories();
    }
  }

  categoriesPlayed(categories) {
    let categoryArray = [];
    for (var k in categories) {
      let findCategory = this.props.cats.find(cat => cat.id == k);
      if (findCategory != undefined) categoryArray.push({id: k, name: findCategory.name, points: categories[k].points, times: categories[k].times, correct: categories[k].correct, answered: categories[k].answered});
    }
      return categoryArray.map((c, i) => <div>{c.name}: played {c.times} times, {c.points} points, correct answers: {c.correct/c.answered*100}% ({c.correct+"/"+c.answered})</div>);
  }


  render() {
    return (
      <React.Fragment>
        <div>Welcome home.</div>
        <div>Categories that you previously have played: {(this.props.profile.isLoaded && this.props.cats.length > 0) ? typeof this.props.profile.categories != "undefined" ? this.categoriesPlayed(this.props.profile.categories) : "none" : null}</div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.firebaseReducer.profile,
    cats: state.categoryReducer.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    get_categories: () => dispatch(get_categories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
