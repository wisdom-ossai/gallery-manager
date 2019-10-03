const homeController = require('../controllers/home.controller');
const imageController = require('../controllers/image.controller');

module.exports.initialize = (app, router) => {
  router.get('/', homeController);
  router.get('/images/:image_id', imageController.getById);

  router.post('/image', imageController.add);
  router.post('/images/:image_id/like', imageController.like);
  router.post('/images/:image_id/comment', imageController.comment);

  app.use('/', router);
};
