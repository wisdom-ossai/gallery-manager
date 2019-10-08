const sidebar = require('../helpers/sidebar.helper');
const Models = require('../models');

module.exports = (req, res) => {
  let viewModel = {
    images: []
  };

  Models.Image.find({}, {}, { sort: { timestamp: -1 } }, (err, images) => {
    if (err) throw err;

    viewModel.images = images;
    sidebar(viewModel, (err, viewModel) => {
      if (err) throw err;
      res.render('index', viewModel);
    });
  });
};
