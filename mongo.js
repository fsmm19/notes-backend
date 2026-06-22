import mongoose from 'mongoose';

// if (process.argv.length < 3) {
//   console.log('give password as argument');
//   process.exit(1);
// }

// const password = process.argv[2];
const url =
  'mongodb+srv://fullstackopen:OHcixCoWFk8ZKKQ6@cluster0.47dsmqc.mongodb.net/testNoteApp?appName=Cluster0';

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
  content: 'Nota de prueba 2',
  important: true,
});

note.save().then(() => {
  console.log('note saved!');
  mongoose.connection.close();
});

// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });
