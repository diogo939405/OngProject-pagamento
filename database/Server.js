const express = require('express')
const server = express()
const cors = require('cors')
const mercadopago = require('mercadopago')
const Preference = require('mercadopago')
const dotenv = require('dotenv')
dotenv.config()


server.use(express.json())
server.use(cors())
server.use("Mercado_Pago", mercadopago)

const cliente = mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN || "",
    access_client: process.env.ACCESS_CLIENT || "",
});

server.get('/', (req, res) => {
    res.send('get')
});

server.post("/dados", async (req, res) => {
    console.log('req ', req.body)

    const dado = req.body;
    // const novosDados = dado.map(e => {
    //     return {
    //         title: e.nome,
    //         unit_price: e.inputValue,
    //         currency_id: "BRL",
    //         description: e.descricaoCurta,
    //         quantity: 1
    //     };
    // });
    try {
        const dados = {
            items: [
                {
                    title: "diogo",
                    unit_price: 200,
                    currency_id: "BRL",
                    description: "aqui",
                    quantity: 1
                },
            ],
            back_urls: {
                success: "globoesporte.globo.com",
                failure: "https://www.npmjs.com/package/dotenv",
            },

            auto_return: "approved",
        };
        const preference = mercadopago.createPreference(cliente)
        const resposta = await preference.create({dados});
        console.log(resposta)
        res.status(200).json(resposta.response.init_point, {
            id: resposta.id
        })
    } catch (error) {
        (console.log(error))
        res.status(500).json(error.message)
    }
})



const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log('entrou na porta 4000')
})
module.exports = server