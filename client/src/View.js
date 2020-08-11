import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Base64 } from 'js-base64';
 
// or if you prefer no Base64 namespace
import { encode, decode } from 'js-base64';

class View extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         userdata : []
      }
      var self = this;
      axios.get('http://localhost:8080/allusers',{mode:'cors'}).then(function(response){
         console.log(response.data)
         self.setState({userdata:response.data},()=>{
            console.log(self.state.userdata)
         })
      })
   }
   
    render() {
       return (
          <div>
             <center><h1>View Profiles</h1></center>
             <center><table border ="2">
      <tbody>
         <th>Name</th>
         <th>Bio</th>
         <th>LinkedIn Profile</th>
         <th>Github Profile</th>
         <th>Resume</th>
         <th>Delete</th>
         {this.state.userdata.map(function(item, key) {
            function downloadURI (url, name) {
               var link = document.createElement('a')
               link.download = name
               link.href = url
               document.body.appendChild(link)
               link.click()
               document.body.removeChild(link)
             }
             function download() {
                console.log(item._id)
                axios.get('http://localhost:8080/resumeget',{params:{sid:item._id}},{responseType: 'blob',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/pdf'
                }}).then(function(response){
                   var test = response.data[0];
                  // console.log(test.resume)
                  var strj = test.resume.data.data;
                  var base64 = btoa(
                     new Uint8Array(strj)
                       .reduce((data, byte) => data + String.fromCharCode(byte), '')
                   );
                   
                  console.log(base64.toString())
                  const linkSource = `data:application/pdf;base64,${base64}`;
const downloadLink = document.createElement("a");
const fileName = "abc.pdf";
downloadLink.href = linkSource;
downloadLink.download = fileName;
downloadLink.click()

                })
                
             }
             function dels(){
                console.log(item._id)
                console.log('Hi')
                axios.get('http://localhost:8080/delete/'+item._id,{mode:'cors'}).then(function(response){
                   window.alert('Deleted Success')
                   
                })
                window.location.reload()
             }
               return (
                  <tr key = {key}>
                      <td>{item.name}</td>
                      <td>{item.bio}</td>
                      <td><a target="_blank" href={item.linkedinlink}><button >
               LinkedIn Profile</button></a></td>
               <td><a target="_blank" href={item.githublink}><button >
               Github Profile</button></a></td>
               <td><button onClick={download}>Download</button></td>
               <td><button onClick={dels}>Delete</button></td>
                  </tr>
                )
             
             })}</tbody>
       </table></center>
          </div>
       )
    }
  }
  export default View;