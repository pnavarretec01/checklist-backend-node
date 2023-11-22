const FormularioService = require("../services/formulario.service");
const service = new FormularioService();

const get = async (req, res) => {
  try {
    const response = await service.getAllFormularios();
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const addForms = async (req, res) => {
  try {
    const result = await service.addFormsAndFeatures(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const response = await service.getFormularioById(req.params.id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const addFeature = async (req, res) => {
  try {
    const newFeature = await service.addFeature(req.body);
    res.json(newFeature);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const editFormulario = async (req, res) => {
  try {
    await service.handleEditFormulario(req.body);
    res.status(200).json({
      success: true,
      message: "Formulario editado exitosamente!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fallo al editar el Formulario",
      error: error.message,
    });
  }
};

const deleteFormulario = async (req, res) => {
  try {
    await service.deleteFormularioById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Formulario eliminado exitosamente!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fallo al eliminar el Formulario",
      error: error.message,
    });
  }
};

const addOrUpdateFormulario = async (req, res) => {
  try {
    const result = await service.addOrUpdateForm(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
  get,
  getById,
  addFeature,
  addForms,
  editFormulario,
  deleteFormulario,
  addOrUpdateFormulario,
};
