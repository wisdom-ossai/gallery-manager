const fs = require('fs');
const path = require('path');
const sidebar = require('../helpers/sidebar.helper');
const Models = require('../models');
const md5 = require('MD5');
const gravatar = require('gravatar');

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

        Models.Image.find({ filename: imgUrl }, (err, images) => {
          if (err) throw err;
          if (images.length > 0) {
            saveImage();
          } else {
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
                let newImg = new Models.Image({
                  title: req.body.title,
                  description: req.body.description,
                  filename: imgUrl + extensionName
                });
                newImg.save((err, image) => {
                  if (err) throw err;
                  console.log('Successfully inserted image: ' + image.filename);
                  res.redirect('/images/' + image.uniqueId);
                });
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
        });
      }
    };

    saveImage();
  },
  like: (req, res) => {
    Models.Image.findOne(
      { filename: { $regex: req.params.image_id } },
      (err, image) => {
        if (!err && image) {
          image.likes++;
          image.save(err => {
            if (err) res.json(err);
            res.json({ likes: image.likes });
          });
        }
      }
    );
  },
  comment: (req, res) => {
    Models.Image.findOne(
      { filename: { $regex: req.params.image_id } },
      (err, image) => {
        if (!err && image) {
          const newComment = new Models.Comment(req.body);
          newComment.gravatar = gravatar.url(
            newComment.email,
            { s: '100', r: 'x', d: 'retro' },
            true
          );
          newComment.image_id = image._id;
          newComment.save((err, comment) => {
            if (err) throw err;

            res.redirect(`/images/${image.uniqueId}#${comment._id}`);
          });
        } else {
          res.redirect('/');
        }
      }
    );
  }
};

module.exports = control;
