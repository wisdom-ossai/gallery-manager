const fs = require('fs');
const multer = require('multer');
const path = require('path');

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

    res.render('image', viewModel);
  },
  add: (req, res) => {
    const saveImage = () => {
      const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

      const fileTypes = /jpeg|jpg|png|gif/;
      const tempPath = req.file.path;
      let imgUrl = '';

      for (let i = 0; i < 6; i++) {
        imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      const extname = fileTypes.test(
        path.extname(req.file.originalname).toLowerCase()
      );
      const mimeType = fileTypes.test(req.file.mimetype);
      const targetPath = path.resolve(
        './public/uploads/temp' + imgUrl + extname
      );

      if (mimeType && extname) {
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
