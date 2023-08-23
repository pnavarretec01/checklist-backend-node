const { Item, ItemSchema } = require("./items.model");
const { SubItem, SubItemSchema } = require("./subitems.model");
const { Formulario, FormularioSchema } = require("./formularios.model");
const { CaracteristicaFormulario, CaracteristicaFormularioSchema } = require("./caracteristicaFormulario.model");

function setupModels(sequelize) {

    Item.init(ItemSchema, Item.config(sequelize));
    SubItem.init(SubItemSchema, SubItem.config(sequelize));
    Formulario.init(FormularioSchema, Formulario.config(sequelize));
    CaracteristicaFormulario.init(CaracteristicaFormularioSchema, CaracteristicaFormulario.config(sequelize));


    const models = {
        Item,
        SubItem,
        Formulario,
        CaracteristicaFormulario
    };

    Object.values(models)
        .filter((model) => typeof model.associate === "function")
        .forEach((model) => model.associate(models));
}

module.exports = setupModels;
