const Models = require('../models');
const Async = require('async');

module.exports = cb => {
  Async.parallel(
    [
      next => {
        Models.Image.count({}, (err, total) => next(err, total));
        
      },
      next => {
        Models.Comment.count({}, next);
      },
      next => {
        Models.Image.aggregate(
          [{ $group: { _id: 'l', viewsTotal: { $sum: '$views' } } }],
          (err, result) => {
            if (err) throw err;
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
        Models.Image.aggregate([
          { $group: { _id: 'l', totalLikes: { $sum: '$likes' } } }
        ],
          (err, result) => {
            if (err) throw err;
            let totalLikes = 0;
            if (result.length > 0) {
              totalLikes += result[0].totalLikes
            }
            next(null, totalLikes);
        })
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
