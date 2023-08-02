// Importando as dependências
const express = require('express');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer');
// Configurando o Multer para salvar a imagem carregada no diretório 'public/uploads'
// const upload = multer({ dest: 'uploads/' });
const upload = multer({ dest: 'public/uploads/' });

// Configurando o servidor Express
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public')); //Adicionar pasta onde está o arquivo CSS para que o Express possa ler

app.use(express.urlencoded({ extended: true })); //Geração de paginas dinamicas

//app.use(express.static('public')); //Geração de paginas estaticas

// Rota para renderizar a página inicial
app.get('/', (req, res) => {
  res.render('index');
});

// Rota para receber os dados enviados pelo usuário 
//###########################################
app.post('/gerar-pdf', upload.single('imagem'), (req, res) => {
//###########################################

    const { 
        //Variaveis Relatorio
        tipoDoc, assunto, cliente, data, 

        //Variaveis Apresentação


        //Variaveis Pagina de investimento
        txProjeto, investimento, pDesconto, vDesconto 
    } = req.body;

    const imagem = req.file; // Dados do arquivo de imagem enviado. O Multer armazenará os detalhes da imagem carregada em req.file

    // Validar dados de entrada
    if (!tipoDoc || !assunto || !cliente || !data) {
        return res.status(400).send('Por favor, preencha todos os campos.');
    }

    // Gerar o PDF com base nas informações recebidas e define o tamanho do arquivo PDF para A4
    const doc = new PDFDocument({size: 'A4', layout : 'landscape'});

    //doc.pipe(fs.createWriteStream('output.pdf')); //Metodo basico de teste para salvar o PDF com um nome estatico
    //const pdfName = `output-${uuidv4()}.pdf`; // Usando o ID único no nome do PDF

    const pdfName = `pdf_${Date.now()}.pdf`;
    const pdfPath = path.join(__dirname, 'pdfs', pdfName); //Pasta onde os PDFs gerados vão ser salvos

    //Crie o diretório 'pdfs' se ele não existir
    const pdfsDirectory = path.join(__dirname, 'pdfs');
    if (!fs.existsSync(pdfsDirectory)) {
        fs.mkdirSync(pdfsDirectory);
    }

    //doc.pipe(fs.createWriteStream(pdfName));
    doc.pipe(fs.createWriteStream(pdfPath));


    // Use o 'pagina_modelo.js' para gerar conteúdo dinâmico
    // require('./models/pagina_modelo_2.js')(doc, { tipoDoc, assunto, cliente, data }, imagem);

    require('./models/'+tipoDoc+'.js')(doc, { 
        
        //Variaveis Relatorio
        tipoDoc, assunto, cliente, data, 

        //Variaveis Apresentação


        //Variaveis Pagina de investimento
        txProjeto, investimento, pDesconto, vDesconto 

    }, imagem);


    // Adicionar conteúdo ao PDF
    // Esse conteudo foi movido para os arquivos modelos
    // doc.fontSize(20).text(`${tipoDoc}`);
    // doc.fontSize(20).text(`Idade: ${idade}`);
    // doc.fontSize(20).text(`Profissão: ${profissao}`);


    // Adicionar a imagem ao PDF
    // if (imagem) {
    //     // Assumindo que o arquivo está armazenado no diretório 'uploads/' com o nome fornecido por Multer
    //     const imagePath = path.join(__dirname, 'uploads', imagem.filename);
    //     doc.image(imagePath, {
    //     fit: [250, 300], // Define a largura e a altura da imagem
    //     align: 'center', // Alinha a imagem ao centro da página horizontalmente
    //     valign: 'center', // Alinha a imagem ao centro da página verticalmente
    //     });
    // }


    doc.end(); // Finalize the PDF

    //Caso o PDF esteja sendo enviado vazio para o cliente, pode definir um delay de 1 segundo após a criação do PDF para dar tempo ao sistema de arquivos para gravar completamente o PDF.
    // setTimeout(() => {
    //     console.log("Atraso de 1 segundo.");
    //   }, 1000);
      

  // Ao finalizar a geração do PDF, enviamos o PDF como resposta para download
  doc.on('end', () => {
        // Configurando os headers da resposta
        res.setHeader('Content-Disposition', `attachment; filename="${pdfName}"`);

        res.setHeader('Content-Type', 'application/pdf');  


        // Lendo o arquivo e enviando como resposta
        //const pdfReadStream = fs.createReadStream(pdfName);
        const pdfReadStream = fs.createReadStream(pdfPath);
        pdfReadStream.pipe(res);


        pdfReadStream.on('error',() =>{
            res.status(500).end('Erro ao ler o PDF');
        });
        // doc.pipe(res);
        // doc.end(); //Sugestão do Gepeto, mas ocorreu erro por ser chamado duas vezes no código.
    });


    //res.send('PDF gerado com sucesso!'); //Ao gerar o PDF ele carregar o texto como feedback ao usuario.

    // Tratar erros durante a geração do PDF
    doc.on('error', (err) => {
        console.error('Erro ao gerar o PDF:', err);
        res.status(500).send('Ocorreu um erro ao gerar o PDF. Por favor, tente novamente mais tarde.');
    });
  
});

// Iniciando o servidor
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
