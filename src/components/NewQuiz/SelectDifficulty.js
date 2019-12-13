import React, {Component} from "react";
import {Row, Col, Button, Card, Divider, Icon, Spin} from "antd";
import {Link} from "react-router-dom";
import "./SelectDifficulty.css";
import {connect} from "react-redux";
import {get_categories} from "../../redux/actions/categories"

class SelectDifficulty extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.cats.length == 0) {
      this.props.get_categories();
    }
  }

  render() {
    let content = "";
    if (this.props.status == "loading") {
      content = <div className="difficulty-status"><Spin size="large" /></div>
    } else {
      let findCategory = this.props.cats.find(cat => cat.id == this.props.match.params.id);

      if (typeof findCategory === "undefined") {
        content = <div className="difficulty-status">The requested category does not exist.</div>
      } else {
        content =
          <Row>
            <Col xs={24} xxl={{span: 10, offset: 7}}>
              <Card className="difficulty-card">
                <h2 className="difficulty-name">{findCategory.name}</h2>
                <Link className="difficulty-back-link" to="/new-quiz"><Icon type="arrow-left" /> Select another category</Link>
                <Divider />
                <Link to={`/quiz/${this.props.match.params.id}/easy`}><Button shape="round" className="difficulty-button easy" block>Easy</Button></Link>
                <Link to={`/quiz/${this.props.match.params.id}/medium`}><Button shape="round" className="difficulty-button medium" block>Medium</Button></Link>
                <Link to={`/quiz/${this.props.match.params.id}/hard`}><Button shape="round" className="difficulty-button hard" block>Hard</Button></Link>
              </Card>
            </Col>
          </Row>
      }
    }

    return(
      <React.Fragment>
        <h1 className="category-title">Start new quiz</h1>
        {content}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    cats: state.categoryReducer.categories,
    status: state.categoryReducer.status
  }
}

function mapDispatchToProps(dispatch) {
  return {
    get_categories: () => dispatch(get_categories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectDifficulty);
