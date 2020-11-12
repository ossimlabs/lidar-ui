import React, {Component} from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button'

class UploadFile extends Component {

  state = {
    selectedFile: null,
    selectedFileError: false,
    selectedFileErrorMessage: '',
    fileType: 'potree',
    fileUploadButtonDisabled: true,
    fileUploadProgress: 0,
    fileUploadMessageShow: false,
    fileUploadError: false,
    fileUploadErrorMessage: ''
  }

  fileSelectedHandler = event => {
    let fileName = event.target.files[0].name;
    let fileNameExtension = fileName.split('.').pop().trim()

    console.log('fileNameExtension: ', fileNameExtension)

    // Check the file extension.  It should be a .las,
    // otherwise display a validation error
    if(fileNameExtension === "las" || fileNameExtension === "laz"){
      this.setState({
        selectedFile: event.target.files[0],
        selectedFileError: false,
        fileUploadButtonDisabled: false
      });
    } else {
      this.setState({
        selectedFileError: true,
        selectedFileErrorMessage: "Please choose a valid file format (.las)"
      });
    }
  }

  fileTypeHandler = event => {
    console.log(event.target.value);
    this.setState(({
      fileType: event.target.value
    }))
  }

  fileUploadHandler = () => {

    // The file input value can not be null,
    // otherwise display validation error
    if (this.state.selectedFile != null) {
      // Upload
      const fd = new FormData();
      fd.append('file', this.state.selectedFile, this.state.selectedFile.name);
      fd.append('fileName', this.state.selectedFile.name);
      fd.append('fileType', this.state.fileType);

      axios({
        method: 'post',
        url: this.props.uploadUrl,
        data: fd,
        onUploadProgress: progressEvent => {
          this.setState({fileUploadProgress: Math.round(progressEvent.loaded / progressEvent.total* 100)})
        }
      })
        .then(res => {
          console.log(res);
          this.setState({
            fileUploadProgress: 0,
            fileUploadButtonDisabled: true,
            fileUploadMessageShow: true
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            fileUploadError: true,
            fileUploadErrorMessage: 'An error occurred while attempting to upload the file.'
          });
        })
    } else {
      // We need to provide feedback here that the upload file was not
      // present
      console.log('Error, no file selected');
      this.setState({
        selectedFileError: true,
        selectedFileErrorMessage: "Please choose a file before submitting the upload."
      });
    }
  }

  resetFormHandler = () => {
    this.setState({
      selectedFile: null,
      selectedFileError: false,
      selectedFileErrorMessage: '',
      fileType: 'potree',
      fileUploadButtonDisabled: true,
      fileUploadProgress: 0,
      fileUploadMessageShow: false
    });
    document.getElementById("file").value = "";
  }

  render(){
    return (
      <div>
        <br/>
        <div>
          <input id="file" type="file" onChange={this.fileSelectedHandler}/>
        </div>
        {this.state.selectedFileError && <span style={{color: 'red'}}>{this.state.selectedFileErrorMessage}</span>}
        <br/>
        <div className="form-group">
          <label htmlFor="converter">Converter: &nbsp;</label>
          <select className="form-control" id="fileType" name="fileType" onChange={this.fileTypeHandler}>
            <option value="potree">Potree</option>
            <option value="entwine">Entwine</option>
          </select>
        </div>
        <div>
          <Button variant="primary" disabled={this.state.fileUploadButtonDisabled} onClick={this.fileUploadHandler}>Upload</Button><br/>
          {this.state.fileUploadProgress > 0 &&
            <div style={{marginTop: "10px"}} className="progress">
              <div
                className="progress-bar progress-bar-info progress-bar-striped"
                role="progressbar"
                aria-valuenow={this.state.fileUploadProgress}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: this.state.fileUploadProgress + "%" }}
              >
                {this.state.fileUploadProgress}%
              </div>
            </div>
          }
          {this.state.fileUploadMessageShow &&
            <div>
              <p style={{color: 'green'}}>File uploaded successfully!</p>
              <Button variant="secondary" onClick={this.resetFormHandler}>Load another file</Button>
            </div>
          }
          {this.state.fileUploadError &&
            <div style={{marginTop: "10px"}}>
              <p style={{color: 'red'}}>Error: {this.state.fileUploadErrorMessage}</p>
            </div>
          }
        </div>
      </div>
    )

  }


}

export default UploadFile;