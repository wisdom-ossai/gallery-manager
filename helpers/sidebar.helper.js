const Stats = require('./stats.helper');
const Images = require('./images.helper');
const Comments = require('./comments.helper');
const async = require('async');

module.exports = (viewModel, cb) => {
  async.parallel(
    [
      next => {
        Stats(next);
      },
      next => {
        Images.popular(next);
      },
      next => {
        Comments.newest(next);
      }
    ],
    (err, results) => {
      viewModel.sidebar = {
        stats: results[0],
        popular: results[1],
        comments: results[2]
      };

      cb(err, viewModel);
    }
  );
};
