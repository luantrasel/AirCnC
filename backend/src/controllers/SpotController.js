const Spot = require ('../models/Spot');
const User = require ('../models/User');

module.exports = { 
    async index (req, res) {
        const tech = req.query.tech;

        const spots = await Spot.find({techs: tech});
        return res.json(spots);
    },

    async store (req, res) {   
        var filename = "";
        if (req.file) {
            filename = req.file.filename;
        }
        
        const {company, techs, price} = req.body;
        const user_id = req.headers.user_id;

        const user = await User.findById(user_id);

        if (!user) {            
            return res.status(400).json({error: "User does not exists"})
        }/* else if (filename === "") {                         
            return res.status(400).json({error: "Selecione uma imagem"})
        }*/

        const spot = await Spot.create({            
            user: user_id,
            thumbnail: filename,
            company,
            price,
            techs: techs.split(',').map(tech => tech.trim()) //separa em array e ja remove espaço de todas posicoes
        })

        return res.json(spot);
    }
}