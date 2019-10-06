const fs = require('fs');
const path = require('path');
const sidebar = require('../helpers/sidebar.helper');

const control = {
  getById: (req, res) => {
    const viewModel = {
      image: {
        uniqueId: 1,
        title: 'Sample Image 1',
        description: 'This is a sample.',
        filename: 'sample1.jpg',
        views: 0,
        likes: 0,
        timestamp: Date.now()
      },
      comments: [
        {
          image_id: 1,
          email: 'test@testing.com',
          name: 'Test Tester',
          gravatar: 'http://lorempixel.com/75/75/animals/1',
          comment: 'This is a test comment...',
          timestamp: Date.now()
        },
        {
          image_id: 1,
          email: 'test@testing.com',
          name: 'Test Tester',
          gravatar: 'http://lorempixel.com/75/75/animals/2',
          comment: 'Another followup comment!',
          timestamp: Date.now()
        }
      ]
    };

    sidebar(viewModel, (err, viewModel) => {
      if (err) throw err;
      res.render('image', viewModel);
    });
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
          'public/uploads/temp' + imgUrl + extensionName
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
    res.send('The Like Image POST Controller');
  },
  comment: (req, res) => {
    res.send('The Comment on image POST controller');
  }
};

module.exports = control;
