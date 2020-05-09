import React, { Component } from "react";
import "./index.css";
import axios from "axios";
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import config from "../../config";
import ReactTooltip from "react-tooltip";

firebase.initializeApp(config);
class Index extends Component {
  state = {
    filenames: [],
    downloadURLs: [],
    isUploading: false,
    uploadProgress: 0
  };

  handleUploadStart = () => {
    this.setState({
      isUploading: true,
      uploadProgress: 0
    });
  };

  handleProgress = progress => {
    this.setState({
      uploadProgress: progress
    });
  };

  handleUploadError = error => {
    this.setState({
      isUploading: false
      // Todo: handle error
    });
    console.error(error);
  };

  handleUploadBaseSuccess = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref("base files")
      .child(filename)
      .getDownloadURL();

    this.setState(oldState => ({
      filenames: [...oldState.filenames, filename],
      downloadURLs: [...oldState.downloadURLs, downloadURL],
      uploadProgress: 100,
      isUploading: false
    }));
    document.getElementById(
      "returnBase"
    ).innerHTML += `${filename} uploaded successfully \n`;
  };

  handleUploadSourceSuccess = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref("source files")
      .child(filename)
      .getDownloadURL();

    this.setState(oldState => ({
      filenames: [...oldState.filenames, filename],
      downloadURLs: [...oldState.downloadURLs, downloadURL],
      uploadProgress: 100,
      isUploading: false
    }));
    document.getElementById(
      "returnSource"
    ).innerHTML += `${filename} uploaded successfully \n`;
  };

  sendRequest = () => {
    const uid = document.getElementById("userBox").value;
    console.log(uid);
  };
  render() {
    return (
      <div className="App">
        <br />
        <form className="inputForm">
          <div id="middle">
            <div id="firstRow">
              <p id="userId" data-tip data-for="userId">
                User ID:
              </p>
              <input id="userBox" type="text" onChange={this.sendRequest} />
              <ReactTooltip
                id="userId"
                className="tooltip"
                effect="solid"
                place="bottom"
              >
                <span>
                  For information on how to get a user ID please click the "Get
                  User Id" navigation button
                </span>
              </ReactTooltip>
              <p id="language" data-tip data-for="language">
                Language
              </p>
              <ReactTooltip
                id="language"
                className="tooltip"
                effect="solid"
                place="bottom"
              >
                <span>
                  Please select the programming language of the files you wish
                  to validate
                </span>
              </ReactTooltip>
              <select className="langDrop" name="Languages">
                <option value="java">Java</option>
                <option value="c++">C++</option>
                <option value="c">C</option>
                <option value="c#">C#</option>
                <option value="python">Python</option>
                <option value="visualbasic">Visual Basic</option>
                <option value="javascript">Javascript</option>
                <option value="fortran">FORTRAN</option>
                <option value="ml">ML</option>
                <option value="haskell">Haskell</option>
                <option value="lisp">Lisp</option>
                <option value="scheme">Scheme</option>
                <option value="pascal">Pascal</option>
                <option value="modula2">Modula2</option>
                <option value="ada">Ada</option>
                <option value="perl">Perl</option>
                <option value="tcl">TCL</option>
                <option value="mathlab">Mathlab</option>
                <option value="vhdl">VHDL</option>
                <option value="verilog">Verilog</option>
                <option value="spice">Spice</option>
                <option value="mips assembly">MIPS assembly</option>
                <option value="a8086 assembly">a8086 assembly</option>
                <option value="hcl2">HCL2</option>
              </select>
            </div>
            <br />
            <div id="secondRow">
              <p id="validate" data-tip data-for="validate">
                Validate Using The Experimental Server:
              </p>
              <ReactTooltip
                id="validate"
                className="tooltip"
                effect="solid"
                place="bottom"
              >
                <span>
                  Please check this box if you wish to validate your files using
                  the Moss experimental server
                </span>
              </ReactTooltip>
              <input
                id="validateCheck"
                name="Use experimental server"
                type="checkbox"
              />
              <p id="sameDirectory" data-tip data-for="sameDirectory">
                Group Files By The Directory They Are In:{" "}
              </p>
              <ReactTooltip
                id="sameDirectory"
                className="tooltip"
                effect="solid"
                place="bottom"
              >
                <span>
                  Please check this box if you wish to group files by the
                  directory they exist in
                </span>
              </ReactTooltip>
              <input
                id="sameDirCheck"
                name="Use directory mode"
                type="checkbox"
              />
            </div>
            <br />
            <div id="thirdRow">
              <p id="legit" data-tip data-for="legit">
                Legitimacy Threshold:
              </p>
              <ReactTooltip
                id="legit"
                className="tooltip"
                effect="solid"
                place="bottom"
              >
                <span>
                  This number is used to specify the number of files a piece of
                  code may occour in before it is regarded as a piece of code
                  that must exist in all scripts being validated
                </span>
              </ReactTooltip>
              <input
                className="legitParameter"
                name="Legitimacy threshold"
                type="number"
                defaultValue="10"
              />
              <p id="matches" data-tip data-for="matches">
                # Matching Files (def):
              </p>
              <ReactTooltip
                id="matches"
                className="tooltip"
                effect="solid"
                place="bottom"
              >
                <span>
                  This number is used to specify the number of matching files
                  presented in the result
                </span>
              </ReactTooltip>
              <input
                className="matchParameter"
                name="Option n"
                type="number"
                defaultValue="350"
              />
              <p id="comment" data-tip data-for="comment">
                Comment String (apn):
              </p>
              <ReactTooltip
                id="comment"
                className="tooltip"
                effect="solid"
                place="bottom"
              >
                <span>
                  This parameter is used to specify a string to be attached to
                  the report which will be generated
                </span>
              </ReactTooltip>
              <input
                className="commentParameter"
                name="Option c"
                type="number"
              />
              <br />
            </div>
          </div>
          <br />
          <ul className="buttonRow">
            <li className="buttonR">
              <label data-tip data-for="baseFilesTip" className="buttonElement">
                select base files
                <FileUploader
                  hidden
                  accept="/*"
                  name="image-uploader-multiple"
                  storageRef={firebase.storage().ref("base files")}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadBaseSuccess}
                  onProgress={this.handleProgress}
                  multiple
                />
              </label>
              <ReactTooltip
                id="baseFilesTip"
                className="tooltip"
                effect="solid"
                place="bottom"
              >
                <span>Upload base files</span>
              </ReactTooltip>
            </li>
            <li className="buttonR">
              <label
                data-tip
                data-for="sourceFilesTip"
                className="buttonElement"
              >
                select source files
                <FileUploader
                  hidden
                  accept="/*"
                  name="image-uploader-multiple"
                  storageRef={firebase.storage().ref("source files")}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSourceSuccess}
                  onProgress={this.handleProgress}
                  multiple
                />
              </label>
              <ReactTooltip
                id="sourceFilesTip"
                className="tooltip"
                effect="solid"
                place="bottom"
              >
                <span>
                  Upload source files with unique names identifying each
                  students submission
                </span>
              </ReactTooltip>
            </li>
            <li className="buttonR">
              <button
                className="buttonElement"
                name="Send request"
                onClick={this.submitRequest}
              >
                Send Request
              </button>
            </li>
          </ul>
          <br />
        </form>
        <br />
        <div className="return">
          <div className="returnBox">
            <h3 align="center">Base Files</h3>
            <textarea
              id="returnBase"
              type="text"
              class="inlineTextArea"
              name="uploadedFiles"
              readOnly="True"
              style={{ width: 600, height: 355 }}
            />
          </div>
          <div className="returnBox">
            <h3 align="center">Source Files</h3>
            <textarea
              id="returnSource"
              type="text"
              class="inlineTextArea"
              name="uploadedFiles"
              readOnly="True"
              style={{ width: 600, height: 355 }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
