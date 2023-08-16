const { Item, ItemSchema  } = require('./items.model');
const { SubItem, SubItemSchema  } = require('./subitems.model');

function setupModels(sequelize) {
    Item.init(ItemSchema, Item.config(sequelize));
    Item.init(SubItemSchema, SubItem.config(sequelize));
}

module.exports = setupModels;