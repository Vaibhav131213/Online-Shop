const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('66a7516dc06b43c2d0e02707')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
.connect(
  'mongodb+srv://vaibhav789123:EtT5ynfZoFv5KyfW@cluster0.kuftx74.mongodb.net/test?retryWrites=true'
)
.then(result =>{
  User.findOne().then(user =>{
    if(!user) {
      const user = new User({
    name: 'Abc',
    email: 'abc@email.com',
    cart:{
      item:[]
    }
  })
  user.save();
    }
  });
  app.listen(3000);
  console.log('Connected');
}).catch (err =>{
  console.log(err);
})