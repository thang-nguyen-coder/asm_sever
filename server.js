const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const apisp = require('./src/api/SanPham')
const apiU = require('./src/api/user');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));   

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.get('/sanpham', apisp.getSP);
app.post('/sanpham', apisp.add);
app.post('/xoasanpham', apisp.deleteProduct);
app.post('/upsanpham', apisp.editPro);
app.post('/chitiet', apisp.chiTiet);


app.post('/signin', apiU.api_Login);

app.post('/reg', apiU.api_Reg);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});