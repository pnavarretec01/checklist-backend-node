const { check, validationResult } = require("express-validator");

const validaciones = [
  check("orden")
    .not()
    .isEmpty()
    .withMessage("El campo orden es requerido.")
    .isInt()
    .withMessage("El campo orden debe ser un número entero."),
  check("nombre").not().isEmpty().withMessage("El campo nombre es requerido."),
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
        status: "error" 
      });
    }
  
    next();
  };

module.exports = {
  validaciones,
  validarCamposItems,
};
