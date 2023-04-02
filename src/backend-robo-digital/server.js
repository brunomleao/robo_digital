const express = require('express');
const sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');

// cria uma instância do Express
const app = express();

// configura o Express para servir arquivos estáticos da pasta frontend-robo-digital
app.use(express.static('../frontend-robo-digital'));

// configurações para permitir requisições CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// cria uma conexão com o banco de dados SQLite
const db = new sqlite3.Database('./database.sqlite', (error) => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  } else {
    console.log('Conectado ao banco de dados.');
  }
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// define a rota POST '/dados' para receber dados do formulário e inserir no banco de dados
app.post('/dados', (req, res) => {
  const dadosFormulario = req.body;
  console.log(dadosFormulario);
  // verifica se os dados recebidos são válidos
  if (
    dadosFormulario.x == null ||
    dadosFormulario.y == null ||
    dadosFormulario.z == null ||
    dadosFormulario.x == '' ||
    dadosFormulario.y == '' ||
    dadosFormulario.z == '' ||
    isNaN(dadosFormulario.x) ||
    isNaN(dadosFormulario.y) ||
    isNaN(dadosFormulario.z)
  ) {
    console.error(
      'Erro ao inserir registro no banco de dados: Dados inválidos'
    );
    res
      .status(500)
      .send('Erro ao inserir registro no banco de dados: Dados inválidos');
  } else {
    // insere os dados recebidos no banco de dados
    db.run(
      'INSERT INTO dados (x, y, z) VALUES (?, ?, ?)',
      [dadosFormulario.x, dadosFormulario.y, dadosFormulario.z],
      (error) => {
        if (error) {
          console.error('Erro ao inserir registro no banco de dados:', error);
          res.status(500).send('Erro ao inserir registro no banco de dados.');
        } else {
          console.log('Registro inserido com sucesso no banco de dados!');
          res
            .status(200)
            .send('Registro inserido com sucesso no banco de dados!');
        }
      }
    );
  }
});

// define a rota GET '/dados' para buscar o dado mais recente no banco de dados
app.get('/dados', (req, res) => {
  db.all('SELECT * FROM dados ORDER BY id DESC LIMIT 1', (error, rows) => {
    if (error) {
      console.error('Erro ao buscar registro no banco de dados:', error);
      res.status(500).send('Erro ao buscar registro no banco de dados.');
    } else {
      console.log('Registro buscado com sucesso no banco de dados!');
      res.status(200).send(rows);
    }
  });
});

// abre o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado.');
});
