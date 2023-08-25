require('dotenv').config();

module.exports = {
  "dbURL":`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.pu1becu.mongodb.net/${process.env.MONGO_NAME}?retryWrites=true&w=majority`
}