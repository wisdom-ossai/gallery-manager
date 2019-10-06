const Stats = require('./stats.helper');
const Images = require('./images.helper');
const Comments = require('./comments.helper');

module.exports = (viewModel, cb) => {
  viewModel.sidebar = {
    stats: Stats(),
    popular: Images.popular(),
    comments: Comments.newest()
  };

  cb(null, viewModel);
};
