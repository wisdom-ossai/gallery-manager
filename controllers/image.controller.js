const control = {
  getAll: (req, res) => {
    res.send('Get all Images. This is written from the image controller');
  },
  getById: (req, res) => {
    res.send(`Get single Image by its id: ${req.params.image_id}`);
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
