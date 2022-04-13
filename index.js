const { connect } = require("http2");
const { password } = require("pg/lib/defaults");

const Client = require("pg").Client;
const cliente = new Client({
  user: process.env.user,
  password: process.env.password,
  host: process.env.localhost,
  port: process.env.port,
  database: process.env.database,
});

//cliente.connect();
cliente
  .query("select * from carros")
  .then((results) => {
    const resultado = results.rows;
    console.table(resultado);
  })
  //.finally(() => cliente.end());

getCarros();
//insCarros("Hyudai", "HB20")

async function getCarros() {
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
}

/*async function insCarros(marca, modelo) {
  try {
    console.log("Iniciando a conexão");
    await cliente.connect();
    console.log("Conexão bem sucedidada!");
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
