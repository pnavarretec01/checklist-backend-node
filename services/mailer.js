const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.OUTLOOK_EMAIL,
    pass: process.env.OUTLOOK_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
  },
  connectionTimeout: 60000,
  debug: true,
});
transporter.on("log", (log) => {
  console.log(log);
});

async function sendEmail(data, subdivision, idFormulario) {
  const mailOptions = {
    from: "Checklist EFE <adminsharepoint@grupoefe.onmicrosoft.com>",
    to: "patricio.navarrete@efe.cl, luis.avalos@efe.cl",
    subject: `Cierre Checklist ${idFormulario}`,
    html: `
    <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#002854" bgcolor="#002854">
    <tr height="200px">  
        <td bgcolor="" width="600px">
            <h1 style="color: #fff; text-align:center">Checklist EFE</h1>
            <p  style="color: #fff; text-align:center">
                El usuario <span style="color: #e84393">${data.nombre_supervisor}</span> 
                ha cerrado un Checklist con fecha de creacion <span style="color: #e84393">${data.fecha}</span>
                correspondiente a la subdivision <span style="color: #e84393">${subdivision}</span>
                con la observacion "<span style="color: #e84393">${data.observacion_general}</span>".
            </p>
        </td>
    </tr>
    <tr bgcolor="#fff">
        <td style="text-align:center">
            <p style="color: #000">Dirigase a la aplicacion para obtener mas detalles.</p>
        </td>
    </tr>
</table>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado con éxito");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
}

module.exports = {
  sendEmail,
};
