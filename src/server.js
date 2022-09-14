const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');

// Объявляем сервер
const app = express();
const port = 5000;

// middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// Роут по умолчанию для сервера
app.get('/', (req, res) => res.status(200).send({
  message: "Сервер запущен..."
}));


const WriteTextToFileAsync = async (contentToWrite) => {
  fs.writeFile('./src/mockJsonConfig/config_tram30.json', contentToWrite, (err) => {
    console.log(contentToWrite);
    if(err) {
      console.log('Случилась проблема');
    } else {
      console.log('Готово. Произошла запись в файл...');
    }
  })
}


// Declare post / write route to accept incoming request with data
app.post('/write', async (req, res, next) => {
  // take the body from incoming request by using req.body and convert it into string
  const requestContent = JSON.stringify(req.body);
  await WriteTextToFileAsync(requestContent)
});



// 404 route for server
app.use((req, res, next) => res.status(404).send({
  message: "Не найден указанный url...!"
}));

// Run server
app.listen(port, () => {
  console.log(
    `
    !!! Сервер запущен
    !!! Прослушивание входящих запросов по порту - ${port}
    !!! http://localhost:5000
    `
  )
});

