const { check, validationResult } = require("express-validator");

const validacionesSubdivision = [
  check("nombre").not().isEmpty().withMessage("El campo nombre es requerido."),

  check("pk_inicio")
    .not()
    .isEmpty()
    .withMessage("El campo pk_inicio es requerido.")
    .isInt()
    .withMessage("El campo pk_inicio debe ser un número entero."),

  check("pk_termino")
    .not()
    .isEmpty()
    .withMessage("El campo pk_termino es requerido.")
    .isInt()
    .withMessage("El campo pk_termino debe ser un número entero."),
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
