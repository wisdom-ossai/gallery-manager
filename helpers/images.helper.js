const Models = require('../models');

module.exports = {
  popular: cb => {
    Models.Image.find(
      {},
      {},
      { limit: 9, sort: { likes: -1 } },
      (err, images) => {
        if (err) throw err;
        cb(null, images);
      }
    );
  }
};
