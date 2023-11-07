const { check, validationResult, body } = require("express-validator");

const validaciones = [
  body("formulario.nombre_supervisor")
    .not()
    .isEmpty()
    .withMessage("El campo Nombre Supervisor es requerido.")
    .isLength({ max: 50 })
    .withMessage("El Nombre Supervisor no debe exceder los 50 caracteres."),

  //   body("formulario.fecha")
  //     .not()
  //     .isEmpty()
  //     .withMessage("El campo Fecha es requerido.")
  //     .isISO8601()
  //     .withMessage("El campo Fecha debe ser una fecha válida."),

  body("formulario.subdivision")
    .exists({ checkNull: true })
    .withMessage("El campo Subdivisión es requerido.")
    .isInt({ min: 1 })
    .withMessage("La Subdivisión debe ser un identificador válido."),

  body("formulario.observacion_general")
    .optional()
    .isLength({ max: 255 })
    .withMessage("La Observación General no debe exceder los 255 caracteres."),

  body("formulario.pk_inicio")
    .optional()
    .isInt({ min: 0 })
    .withMessage("El Pk Inicio debe ser un número entero positivo."),

  body("formulario.pk_termino")
    .optional()
    .isInt({ min: 0 })
    .withMessage("El Pk Término debe ser un número entero positivo."),

  body("formulario.cerrado")
    .not()
    .isEmpty()
    .withMessage("El campo Cerrado es requerido.")
    .isBoolean()
    .withMessage("El campo Cerrado debe ser booleano."),
];

const validacionesPut = [
  body("pk_formulario_id")
    .isInt()
    .withMessage("El ID del formulario debe ser un número entero."),
  body("nombre_supervisor")
    .notEmpty()
    .withMessage("El Nombre Supervisor es requerido."),
  body("fecha").notEmpty().withMessage("La Fecha es requerida."),
  body("subdivision")
    .exists({ checkNull: true })
    .withMessage("El campo Subdivisión es requerido.")
    .isInt({ min: 1 })
    .withMessage("La Subdivisión debe ser un identificador válido."),
  body("pk_inicio")
    .optional()
    .isInt({ min: 0 })
    .withMessage("El PK Inicio debe ser un número entero positivo."),
  body("pk_termino")
    .optional()
    .isInt({ min: 0 })
    .withMessage("El PK Término debe ser un número entero positivo."),
  body("observacion_general").optional(),
  body("cerrado")
    .isBoolean()
    .withMessage("El campo Cerrado debe ser booleano."),
];

const validarCamposItems = (req, res, next) => {
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
  validaciones,
  validarCamposItems,
  validacionesPut,
};
