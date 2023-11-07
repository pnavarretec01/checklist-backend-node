const { check, validationResult } = require("express-validator");

const validacionesSubdivision = [
  check("nombre").not().isEmpty().withMessage("El campo nombre es requerido."),

  check("pk_inicio")
    .custom((value) => value !== null && value !== undefined)
    .withMessage("El campo Pk Inicio es requerido.")
    .isInt({ min: 0 })
    .withMessage("El campo Pk Inicio debe ser un número entero no negativo."),

  check("pk_termino")
    .custom((value) => value !== null && value !== undefined)
    .withMessage("El campo Pk Término es requerido.")
    .isInt({ min: 0 })
    .withMessage("El campo Pk Término debe ser un número entero no negativo."),
];

const validarCamposSubdivision = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0].msg;
    return res.status(400).json({
      success: false,
      code: 400,
      message: firstError,
      errors: errors.array(),
      status: "error",
    });
  }

  next();
};

module.exports = {
  validacionesSubdivision,
  validarCamposSubdivision,
};
