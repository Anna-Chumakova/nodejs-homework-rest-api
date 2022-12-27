const express = require('express');
const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId } = require("../../middlewares");
const { schemasContact } = require("../../models");
const router = express.Router()



router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:id', isValidId, ctrlWrapper(ctrl.getById));

router.post('/', validateBody(schemasContact.addSchema), ctrlWrapper(ctrl.add));

router.delete('/:id', isValidId, ctrlWrapper(ctrl.removeById));

router.put('/:id', isValidId, validateBody(schemasContact.addSchema), ctrlWrapper(ctrl.updateById));

router.patch('/:id/favorite', isValidId, validateBody(schemasContact.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));


module.exports = router;
