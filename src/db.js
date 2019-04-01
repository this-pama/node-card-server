import mongoose from 'mongoose';

export default callback => {
  let db = mongoose.connect('mongodb://adedapopaul:Moronkeji_2016@ds117846.mlab.com:17846/airtelcardgenerator', {
  useMongoClient: true,
  /* other options */
});
  callback(db);
}
