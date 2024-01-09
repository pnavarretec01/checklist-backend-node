const jwt = require("jsonwebtoken");

const verifyTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Acceso denegado.");
  }

  // la key publica keycloak debe ser convertida a formato PEM
  const publicKey = `-----BEGIN PUBLIC KEY-----\n${process.env.KEYCLOAK_REALM_PUBLIC_KEY.match(
    /.{1,64}/g
  ).join("\n")}\n-----END PUBLIC KEY-----`;

  try {
    const decodedToken = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    });
    req.user = decodedToken;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .send("Token expirado. Por favor, inicie sesión nuevamente.");
    } else {
      console.error("Error al verificar el token:", error);
      return res.status(400).send("Token inválido.");
    }
  }
};

module.exports = verifyTokenMiddleware;
