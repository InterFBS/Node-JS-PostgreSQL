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
//insCarros( "Ferrari", "Z2");
delCarro('Ferrari');

async function getCarros() {
  try {
    console.log("Iniciando a conexão");
    await cliente.connect();
    console.log("Conexão bem sucedidada!");
    const resultado = await cliente.query("select * from carros");
    console.table(resultado.rows);
  } catch (ex) {
    console.log("Ocorreu um erro no getCarros. Erro:" + ex);
  } finally {
    console.log("Cliente desconectado");
  }
}
/*
INSERIR
*/
async function insCarros(marca, modelo) {
  try {
    console.log("Iniciando a conexão");
    await cliente.connect();
    console.log("Conexão bem sucedida!");
    await cliente.query(
      'insert into carros("marca", "modelo") values(' +
        "'" +
        marca +
        "', '" +
        modelo +
        "');"
    );
    console.log("Valor inserido na tabela");

    const resultado = await cliente.query("select * from carros");
    console.table(resultado.rows);
  } catch (ex) {
    console.log("Ocorreu um erro no insCarros. Erro:" + ex);
  } finally {
    await cliente.end();
    console.log("Cliente desconectado");
  }
}
/*
DELETE
*/
async function delCarro (modelo) {
  console.log();
  try {
    console.log("Iniciando a conexão");
    cliente.connect();
    console.log("Conexão bem sucedida!");
    await cliente.query(`DELETE FROM public.carros
    WHERE modelo = '${modelo}';`);
    console.log("Item removido da tabela"+modelo);

    const resultado = await cliente.query("select * from carros");
    console.table(resultado.rows);
  } catch {
  } finally {
    await cliente.end();
    console.log("Cliente desconectado");
  }
}
