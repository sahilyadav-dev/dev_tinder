const express = require('express');
const app = express();

app.listen(3000 , () => {
  console.log('server is up')
});

// app.use('/', (req,res) => {
//   res.send('hello from server');
// })
app.use('/hello', (req,res) => {
  res.send("hello hello hello!");
})
app.use('/profile', (req,res) => {
  res.send('this is your profile');
})