const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose
  .connect(
    `mongodb+srv://soumyak:Soumyak_2001@cluster0.rmf9lfi.mongodb.net/test`,
    { useNewUrlparser: true }
  )
  .then(() => {
    console.log('db is connected!');
  })
  .catch((ex) => {
    console.log('db connection failed: ', ex);
  });
