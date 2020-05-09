import React, { Component } from "react";
import "./register.css";
class Register extends Component {
  generate = () => {
    const data = document.getElementById("email").value;
    console.log(data);
    document.getElementById("returnBox").innerHTML = "";
    document.getElementById("returnBox").innerHTML = `
      registeruser
      mail ${data}
    `;
  };

  render() {
    return (
      <div className="App">
        <div className="info">
          <p>
            Moss is being provided in the hope that it will benefit the
            educational community. Moss is fast, easy to use and free. In the
            past, access has been restricted to instructors and staff of
            programming courses. This is no longer the case and anyone may
            obtain a Moss account. However moss is not recommended for
            non-commercial use. If you are interested in the comercial uses of
            Moss contact similix corporation
          </p>
          <p>
            To obtain a Moss account, send a e-mail message to
            moss@moss.stanford.edu. The body of the message should appear
            exactly as follows:{" "}
          </p>
          <br />
          <br />
          <p>registeruser</p>
          <p>mailUsername@domain</p>
          <br />
          <br />
          <p>where "mailUsername@domain" is your email address</p>
          <p>
            Enter your email in the form below and the contents of the email
            will be generated for you
          </p>
          <br />
          <br />
          <div className="info">
            <label>Email Address: </label>
            <input id="email" type="text" />
            <button className="buttonElement2" onClick={this.generate}>
              Get ID
            </button>
            <br />
            <br />
            <textarea
              className="rerturnD"
              id="returnBox"
              type="text"
              readOnly="True"
              style={{ width: 350, height: 80 }}
            />
          </div>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default Register;
