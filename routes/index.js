const homeController = require('../controllers/home.controller');
const imageController = require('../controllers/image.controller');
const multer = require('multer');

const upload = multer({
  dest: 'public/uploads/temp',
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

module.exports.initialize = (app, router) => {
  router.get('/', homeController);
  router.get('/images/:image_id', imageController.getById);

  router.post('/image', upload.single('newImage'), imageController.add);
  router.post('/images/:image_id/like', imageController.like);
  router.post('/images/:image_id/comment', imageController.comment);
  router.delete('/images/:image_id', imageController.delete);

  app.use('/', router);
};
