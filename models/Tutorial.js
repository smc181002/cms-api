const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const tutorialSchema = new mongoose.Schema({
  data: String,
  title: String,
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

tutorialSchema.plugin(mongoosePaginate);
const Tutorial = mongoose.model('tutorial', tutorialSchema);

module.exports = Tutorial;
