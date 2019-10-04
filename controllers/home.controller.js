module.exports = (req, res) => {
  let viewModel = {
    images: [
      {
        uniqueId: 1,
        title: 'Sample Image 1',
        description: `Some quick example text to build on the card title and make up the bulk of the card's content.`,
        filename: 'sample1.jpg',
        views: 0,
        likes: 0,
        timestamp: Date.now
      },
      {
        uniqueId: 2,
        title: 'Sample Image 2',
        description: `Some quick example text to build on the card title and make up the bulk of the card's content.`,
        filename: 'sample2.jpg',
        views: 0,
        likes: 0,
        timestamp: Date.now
      },
      {
        uniqueId: 3,
        title: 'Sample Image 3',
        description: `Some quick example text to build on the card title and make up the bulk of the card's content.`,
        filename: 'sample3.jpg',
        views: 0,
        likes: 0,
        timestamp: Date.now
      },
      {
        uniqueId: 4,
        title: 'Sample Image 4',
        description: `Some quick example text to build on the card title and make up the bulk of the card's content.`,
        filename: 'sample4.jpg',
        views: 0,
        likes: 0,
        timestamp: Date.now
      }
    ]
  };
  res.render('index', viewModel);
};
