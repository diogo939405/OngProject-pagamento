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

//const cliente = 
mercadopago.configure({
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
                    title: req.body.title,
                    unit_price: Number(req.body.unit_price),
                    currency_id: "BRL",
                    description: req.body.description,
                    quantity: 1
                },
            ],
            back_urls: {
                success: "globoesporte.globo.com",
                failure: "https://www.npmjs.com/package/dotenv",
            },

            auto_return: "approved",
        };
        // const preference = new Preference(cliente)

        mercadopago.configure({
            access_token: "TEST-2308607446552606-041016-0e4b509f3b3bf31603f160002a4902f1-661201544",
            access_client: "TEST-00a38ea9-801e-48c5-9c93-a252d6ac8884",
        });

        const resposta = await mercadopago.preferences.create(dados);
        console.log(resposta)
        res.json({
            id: resposta.id,
            url: resposta.response.init_point
        })
        res.status(200)
        return res;
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