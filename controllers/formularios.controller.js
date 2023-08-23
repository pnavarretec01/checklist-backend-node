const FormulariosService = require("../services/formulario.service");
const service = new FormulariosService();

const get = async (req, res) => {
  try {
    const formularios = await service.find();
    const response = formularios.map((formulario) => {
      return {
        pk_formulario_id: formulario.pk_formulario_id,
        nombre_supervisor: formulario.nombre_supervisor,
        fecha: formulario.fecha,
        subdivision: formulario.subdivision,
        observacion_general: formulario.observacion_general,
        pk_inicio: formulario.pk_inicio,
        pk_termino: formulario.pk_termino,
        items: formulario.CaracteristicaFormularios.map((caracteristica) => {
          return {
            id: caracteristica.item_id,
            title: caracteristica.Item.title, // Asegúrate de que 'Item' tiene una propiedad 'title'
            items: [
              {
                id: caracteristica.subitem_id,
                title: caracteristica.SubItem.title, // Asegúrate de que 'SubItem' tiene una propiedad 'title'
                data: [
                  {
                    caracteristica_formulario_id:
                      caracteristica.caracteristica_formulario_id,
                    item_id: caracteristica.item_id,
                    subitem_id: caracteristica.subitem_id,
                    pk: caracteristica.pk,
                    collera: caracteristica.collera,
                    observacion: caracteristica.observacion,
                    formulario_id: caracteristica.formulario_id,
                  },
                ],
              },
            ],
          };
        }),
      };
    });
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const addMultipleFeatures = async (req, res) => {
  try {
    const featuresData = req.body.features; // Suponiendo que las características se envían con la clave 'features'
    const newFeatures = await caracteristicaService.addMultipleFeatures(
      featuresData
    );
    res.json(newFeatures);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const addFeature = async (req, res) => {
  try {
    const featureData = req.body;
    const newFeature = await service.addFeature(featureData);
    res.json(newFeature);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
  get,
  addFeature,
  addMultipleFeatures
};
