const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Post = require('./models/post');
const nodemailer = require('nodemailer');
const $env = process.env;

var clubhousefacade_transporter = getTransporter($env.EMAIL_CLUBHOUSEFACADE ,$env.PASSWORD_CLUBHOUSEFACADE);
//  credentials 
function getTransporter(email ,password)  {
  let transporter=  nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: email,
         pass: password
       }});
       return transporter;
 }
 function getMailOptions({email ,to ,fname,lname, subject, message,phonenumber} ) {
  let mailOptions = {
      from:email,
      // organisation Email 
      to,
      subject:`Hi Clubhouse Facade ----${subject}--`,
      text:message,
      phonenumber,
      html: `<h1>${message}</h1><p>That was easy! name ${fname} ${lname} ${phonenumber}</p>`

  };
    return mailOptions;
    
}


router.get('/posts', (req, res) => {
  Post.find().then(rec => {
    if(rec) {
      res.send(rec);
    } else {
      res.send([]); 
    }
  })
});

router.post('/posts', function(req, res) {
  const post = new Post({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    url: req.body.url
  })
  console.log(req.body.title);
  console.log(req.body.url);
  post.save(function(err, rec) {
    if(err) {
      return res.status(400).send("error while creting a post")
    }
    console.log(rec);
    res.send(rec);
  })
});

router.post("/api/clubhousefacadeemailservice", function(req, res) {
  let resBody = {
      fname :req.body.fname,
      lname :req.body.lname,
      email :req.body.email,
      phonenumber :req.body.phonenumber,
      to : $env.EMAIL_CLUBHOUSEFACADE,
      subject :req.body.subject,
      message :req.body.message,
  }
  console.log(req.body);
  console.log(resBody);
  var clubhousefacade_mailOptions = getMailOptions(resBody);

  clubhousefacade_transporter.sendMail(clubhousefacade_mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.send("Email Sent Successfully");
      }
    });
  console.log(`${port} is working`);
});


router.put('/posts/:id/upvote', function(req, res) {
  Post.findById(req.params.id, function(err, rec) {
    if(err) {
      return res.status(400).send("cannot find the post with given id")
    }
    if(!rec) {
      return res.status(404).send("Post not found")
    }
    rec.votes = rec.votes + 1;
    rec.save();
    res.send(rec);
  })
})

router.put('/posts/:id/downvote', function(req, res) {
  Post.findById(req.params.id, function(err, rec) {
    if(err) {
      return res.status(400).send("cannot find the post with given id")
    }
    if(!rec) {
      return res.status(404).send("Post not found")
    }
    rec.votes = rec.votes - 1;
    rec.save();
    res.send(rec);
  })
})

router.delete('/posts/:id', function(req, res) {
  Post.deleteOne({_id: req.params.id}, function(err, rec) {
    if(err) {
      return res.status(400).send("error while delting a user")
    }
    if(!rec) {
      return res.status(404).send("user not found")
    }
    res.send(rec);
  })
})




module.exports = router;
