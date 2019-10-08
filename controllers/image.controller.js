const fs = require('fs');
const path = require('path');
const sidebar = require('../helpers/sidebar.helper');
const Models = require('../models');

const control = {
  getById: (req, res) => {
    const viewModel = {
      image: {},
      comments: []
    };

    Models.Image.findOne(
      { filename: { $regex: req.params.image_id } },
      (err, image) => {
        if (err) throw err;
        if (image) {
          image.views++;
          viewModel.image = image;
          image.save();

          Models.Comment.find(
            { image_id: image._id },
            {},
            { sort: { timestamp: 1 } },
            (err, comments) => {
              if (err) throw err;

              viewModel.comments = comments;
              sidebar(viewModel, (err, viewModel) => {
                if (err) throw err;
                res.render('image', viewModel);
              });
            }
          );
        } else {
          res.redirect('/');
        }
      }
    );
  },
  add: (req, res) => {
    const saveImage = () => {
      if (req.file) {
        const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

        const fileTypes = /jpeg|jpg|png|gif/;
        const tempPath = req.file.path;
        let imgUrl = '';

        for (let i = 0; i < 6; i++) {
          imgUrl += possible.charAt(
            Math.floor(Math.random() * possible.length)
          );
        }

        const isFileExtensionValid = fileTypes.test(
          path.extname(req.file.originalname).toLowerCase()
        );
        const isMimeTypeValid = fileTypes.test(req.file.mimetype);
        const extensionName = path.extname(req.file.originalname);
        const targetPath = path.resolve(
          'public/uploads/temp/' + imgUrl + extensionName
        );

        if (isMimeTypeValid && isFileExtensionValid) {
          fs.rename(tempPath, targetPath, err => {
            if (err) throw err;
            res.redirect('/images/99');
          });
        } else {
          fs.unlink(tempPath, err => {
            if (err) throw err;
            res.status(500).json({
              error: `Only image files are allowed!`
            });
          });
        }
      }
    };

    saveImage();
  },
  like: (req, res) => {
    res.json({ like: 1 });
  },
  comment: (req, res) => {
    res.send('The Comment on image POST controller');
  }
};

module.exports = control;
