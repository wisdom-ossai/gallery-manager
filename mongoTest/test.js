const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/mongotest', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('connected to mongodb through mongoose');
});

const Account = new Schema({
  username: { type: String, required: true },
  date_created: { type: Date, default: Date.now },
  visits: { type: Number, default: 0 },
  active: { type: Boolean, default: false },
  age: { type: Number, required: true, min: 13, max: 100 }
});

// Using Static Methods
Account.static.findByAgeRange = (min, max, cb) => {
  this.find({ age: { $gt: min, $lte: max } }, cb);
};

// Using Virtual Methods
Account.virtual('fullname')
  .get(() => {
    return this.firstname + ' ' + this.lastname;
  })
  .set(fullname => {
    let parts = fullname.split(' ');
    this.firstname = parts[0];
    this.lastname = parts[1];
  });
var AccountModel = mongoose.model('Account', Account);
var newUser = new AccountModel({ username: 'randomUser', age: 11 });
newUser.validate(err => {
  console.log(err._message);
});
console.log(newUser.username);
console.log(newUser.date_created);
console.log(newUser.visits);
console.log(newUser.active);
console.log(newUser.age);

newUser.save();

// const MongoClient = require('mongodb').MongoClient;

// MongoClient.connect(
//   'mongodb://localhost:27017',
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (err, client) => {
//     if (err) throw err;
//     // let collection = db.collection('testCollection');
//     console.log('Mongo is connected Successfully!');

//     const db = client.db('testmongo');
//     const collection = db.collection('dogs');
//     collection.insert({ name: 'Roger' }, (err, doc) => {
//       if (err) throw err;
//       console.log(doc.ops.length + ' record added successfully');
//       console.log(doc.ops[0].name + ' - ' + doc.ops[0]._id);

//       collection.findOne({ name: 'Roger' }, (err, record) => {
//         if (err) throw err;
//         console.log(record._id + ' - ' + record.name);
//       });

//       collection.insertMany(
//         [{ name: 'Togo' }, { name: 'Syd' }],
//         (err, result) => {
//           if (err) throw err;
//           console.log(result);
//         }
//       );

//       collection.find().toArray((err, record) => {
//         if (err) throw err;
//         console.log(record);
//         // console.log(record._id + ' - ' + record.name);
//       });
//     });
//   }
// );
