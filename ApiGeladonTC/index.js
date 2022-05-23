const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/paletas.route')


const port = 3000;
const app = express();



app.use(express.json());
app.use(cors())
app.use('/paletas', routes)


// const paletas = [
//     {
//       id: 1,
//       sabor: 'Açaí com Leite Condensado',
//       descricao:
//         'Quam vulputate dignissim suspendisse in est ante in nibh mauris.',
//       foto: 'assets/images/acai-com-leite-condensado.png',
//       preco: 10.0,
//     },
//     {
//       id: 2,
//       sabor: 'Banana com Nutella',
//       descricao:
//         'Quam vulputate dignissim suspendisse in est ante in nibh mauris.',
//       foto: 'assets/images/banana-com-nutella.png',
//       preco: 10.0,
//     },
//     {
//       id: 3,
//       sabor: 'Milho verde',
//       descricao:
//         'Quam vulputate dignissim suspendisse in est ante in nibh mauris.',
//       foto: 'assets/images/milho-verde.png',
//       preco: 7.0,
//     },
//     {
//         id: 4,
//         sabor: 'Chocolate Belga',
//         descricao:
//           'Quam vulputate dignissim suspendisse in est ante in nibh mauris.',
//         foto: 'assets/images/chocolate-belga.png',
//         preco: 7.0,
//       },
//   ];

// /* rota de get all */
// app.get('/paletas/todas-paletas', (req, res) => {    
//     res.send(paletas);
// });

/* rota de get by id */
// app.get('/paletas/paleta/:id', (req, res) => {
//     const parametroId = +req.params.id;
//     const escolhaPaleta = paletas.find((paleta) => paleta.id === parametroId);
//     res.send(escolhaPaleta);
// });
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);

});
