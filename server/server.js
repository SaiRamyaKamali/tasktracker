const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user');

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(error => console.log(error));

// create a new user and save it to the database
/*const newUser = new User({
    username: 'Ramya',
    tasks: [
      {
        title: 'Do work',
        dueDate: new Date('2023-05-30'),
        status: 'In Progress',
        description: 'Light Hall'
      },
      {
        title: 'Call Friends',
        dueDate: new Date('2023-06-30'),
        status: 'Pending',
        description: 'Be in Touch'

      }
    ]
  });
  
  newUser.save()
    .then(() => console.log('User added'))
    .catch(error => console.error(error));*/


//delete users
/*User.deleteMany({})
  .then(() => console.log('All users deleted'))
  .catch(error => console.error(error));*/

const usersRouter = require('./routes/users')
app.use('/', usersRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})
