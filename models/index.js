const { Item, ItemSchema  } = require('./items.model');
const { SubItem, SubItemSchema  } = require('./subitems.model');
const { Formulario, FormularioSchema  } = require('./formularios.model');

function setupModels(sequelize) {
    Item.init(ItemSchema, Item.config(sequelize));
    SubItem.init(SubItemSchema, SubItem.config(sequelize));
    Formulario.init(FormularioSchema, Formulario.config(sequelize));
}

module.exports = setupModels;