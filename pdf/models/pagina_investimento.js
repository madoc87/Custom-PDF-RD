// pagina_modelo.js
const path = require('path');
const fs = require('fs');
const { list, moveDown } = require('pdfkit');


function criarPagina(doc, dados, imagem) {
  doc.registerFont('MS-Black', 'pdf/public/fonts/Montserrat-Black.ttf')
  doc.registerFont('MS-Bold', 'pdf/public/fonts/Montserrat-Bold.ttf')
  doc.registerFont('MS-SemiBold', 'pdf/public/fonts/Montserrat-SemiBold.ttf')
  doc.registerFont('MS-Medium', 'pdf/public/fonts/Montserrat-Medium.ttf')
  doc.registerFont('MS-Regular', 'pdf/public/fonts/Montserrat-Regular.ttf')
   
  const sizeFontPP = 14;
  const sizeFontP = 16;
  const sizeFontH2 = 30;
  const sizeFontH3 = 22;
  const lineG = 5;


  //#############################################################
  //################### Pagina Investimento #####################
  //#############################################################

  //Defina a imagem de background para cobrir toda a página
  const backgroundImagePath = path.join(__dirname, '..', 'public', 'images', 'BG_Investimento_RD_Apresentacao.png');
  doc.image(backgroundImagePath, 0, 0, {
    fit: [doc.page.width, doc.page.height],
    align: 'center',
    valign: 'center',
  });

  //doc.rect(0, 0, doc.page.width, doc.page.height).fill('#ccc');
  
  doc
  //Texto Projeto
  //.fillColor('#FFF')
  .font('MS-Bold', 18)
  .text(`O projeto contempla:`, 100, 220, {align: 'left'})

  .font('MS-Regular', 17)
  .text(`${dados.txProjeto}`, {width: 550, align: 'left', lineGap: lineG})

  .moveDown(1)
  //Texto Investimento
  .font('MS-Bold', sizeFontP)
  .text(`Investimento:`,{lineGap:lineG})

  .font('MS-Regular', sizeFontP)
  .text(`R$ ${dados.investimento}`,{lineGap:lineG}) //6.000,00

  //Texto Desconto  
  .moveDown(1)
  .font('MS-Bold', sizeFontP)
  .text(`Desconto de ${dados.pDesconto}%`,{continued: true, width: 550, lineGap:lineG}) //20%

  .font('MS-Regular', sizeFontP)
  .text(`( pagamento no ato da assinatura do contrato):`)

  .font('MS-Regular', sizeFontP)
  .text(`R$ ${dados.vDesconto}`,{lineGap:lineG}) //5.000
  
}

module.exports = function(doc, userData, imagem) {
  criarPagina(doc, userData, imagem); //Chame a função criarPagina para adicionar conteúdo ao PDF usando o objeto 'doc', 'userData' e passar os dados do arquivo 'imagem'
}