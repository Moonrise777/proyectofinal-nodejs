const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'codexno1company@gmail.com',
        pass: 'ecdvttmlrrhnzcwf'
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, message, gender } = req.body;

    if (!email) {
        return res.status(400).send('No se definió el destinatario (email)');
    }

    const mailOptions = {
        from: 'codexno1company@gmail.com',
        to: email,
        subject: 'Muchas gracias por contactarnos, estos son sus datos',
        text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}\nGenero: ${gender}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.send('Correo enviado: ' + info.response);
    });
});

app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});
