const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlparser: true })
  .then(() => {
    console.log('db is connected!');
  })
  .catch((ex) => {
    console.log('db connection failed: ', ex);
  });
