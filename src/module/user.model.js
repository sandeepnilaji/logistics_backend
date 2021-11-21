const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const path = require("path");
// const x= path.join(__dirname);
const y = path.resolve("src", "images", "profileimg.png");
// console.log(x,y)

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, default: "" },
    phoneno: { type: Number, default: "" },
    adress: { type: String, default: "" },
    // orders:{type:Array,default:[]},
    profilepic: {
      type: String,
      default:
        "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",
    },
    // myorders:[{from:{type:String},to:{type:String},phoneno:{type:String},status:{type:String,default:false},price:{type:Number},paymentmode:{type:String}}]

    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//it will bycript the password when user register and update
// it happns before the user get saved
// next is the middleware and pre is the hook

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  var hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("user", userSchema);
module.exports = User;
