// pagina_modelo.js
const path = require('path');
const fs = require('fs');
const { list, moveDown } = require('pdfkit');


function criarPagina(doc, dados, imagem) {
  doc.registerFont('MS-Black', 'public/fonts/Montserrat-Black.ttf')
  doc.registerFont('MS-Bold', 'public/fonts/Montserrat-Bold.ttf')
  doc.registerFont('MS-SemiBold', 'public/fonts/Montserrat-SemiBold.ttf')
  doc.registerFont('MS-Medium', 'public/fonts/Montserrat-Medium.ttf')
  doc.registerFont('MS-Regular', 'public/fonts/Montserrat-Regular.ttf')
   
  const sizeFontPP = 14;
  const sizeFontP = 19;
  const sizeFontH2 = 30;
  const sizeFontH3 = 22;

  //#############################################################
  //###################### Pagina 3 Resumo ######################
  //#############################################################
  doc    
    //Resumo 1
    .fillColor('#000')

    //Titulo
    .font('MS-Bold', 21)
    .text(`FACEBOOK`, 100, 200, {align: 'left'})

    //Sub
    .moveDown()
    .font('MS-SemiBold', 17)
    .text(`Foram feitas 31 publicações durante o período de ${dados.data} que originam um total de:`, 100, 230,  {width: 340, align: 'left'}) //100, 253,

    doc.moveDown()
    .fillColor('#ff572e')
    .font('MS-Bold', 20)

    //Topico 1 - Bullet
    // .text(`• `, {
    //   align: 'left', 
    //   lineGap: 1.5, 
    //   continued: true,
    // })

    //doc.circle(102, 322, 3).fill('#6600FF'); //Bullet - Topico 1
    
    doc.fillColor('#ff572e')
    .fontSize(sizeFontPP)
    .text(`• 23.200 de alcance `, {lineGap: 2, continued: true})

    .font('MS-Regular', sizeFontPP)
    .text(`6.4 mil % a mais que o período anterior;`)

    //Topico 2
    //doc.circle(102, 341, 3).fill('#ff572e'); //Bullet - Topico 2

    doc.font('MS-Bold', sizeFontPP)
    .text(`• 104 visitas, `,{lineGap: 2, continued: true})

    .font('MS-Regular', sizeFontPP)
    .text(`65,1% a mais que o período anterior;`)

    //Topico 3
    //doc.circle(102, 360, 3).fill('#ff572e'); //Bullet - Topico 3
    doc.font('MS-Bold', sizeFontPP)
    .text(`• 2 novas curtidas na página,`,{lineGap: 2, continued: true})

    .font('MS-Regular', sizeFontPP)
    .text(`100% de diferença em relação ao período antrior;`)

    //Topico 4
    //doc.circle(102, 379, 3).fill('#ff572e'); //Bullet - Topico 4
    doc.font('MS-Bold', sizeFontPP)
    .text(`• 16 interações`,{lineGap: 2, continued: true})

    .font('MS-Regular', sizeFontPP)
    .text(`(curtidas, comentários e compartilhamentos), 128,6% a mais que o período anterior.`)


    doc    
    //Resumo 2
    .fillColor('#000')

    //Titulo
    .font('MS-Bold', 21)
    .text(`INSTAGRAM`, 100, 460, {align: 'left'})

    //Sub
    .font('MS-SemiBold', 17)
    .text(`Foram feitas 31 publicações durante o período de ${dados.data} que originam um total de:`, 100, 490, {width: 340, align: 'left'}) //100, 253,

    doc.moveDown()
    .fillColor('#ff572e')

    //Topico 1
    .font('MS-Bold', sizeFontPP)
    .text(`• 22.666 de alcance `, {align: 'left', lineGap: 1.5, continued: true}) //, 100, 320

    .font('MS-Regular', sizeFontPP)
    .text(`660.6 % a mais que o período anterior;`)

    //Topico 2
    .font('MS-Bold', sizeFontPP)
    .text(`• 463 visitas, `,{continued: true})

    .font('MS-Regular', sizeFontPP)
    .text(`23,1% a mais que o período anterior;`)

    //Topico 3
    .font('MS-Bold', sizeFontPP)
    .text(`• 152 novas seguidores,`,{continued: true})

    .font('MS-Regular', sizeFontPP)
    .text(`49% a mais que o período antrior;`)

    //Topico 4
    .font('MS-Bold', sizeFontPP)
    .text(`• 336 interações`,{continued: true})

    .font('MS-Regular', sizeFontPP)
    .text(`(curtidas, comentários e compartilhamentos), 17,1% a mais que o período anterior.`)
  

  //#############################################################
  //####################### Pagina 1 Capa #######################
  //#############################################################
  doc.addPage()
  //Adicione a imagem ao PDF se 'imagem' for fornecida e o arquivo de imagem existir
  if (imagem && fs.existsSync(imagem.path)) {

    const imagePath = path.join(__dirname, '..', 'public', 'uploads', imagem.filename); //Use o caminho correto para a imagem carregada

    doc.image(imagePath, 190, 290, {
      fit: [250, 300],
      align: 'center',
      valign: 'center',
      absolutePosition: { x: 300, y: 500 }, // Defina a posição absoluta da imagem
    });
  }

  //Defina a imagem de background para cobrir toda a página
  const backgroundImagePath = path.join(__dirname, '..', 'public', 'images', 'BG_RD Interna.png');
  doc.image(backgroundImagePath, 0, 0, {
    fit: [doc.page.width, doc.page.height],
    align: 'center',
    valign: 'center',
  });

  // doc
  // .image('public/images/BG_RD Interna.png', 0, 0, {
  //   fit: [doc.page.width, doc.page.height],
  //   align: 'center', 
  //   valign: 'center',
  // });
  
  const upTipoDoc = dados.tipoDoc.toUpperCase(); // Transforma o texto em caixa alta
  doc
    .fillColor('#ff572e')
    .font('MS-Black', 30)  
    .text(`${upTipoDoc}`, 100, 280, {align: 'center'})
    .font('MS-SemiBold', 25)
    .fillColor('black')
    .text(`${dados.assunto}`, 100, 320, {align: 'center'})
    // .image(imagePath, 100, 280)
    .font('MS-Bold', 18)
    .text(`CLIENTE: ${dados.cliente}`, 100, 565, {align: 'center'})
    .text(`DATA: ${dados.data}`, 100, 590, {align: 'center'});

  //Pagina 2 - Intro
  // doc.addPage()
  // .fillColor('red')
  // .font('Helvetica-Bold', 30)
  // .text(`Olá, seja`, 100, 180, {align: 'center'})
  // .text(`bem-vindo!`, 100, 200, {align: 'center'})

  // .font('Helvetica', 20)
  // .text(`Esse ${dados.tipoDoc} irá apresenta os resultados das ações realizadas em nosso projeto de marketing digital para o ${dados.assunto} da ${dados.cliente}.`, 100, 230, {align: 'center'})

  // .text(`Mostraremos os dados referentes ao período de ${dados.data}, a fim de explorar os pontos forte e criar soluções estratégicas para melhorar ainda mais o desempenho.`, 100, 320, {align: 'center'})

  // .font('Times-Roman', 13)
  // .moveDown()
  // .text(lorem,{
  //   width: 412,
  //   align: 'justify',
  //   ident: 30,
  //   columns: 2,
  //   height: 300,
  //   ellipsis: true
  // });

  //#############################################################
  //####################### Pagina 2 Intro ######################
  //#############################################################
  doc.addPage()
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#FF642F');
  //FF642F
  //FF5E25 OK

  doc
  .fillColor('#FFF')
  .font('MS-Bold', sizeFontH2)
  .text(`Olá, seja`, 100, 220, {align: 'left'})
  .text(`bem-vindo!`, 100, 253, {align: 'left'})

  .font('MS-Regular', sizeFontP)
  .text(`Esse ${dados.tipoDoc} irá apresenta os resultados das ações realizadas em nosso projeto de marketing digital para o `, 100, 320, {width: 340, align: 'left', lineGap: 1.5, continued: true})

  .font('MS-Medium', sizeFontP)
  .text(`${dados.assunto}`,{continued: true})

  .font('MS-Regular', sizeFontP)
  .text(` da `,{continued: true})

  .font('MS-Medium', sizeFontP)
  .text(`${dados.cliente}.`)

  doc.moveDown()
  .font('MS-Regular', sizeFontP)
  .text(`Mostraremos os dados referentes ao período de ${dados.data}, a fim de explorar os pontos forte e criar soluções estratégicas para melhorar ainda mais o desempenho.`, {width: 340, align: 'left', lineGap: 1.5})
}

module.exports = function(doc, userData, imagem) {
  criarPagina(doc, userData, imagem); //Chame a função criarPagina para adicionar conteúdo ao PDF usando o objeto 'doc', 'userData' e passar os dados do arquivo 'imagem'
}