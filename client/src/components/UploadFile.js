import React, {Component} from 'react';
import axios from 'axios';

class UploadFile extends Component {
  state = {
    selectedFile: null,
    selectedFileError: false,
    selectedFileErrorMessage: '',
    fileType: 'potree',
    fileUploadButtonDisabled: true,
    fileUploadProgress: 0,
    fileUploadMessageShow: false
  }

  fileSelectedHandler = event => {
    let fileName = event.target.files[0].name;
    let fileNameExtension = fileName.split('.').pop()

    // Check the file extension.  It should be a .las,
    // otherwise display a validation error
    if(fileNameExtension === "las"){
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

      // TODO: Make configurable: url
      axios({
        method: 'post',
        url: 'http://localhost:8081/upload',
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
          console.log(error)
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
        <div>
          Upload a valid Lidar file (.las) - 1GB limit<br/>
          <input id="file" type="file" onChange={this.fileSelectedHandler}/>
        </div>
        {this.state.selectedFileError && <span style={{color: 'red'}}>{this.state.selectedFileErrorMessage}</span>}
        <div>
          <label htmlFor="converter">Converter service: &nbsp;</label>
          <select id="fileType" name="fileType" onChange={this.fileTypeHandler}>
            <option value="potree">Potree</option>
            <option value="entwine">Entwine</option>
          </select>
        </div>
        <div>
          <button disabled={this.state.fileUploadButtonDisabled} onClick={this.fileUploadHandler}>Upload</button><br/>
          {this.state.fileUploadProgress > 0 &&
          <div className="progress">
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
              <span style={{color: 'green'}}>File uploaded successfully!</span>
              <button onClick={this.resetFormHandler}>Load another file</button>
            </div>
          }
        </div>
      </div>
    )

  }


}

export default UploadFile;