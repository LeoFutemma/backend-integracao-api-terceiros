const axios = require('axios');
const fs = require('fs/promises');

async function obterVoto(req, res) {
  const { pais, ip } = req.params;
  const { voto } = req.body;

  if (voto !== Boolean(voto)) {
    return res.status(400).json({ erro: "É obrigatório declarar o voto como true ou false!" });
  }

  try {
    const votoEnviado = await axios.get('https://ipgeolocation.abstractapi.com/v1/', {
      params: {
        api_key: '58cafbe4558f425d8e8c731e3b26fbe0',
        ip_address: `${ip}`
      }
    })

    if (!votoEnviado.data.country) {
      return res.status(400).json({ erro: "IP inválido!" });
    }

    if (votoEnviado.data.country_code !== pais.toUpperCase()) {
      return res.status(400).json({ erro: "O IP não coincide com o país de votação declarado!" });
    }

    const votoValido = { ip, voto };
    const votoComputado = JSON.parse(await fs.readFile('./votos.json'));
    votoComputado.push(votoValido);
    fs.writeFile('./votos.json', JSON.stringify(votoComputado, null, 1));

    return res.json("Voto computado com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function listarVotos(req, res) {
  try {
    const listaDeVotos = JSON.parse(await fs.readFile('./votos.json'));

    return res.json(listaDeVotos);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = { obterVoto, listarVotos };