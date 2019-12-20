import React from "react";
import { Col, Row, Form, Upload, Button, Input, Icon} from 'antd';
import {connect} from "react-redux";

const Settings = (props) => {
  console.log(props);
  return (
    <Form>
      <Form.Item label="E-mail">
        <Input value={props.auth.email} disabled />
      </Form.Item>
      <Form.Item label="Display name">
        <Input />
      </Form.Item>
      <Form.Item label="Profile picture">
        <Upload name="logo" action="uploadapiurl" listType="picture">
          <Button>
            <Icon type="upload" /> Click to upload
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save changes
        </Button>
      </Form.Item>

    </Form>
  );

}

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
    profile: state.firebaseReducer.profile
  };
}

export default connect(mapStateToProps)(Settings);
