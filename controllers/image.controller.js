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
