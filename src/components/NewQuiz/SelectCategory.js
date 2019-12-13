import React, {Component} from "react";
import {Row, Col, Button, Spin} from "antd";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import "./SelectCategory.css"
import {get_categories} from "../../redux/actions/categories";

class SelectCategory extends Component {

  componentDidMount() {
    this.props.get_categories();
  }

  render() {
    return(
      <React.Fragment>
        <h1 className="category-title">Select a category</h1>
        {
        this.props.status == "loading" ? <div className="category-status"><Spin size="large" /></div> :
        this.props.status == "success" ?
        <Row gutter={20}>
          {
            this.props.cats.map((cat, i) => {
              return (
                <Col key={i} xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
                  <Link to={`/new-quiz/${cat.id}`}><Button className="category-button" block>{cat.name}</Button></Link>
                </Col>
              )
            })
          }
        </Row>
        : this.props.status == "error" ? <div className="category-status">{this.props.message}</div> : null
      }
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    get_categories: () => dispatch(get_categories())
  }
}

function mapStateToProps(state) {
  return {
    status: state.categoryReducer.status,
    message: state.categoryReducer.message,
    cats: state.categoryReducer.categories
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCategory);
