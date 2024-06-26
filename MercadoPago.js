const { Router } = require('express')
const mercadopago = require('mercadopago')
const dotenv = require('dotenv')
dotenv.config()
const Mercado_Pago = Router();

mercadopago.configure({
    access_token: process.env.ACESS_TOKEN || "",
});

Mercado_Pago.get('/', (req, res) => {
    res.send('get')
});

Mercado_Pago.post("/", async (req, res) => {
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
                success: "https://ongdoacao.vercel.app/PagamentoTela",
                failure: "https://ongdoacao.vercel.app/Ongs",
            },

            auto_return: "approved",
        };

        const resposta = await mercadopago.preferences.create(dados);
        console.log(resposta)
        res.status(200).json(resposta.response.init_point)
    } catch (error) {
        (console.log(error))
        res.status(500).json(error.message)
    }
})

module.exports = Mercado_Pago