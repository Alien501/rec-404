/*
TODO:
  1. Handle image Upload (Working on it)
  2. Nothing for now
*/

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs')

const storageEngine = multer.diskStorage({
  destination: './uploaded_image',
  filename: (req, file, callbackFunction) => {
    callbackFunction(null, `${Date.now()}-${file.fieldname}`)
  }
})

const upload = multer(
  {
    storage: storageEngine,
    limits: {fieldSize: 5000000}
  }
)

const { connection, client } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*/*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json())

app.use(cors());


connection();

const database = client.db('rec_404');
const collection = database.collection('rec_404');

app.use('/uploaded_image', express.static('./uploaded_image'));

app.get('/api', (req, res) => {
  res.send({
    status: 200,
    message: "Working fine!"
  })
});

app.get('/api/all', async (req, res) => {
    const cursor = await collection.find().toArray();

    return res.send(
      {
        status: "found",
        message: "data found",
        data: cursor
      }
    )
})

app.post('/api/post', upload.single('image') , async (req, res) => {
    console.log(req.file);
    const imageData = 'http://localhost:3000/' + req.file.path
    const result = await collection.insertOne({
      ...req.body,
      image: imageData,
      postDate: Date.now()
  });
    if(result.insertedId) {
      res.send(
        {
          status: 200,
          message: "Added post successfully!"
        }
      )
    }else {
      res.send(
        {status: 404,
        message: "Something funcked up!"}
      )
    }
})

app.delete('/api/delete', async (req, res) => {
  // console.log(req.body.image.split('/'));
    const cursor = await collection.deleteOne({"rollno": req.body.rollno, "title": req.body.title, "type": req.body.type});
    fs.unlink(req.body.image.split('/')[3], (err) => {
      if(err) {
        console.log(err);
      }
    })

    // return res.send({status: 200})
    if(cursor.deletedCount == 1) {
      res.send({
        status: 200,
        message: "Deleted Successfully!",
      })
    }else {
      res.send(
        {
          status: 404,
          message: "Data not found!"
        }
      )
    }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
