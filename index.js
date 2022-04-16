const { connect } = require("http2");
const { password } = require("pg/lib/defaults");

require("dotenv").config();

const Client = require("pg").Client;
const cliente = new Client({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.LOCALHOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
});

//cliente.connect();
cliente.query("select * from carros").then((results) => {
  const resultado = results.rows;
  console.table(resultado);
});
//.finally(() => cliente.end());

//getCarros();
//insCarros("Hyudai", "HB20")
delCarro();

/*async function getCarros() {
  try {
    console.log("Iniciando a conexão");
    await cliente.connect();
    console.log("Conexão bem sucedidada!");
    const resultado = await cliente.query("select * from carros");
    //console.table(resultado.rows);
  } catch (ex) {
    console.log("Ocorreu um erro no getCarros. Erro:" + ex);
  } finally {
    //await cliente.end();
    //console.log("Cliente desconectado");
  }
}*/

/*async function insCarros(marca, modelo) {
  try {
    console.log("Iniciando a conexão");
    await cliente.connect();
    console.log("Conexão bem sucedida!");
    await cliente.query('insert into carros("marca", "modelo") values('+"'" +marca +"', '" +modelo +"');");
    console.log("Valor inserido na tabela");

    const resultado = await cliente.query("select * from carros");
    console.table(resultado.rows);
  } 
  catch (ex) {
    console.log("Ocorreu um erro no insCarros. Erro:"+ ex);
  } 
  finally {
    await cliente.end();
    console.log("Cliente desconectado");
  }
}
  */

async function delCarro(id) {
  try {
    console.log("Iniciando a conexão");
    cliente.connect();
    console.log("Conexão bem sucedida!");
    await cliente.query(`DELETE FROM Carros WHERE id = ${id};`);
    console.log("Carro deletado " + id);
    console.log("Item removido da tabela");

    const resultado = await cliente.query("select * from carros");
    console.table(resultado.rows);
  }
    catch {
    } 
    finally {
      await cliente.end();
      console.log("Cliente desconectado");
    }
}
