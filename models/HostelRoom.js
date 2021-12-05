const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const hostelRoomSchema = new mongoose.Schema({
  roomNo: {
    type: Number,
    required: true,
  },
  block: {
    type: String,
    required: true,
    enum: [
      'I',
      'J',
      'K',
      'L',
    ],
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }
  ]
})

hostelRoomSchema.plugin(mongoosePaginate);
const HostelRoom = mongoose.model('hostelRoom', hostelRoomSchema);

module.exports = HostelRoom;
