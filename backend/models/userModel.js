const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password cannot be empty"],
      minLength: [6, "Password must be of minimum 6 characters"],
    },
    photo: {
      type: String,
      required: [true, "Picture required"],
      default:
        "https://woodfibreinsulation.co.uk/wp-content/uploads/2017/04/blank-profile-picture-973460-1-1-1080x1080.png",
    },

    phone: {
      type: String,
      default: "+91",
    },

    bio: {
      type: String,
      maxLength: [250, "Password can be of maximum 250 characters"],
      default: "bio",
    },
  },
  {
    timestamps: true,
  }
);

  //Encrypt password before saving to db
  userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
      return next();
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

  });

const User = mongoose.model("User", userSchema);
module.exports = User;
