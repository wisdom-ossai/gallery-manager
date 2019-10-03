const control = {
  getById: (req, res) => {
    res.render('image');
  },
  add: (req, res) => {
    res.send('The Add Image controller POST request');
  },
  like: (req, res) => {
    res.send('The Like Image POST Controller');
  },
  comment: (req, res) => {
    res.send('The Comment on image POST controller');
  }
};

module.exports = control;
