const express = require ('express');

const multer = require ('multer');
const uploadConfig = require ('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes = express.Router();
const upload = multer(uploadConfig);

// req.query acessar query params ex /users?idade=20 (para filtros)
// req.params acessar route params ex /users/1 (para edicao e delete )
// req.body acessar corpo da requisicao (para criacao, edicao)

//app.put('/users/:id', (req, res) => {
    //app.post('/users', (req, res) => {
    //return res.send('hello')    ;
    //return res.json({message: 'hello'});
    //return res.json({idade: req.query.idade})
    //return res.json({id: req.params.id})
    //return res.json(req.body)
//})

routes.post('/sessions', SessionController.store);

routes.post('/spots', upload.single('thumbnail') , SpotController.store);
routes.get('/spots', SpotController.index);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = routes;