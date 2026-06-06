import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];

const generateId = () =>
  notes.length > 0 ? Math.max(...notes.map((note) => note.id)) + 1 : 1;

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
  const note = notes.find((note) => note.id === Number(request.params.id));

  return note ? response.json(note) : response.status(404).end();
});

app.delete('/api/notes/:id', (request, response) => {
  notes = notes.filter((note) => note.id !== Number(request.params.id));
  response.status(204).end();
});

app.post('/api/notes', (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };

  notes = notes.concat(note);
  response.json(request.body);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
