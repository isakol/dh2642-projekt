import React, {useState, useEffect} from "react";
import { Form, Upload, Button, Input, Icon, PageHeader, Alert} from 'antd';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import { withFirebase } from 'react-redux-firebase';
import "./Settings.css";

const Settings = (props) => {
  const [displayName, setDisplayName] = useState(props.profile.displayName);

  const [msgDisplay, setMsgDisplay] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    if ((displayName !== "" || displayName !== null) && displayName !== props.auth.displayName) {
      setLoading(true);
      props.firebase
      .ref("users")
      .orderByChild("displayName")
      .equalTo(displayName)
      .limitToFirst(1)
      .once("value", snapshot => {
        if (!snapshot.exists()) {
            props.firebase.updateAuth({displayName: displayName});
            props.firebase.updateProfile({displayName: displayName});
            props.firebase
            .ref("leaderboards")
            .orderByChild("uid")
            .equalTo(props.auth.uid)
            .once("value", snapshot2 => {
            if (snapshot2.exists()) {
              snapshot2.forEach( data => {
                if(data.val().uid === props.auth.uid) {
                  props.firebase.update("leaderboards/"+data.key, {displayName: displayName});
                }
              });
            }
            setStatus("success")
            setMsgDisplay(true);
          });
        } else {
          setStatus("error")
          setMessage("This username is already in use.");
          setMsgDisplay(true);
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  }
  const oldName = props.profile.displayName;
  useEffect(() => {
    setDisplayName(oldName)
  }, [oldName, setDisplayName]);

  useEffect(() => {
    setMsgDisplay(false);
  }, []);

  return (
    <React.Fragment>
      {
        msgDisplay === true ?
          status === "success" ? <Alert className="settings-alert" message="We successfully updated your information" type="success" /> : status === "error" ? <Alert className="settings-alert" message={message} type="error" /> : null
        :
          null
      }
      <PageHeader
        style={{
          border: '1px solid #e8e8e8',
          backgroundColor: '#FFFFFF'
        }}
        onBack={() => props.history.push("/")}
        title="Settings"
      />
      <Form className="settings-form" onSubmit={e => submitForm(e)} labelCol={{sm: {span:6}, md: {span:5}, lg: {span:3}, xl: {span: 2}}} wrapperCol={{sm: {span:18}, md: {span:19}, lg: {span:21}, xl: {span:22}}}>
        <Form.Item label="E-mail">
          <Input value={props.auth.email} disabled />
        </Form.Item>
        <Form.Item label="Display name">
          <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </Form.Item>
        <Form.Item wrapperCol={{sm: {offset:6}, md: {offset:5}, lg: {offset:3}, xl: {offset:2}}}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save changes
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );

}

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
    profile: state.firebaseReducer.profile
  };
}


export default  withRouter(withFirebase(connect(mapStateToProps)(Settings)));
