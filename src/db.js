import mongoose from 'mongoose';

export default callback => {
  let db = mongoose.connect('mongodb://username:password@ds117846.mlab.com:17846/xxxxx', {
  useMongoClient: true,
  /* other options */
});
  callback(db);
}
