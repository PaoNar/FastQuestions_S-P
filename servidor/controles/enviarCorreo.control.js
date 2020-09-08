const nodemailer = require("nodemailer"),
  smtpTransport = require("nodemailer-smtp-transport");

const mail1 = (req, res) => {
  let { datos } = req.body;

  console.log(datos)

  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: datos.correos,
    subject: "Encuesta",
    html: `<div><h1>Tu usuario por defecto es tu correo electronico </h1><br><h2>Tu contraseña por defecto es: 123</h2></div> <a href="http://localhost:4200/login"> ingresa a este link: http://localhost:4200/login</a>`,
  };

  transporter.verify((error, success) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: `Error del servidor: ${err}`,
      });
    } else {
      return res.status(200).json({
        ok: true,
        datos: "Correo Enviado",
      });
    }
  });
};

module.exports = {
  mail1,
};
