import mongoose from 'mongoose';

export default callback => {
  let db = mongoose
              .connect('mongodb://mongo:27017/card-server-restful-api', 
                        {useMongoClient: true}
                      )
              .then(()=> console.log('MongoDb connected'))
              .catch((err)=> console.log(err))
  callback(db);
}
