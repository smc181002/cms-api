const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
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
      'student',
      'teacher',
    ]
  }
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

const User = mongoose.model('user', userSchema);

module.exports = User;
