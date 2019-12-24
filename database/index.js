const mongoose = require('mongoose');
const Schema = mongoose.Schema
const db = mongoose.connection;

var Ownerschema = new Schema({
        login: String,
        id: Number,
        avatar_url: String,
        repos_url: String
})
var repoSchema = new Schema(
  {
      id: Number,
      name: String,
      full_name: String,
      owner: Ownerschema,
      description: String,
      tags_url: String,
      created_at: { type: Date, default: Date.now },
      updated_at:{ type: Date, default: Date.now },
      forks_count: Number


});


var Repo = mongoose.model('Repo', repoSchema);

var save = (repoDetails) => {
  Repo.insertMany(repoDetails)
  .then((data) => {return data)})
  .catch((err)=> {
    console.log(err)
  })
}


db.once('open', () => {console.log("Mongoose is live wooohhhho!")})

module.exports.Repo = Repo
module.exports.save = save;
