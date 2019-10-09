const models = require('../models');
const async = require('async');
module.exports = {
  newest: cb => {
    models.Comment.find(
      {},
      {},
      { limit: 5, sort: { timestamp: -1 } },
      (err, comments) => {
        if (err) throw err;
        const attachImage = (comment, next) => {
          models.Image.findOne({ _id: comment.image_id }, (err, image) => {
            if (err) throw err;
            comment.image = image;
            next(err);
          });
        };

        async.each(comments, attachImage, err => {
          if (err) throw err;
          cb(err, comments);
        });
      }
    );
  }
};
