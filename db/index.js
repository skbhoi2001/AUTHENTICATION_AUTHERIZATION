require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectionStr =
  'mongodb+srv://soumyak:Soumyak_2001@cluster0.rmf9lfi.mongodb.net/test';

mongoose
  .connect(connectionStr, { useNewUrlparser: true })
  .then(() => console.log('connected to mongodb'))
  .catch((err) => console.log(err));

mongoose.connection.on('error', (err) => {
  console.log(err);
});
