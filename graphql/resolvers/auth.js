const User = require('../../models/user.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  createUser : async (args,req) => {
    let data = await User.findOne({email:args.userInput.email});
    if (data) throw new Error('User found');
    let hashPassword = await bcryptjs.hash(args.userInput.password,12);
    const user = new User ({
        email : args.userInput.email,
        password : hashPassword
    });
    return await user.save();
  },
  login : async ({email,password}) => {
    const user = await User.findOne({email});
    if (!user) throw new Error('User does not exists');
    const result = await bcryptjs.compare(password,user.password);
    console.log(result)
    if (!result) throw new Error('Password is not valid');
    var token = jwt.sign({userId:user.id,email:user.email},'atom301',{expiresIn:'1h'});
    return {
      userID : user.id,
      token,
      tokenExpiration : 1
    }
  }
}
