const SubItemsService = require('../services/subitem.service');
const service = new SubItemsService();

const get = async ( req, res ) => {
    try {
        const response = await service.find();
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getByItemItemId = async ( req, res ) => {
    try {
        const { id } = req.params;
        const response = await service.findOneByFk(id);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = {
    get, getByItemItemId
};
