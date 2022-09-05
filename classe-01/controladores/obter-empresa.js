const fs = require('fs/promises');
const axios = require('axios');

async function obterEmpresa(req, res) {
  const { dominioEmpresa } = req.params;

  try {
    const empresa = await axios.get('https://companyenrichment.abstractapi.com/v1/', {
      params: {
        api_key: '34a8499969c4401daf6a685935323c1d',
        domain: `${dominioEmpresa}`
      }
    })

    if (empresa.data && empresa.data.name) {
      const empresaValida = JSON.parse(await fs.readFile('./empresas.json'));
      empresaValida.push(empresa.data);

      fs.writeFile('./empresas.json', JSON.stringify(empresaValida, null, 1));
    }

    return res.json(empresa.data);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = { obterEmpresa };