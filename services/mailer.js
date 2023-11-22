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

function formatDateTime(date) {
  const d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear(),
    hh = d.getHours(),
    mm = d.getMinutes();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return `${year}-${month}-${day} ${hh}:${mm}`;
}

function formatItemsForEmail(dataForm) {
  if (!dataForm || !dataForm.features || dataForm.features.length === 0) {
    return "";
  }
  const itemsMap = dataForm.features.reduce((acc, feature) => {
    if (!acc[feature.nombreItem]) {
      acc[feature.nombreItem] = {
        nombre: feature.nombreItem,
        subitems: {},
      };
    }

    if (!acc[feature.nombreItem].subitems[feature.nombreSubitem]) {
      acc[feature.nombreItem].subitems[feature.nombreSubitem] = {
        nombre: feature.nombreSubitem,
        data: [],
      };
    }

    acc[feature.nombreItem].subitems[feature.nombreSubitem].data.push({
      pk: feature.pk,
      collera: feature.collera,
      observacion: feature.observacion,
    });

    return acc;
  }, {});

  let htmlContent =
    '<table border="1" style="border-collapse: collapse; width: 100%;">';

  Object.values(itemsMap).forEach((item) => {
    htmlContent += `
      <tr>
        <th colspan="4" style="background-color: #eeeeee;">${item.nombre}</th>
      </tr>
      <tr>
        <th>Subitem</th>
        <th>PK</th>
        <th>Collera</th>
        <th>Observación</th>
      </tr>`;

    Object.values(item.subitems).forEach((subitem) => {
      subitem.data.forEach((dataEntry, index) => {
        htmlContent += `
          <tr>
            ${
              index === 0
                ? `<td rowspan="${subitem.data.length}">${subitem.nombre}</td>`
                : ""
            }
            <td>${dataEntry.pk}</td>
            <td>${dataEntry.collera}</td>
            <td>${dataEntry.observacion}</td>
          </tr>`;
      });
    });
  });

  htmlContent += "</table>";
  return htmlContent;
}

async function sendEmail(data, subdivision, idFormulario, dataForm) {
  const fechaLocal = formatDateTime(data.fecha);
  const itemsSection =
    dataForm.features.length > 0 ? formatItemsForEmail(dataForm) : "";

  const itemsHtml = itemsSection
    ? `
    <tr bgcolor="#fff">
      <td style="text-align:center">
        <p style="color: #000">Detalle de los ítems:</p>
        ${itemsSection}
      </td>
    </tr>
  `
    : "";

  const mailOptions = {
    from: "Checklist EFE <adminsharepoint@grupoefe.onmicrosoft.com>",
    to: "patricio.navarrete@efe.cl",
    subject: `Cierre Checklist ${idFormulario}`,
    html: `
      <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#002854" bgcolor="#002854">
        <tr height="200px">  
          <td bgcolor="" width="600px">
            <h1 style="color: #fff; text-align:center">Checklist EFE</h1>
            <p  style="color: #fff; text-align:center">
              El usuario <span style="color: #e84393">${data.nombre_supervisor}</span> 
              ha cerrado un Checklist con fecha de creacion <span style="color: #e84393">${fechaLocal}</span>
              correspondiente a la subdivision <span style="color: #e84393">${subdivision}</span>
              con la observacion "<span style="color: #e84393">${data.observacion_general}</span>".
            </p>
          </td>
        </tr>
        ${itemsHtml}
        <tr bgcolor="#002854">
          <td style="text-align:center; color: #ffffff; padding: 10px;">
            <p>DIRÍJASE A LA <strong><a href="${process.env.OUTLOOK_EMAIL}" style="color: #e84393; text-decoration: none;">APLICACION</a></strong> PARA OBTENER MÁS DETALLES.</p>
          </td>
        </tr>
      </table>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
}

module.exports = {
  sendEmail,
};
