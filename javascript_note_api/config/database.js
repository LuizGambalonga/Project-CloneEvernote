const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/javascriptNote', {
  useNewUrlParser: true,
  useUnifiedTopology: true
  // useCreateIndex: true
}
).then(() => console.log('Conexão Efetuada com Sucesso'))
  .catch((err) => console.error(err));