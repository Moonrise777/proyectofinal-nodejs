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

    const mailOptions = {
        from: 'codexno1company@gmail.com',
        to: 'arelyzuleika@gmail.com',
        subject:`Formulario usado, email del usuario: ${email}` ,
        text: `Nombre: ${name}\nMensaje: ${message}\nGenero: ${gender}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo:', error);
            return res.status(500).json({ error: error.toString() });
        }
        console.log('Correo enviado:', info.response);
        res.status(200).json({ message: 'Correo enviado correctamente' });
    });
});

app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});
