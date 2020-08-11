const port = process.env.PORT || 8080;
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const uuidv4 = require('uuid').v4;
const path = require('path');
const profileschema = require('./mongodb.js');
const fs = require('fs');
const cors = require("cors");
const { nextTick } = require('process');
var MongoClient = require('mongodb').MongoClient;
var corsOptions = {
  origin: "http://localhost:3000"
};

var url = "mongodb://localhost:27017/";
    // configure storage
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        /*
          Files will be saved in the 'uploads' directory. Make
          sure this directory already exists!
        */
        cb(null, './uploads');
      },
      filename: (req, file, cb) => {
        /*
          uuidv4() will generate a random ID that we'll use for the
          new filename. We use path.extname() to get
          the extension from the original file name and add that to the new
          generated ID. These combined will create the file name used
          to save the file on the server and will be available as
          req.file.pathname in the router handler.
        */
       const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
       cb(null, newFilename);
      },
    });
    // create the multer instance that will be used to upload/save the file
    const upload = multer({ storage });

    const app = express();
    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/',(req,res)=>{
        res.send('<html><body><h1>hello</h1></body></html>')
    })
    app.get('/resumeget',(req,res)=>{
      //console.log(req.query.sid)
      profileschema.find({"_id":req.query.sid},(error,data)=>{
          if(error){
            console.log(error)
            return next(error);
          }
          else{
            console.log(data)
            res.json(data);
          }
      });
    })
    app.get('/allusers',(req,res)=>{
        profileschema.find((error,data)=>{
          if(error){
            return next(error);
          }
          else{
            console.log(data);
            res.send(data);
          }
        })
    })
    app.get('/delete/:id',(req,res)=>{
      profileschema.findByIdAndRemove({_id:req.params.id},function(err,emp){
        if(err){
          res.json(err);
          console.log(req.params.id);
        }
        else{
          res.json('Deleted Success')
          console.log("delete success")
        }
      })
    })
    app.post('/add', upload.single('selectedFile'), (req, res) => {
      /*
        We now have a new req.file object here. At this point the file has been saved
        and the req.file.filename value will be the name returned by the
        filename() function defined in the diskStorage configuration. Other form fields
        are available here in req.body.
      */
        const prouser = new profileschema;
        prouser.name = req.body.name;
        prouser.bio = req.body.bio;
        prouser.linkedinlink = req.body.linkedinlink;
        prouser.githublink = req.body.githublink;
        prouser.resume.data = fs.readFileSync('./uploads/' + req.file.filename)
        prouser.resume.contentType = "document/pdf"
        prouser.save()
     console.log(req.body);
     console.log(req.file.filename);
      res.send();
    });

    app.listen(port, () => console.log(`Server listening on port ${port}`));