import React from 'react';
import axios from 'axios';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FilesUploadComponent from './fileupload';
class Add extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
        name: '',
        bio:'',
        linkedinlink:'',
        githublink:'',
        selectedFile:''
      };
    }
    handleChange = (event) => {
      switch (event.target.name) {
         case 'selectedFile':
            this.setState({ selectedFile: event.target.files[0] });
            break;
           default:
            this.setState({[event.target.name]: event.target.value});
      }

    }
    onSubmit = (e) => {
      e.preventDefault();
      const { name,bio,linkedinlink,githublink,selectedFile } = this.state;
      let formData = new FormData();
      if(this.state.name !== "" &&
      this.state.bio !== "" &&
      this.state.linkedinlink !== "" &&
      this.state.githublink !== "" &&
      this.state.selectedFile !== ""){
      formData.append('name', name);
      formData.append('bio', bio);
      formData.append('linkedinlink',linkedinlink);
      formData.append('githublink',githublink);
      formData.append('selectedFile',selectedFile);
      axios.post('http://localhost:8080/add', formData)
        .then((result) => {
          // access results...
          this.setState({name:'',
    bio:'',
  linkedinlink:'',
githublink:'',
selectedFile:''})
        });
      window.alert('Your response is recorded')
      
      }
      else{
        window.alert('Details not sufficient')
      }
    }
    
    render() {
       return (
          <div>
             <center><h1>Add Profile</h1></center>
             <br />
             <br />
             <form onSubmit={this.onSubmit}>
                <center><h5>Enter your Name</h5>
                <input type="text" name ="name" value={this.state.name} onChange={this.handleChange}/><br/><br/>
                <h5>Enter about yourself</h5>
                <textarea name="bio" rows="10" cols="50" value={this.state.bio} onChange={this.handleChange}></textarea><br/><br/>
                <h5>LinkedIn Profile Link</h5>
                <input type="text" name ="linkedinlink" value={this.state.linkedinlink} onChange={this.handleChange}/><br/><br/>
                <h5>Github Profile Link</h5>
                <input type="text" name ="githublink" value ={this.state.githublink} onChange={this.handleChange}/><br/><br/><br/>
                <h5>Upload your Resume(in PDF with size less than 16MB)</h5>
                <input
              type="file"
              name="selectedFile"
              onChange={this.handleChange}
            /><br/><br/><br/>
             <input type="submit" value="Upload" /><br/><br/>
             </center>
             </form>

          </div>
       )
    }
  }
  export default Add;