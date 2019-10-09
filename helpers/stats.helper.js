const Models = require('../models');
const Async = require('async');

module.exports = cb => {
  Async.parallel(
    [
      next => {
        Models.Image.count({}, next);
      },
      next => {
        Models.Comment.count({}, next);
      },
      next => {
        Models.Image.aggregate(
          [{ $group: { _id: 'l', viewsTotal: { $sum: '$views' } } }],
          (err, result) => {
            let viewsTotal = 0;
            if (result.length > 0) {
              console.log(result);
              viewsTotal += result[0].viewsTotal;
            }
            next(null, viewsTotal);
          }
        );
      },
      next => {
        next(null, 0);
      }
    ],
    (err, results) => {
      cb(null, {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
      });
    }
  );
};
