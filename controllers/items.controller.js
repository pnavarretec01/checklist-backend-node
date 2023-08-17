const ItemsService = require('../services/item.service');
const service = new ItemsService();

const create = async ( req, res, next ) => {
    try { 
        const response = await service.create(req.body);
        res.status(201).json({ success: true, code: 201, data: response });
    } catch (error) {
        next(error);
    }
}

const get = async ( req, res, next ) => {
    try {
        const response = await service.find();
        res.status(200).json({ success: true, code: 200, data: response });
    } catch (error) {
        next(error);
    }
}

const getById = async ( req, res, next ) => {
    try {
        const { id } = req.params;
        const response = await service.findOne(id);

        if (!response) {
            const error = new Error('Item not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, code: 200, data: response });
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await service.update(id, body);

        if (!response) {
            const error = new Error('Item no encontrado');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, code: 200, data: response });
    } catch (error) {
        next(error);
    }
}

const _delete = async (req, res, next) => {
    try {
        const { id } = req.params; 
        const response = await service.delete(id);

        if (!response) {
            const error = new Error('Item not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, code: 200, data: response });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create, get, getById, update, _delete
};
