const express = require('express');
const app = express();

app.listen(3000 , () => {
  console.log('server is up')
});
app.get("/userdata",(req,res) => {
  res.send({name: 'sahil', age: 24})
})
app.delete("/delete",(req,res) => {
  res.send("Your Data Deleted")
})
app.post('/hello/2', (req,res) => {
  res.send("aabra ka daabra")
})
app.get('/hello', (req,res) => {
  res.send("hello hello hello!");
})
app.use('/profile', (req,res) => {
  res.send('this is your profile');
})
app.use('/', (req,res) => {
  res.send('hello from server');
})
