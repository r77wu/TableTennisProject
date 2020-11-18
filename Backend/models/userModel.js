const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'please provide your first name'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'please provide your last name'],
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'please provide your email']
  },
  password: {
    type: String,
    required: [true, 'please enter your password'],
    minlength: 6,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please confirm your password'],
    minlength: 6,
    validate: {
      validator: function(el) {
        return el === this.password
      },
      message: 'please confirm your password'
    }
  },
  age: {
    type: String
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  style: {
    type: String,
    enum: ['Penhold', 'Shakehand']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
);

userSchema.index({city: 1});

userSchema.virtual('list', {
  ref: 'User',
  localField: 'friends',
  foreignField: '_id'
})

userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if(!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
})

userSchema.methods.correctPassword = async function( inputPassword, userPassword) {
  return await bcrypt.compare(inputPassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
  if(this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }

  return false;
}

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
  return resetToken;
}

const User = mongoose.model('Users', userSchema);

module.exports = User;