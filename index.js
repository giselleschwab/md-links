import fs from 'fs';
import chalk from "chalk";
//a biblioteca File system é nativa do node.js - não precisa fazer o npm install dela

function extraiLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  // matchAll - método de strings
  //... expande o objeto iteravel  
  const resultados = capturas.map(captura => ({[captura[1]]: [captura[2]]}));
  //usamos o método map para percorrer um array e retornar outro array com o resultado que queremos
  //utilizamos os indíces 1 e 2 que representam os dois grupos de Regex que montamos anteriormente
  console.log(resultados);
}


function trataErro(erro) {
  throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

//código para acessar as informações dos links
function pegaArquivo(caminhoDoArquivo){
  const encoding = 'utf-8';
  fs.promises.readFile(caminhoDoArquivo, encoding) 
    .then((texto) => extraiLinks(texto))
    .catch(trataErro)
}

//transformamos o código em assíncrono pois não sabemos o tamanho do arquivo
pegaArquivo('./arquivo/texto.md')
