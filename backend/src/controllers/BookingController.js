const Booking = require ('../models/Booking');

module.exports = {
    async store (req, res) {
        const user_id = req.headers.user_id;
        const spot_id = req.params.spot_id;
        const date = req.body.date;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date    
        });

        await booking.populate('spot').populate('user').execPopulate();

        //req.connectedUsers e req.io disponiveis pois foram passados no server.js para todas requisicoes
        const ownerSocket = req.connectedUsers[booking.spot.user];
        
        if (ownerSocket){            
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
}