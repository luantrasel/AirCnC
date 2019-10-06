const User = require ('../models/User');

module.exports = { 
    async store (req, res) {
        //return res.json({message: "hello"});
        const email = req.body.email;

        let user = await User.findOne({email: email});

        if (!user){
            user = await User.create({ email });
        }

        return res.json(user);
    }
}