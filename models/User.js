const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Enter a Valid Email']
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: [
      'admin',
      'librarian',
      'faculty',
      'student',
    ]
  },
  tutorials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tutorial"
    }
  ],
  hostelRoom: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "hostelRoom"
  },
})

// encrypt the password before saving it to the database
userSchema.pre('save', async function(next) {
  const saltKey = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, saltKey);
  next();
})

// operation to be performed when user login
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({email});

  if (user) {
    const comparePass = await bcrypt.compare(password, user.password);

    if (comparePass) return user;
    throw Error('incorrect password');
  }
  throw Error('incorrect email');

}

userSchema.plugin(mongoosePaginate);
const User = mongoose.model('user', userSchema);

module.exports = User;
