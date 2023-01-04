const express = require('express');
const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemasContact } = require("../../models");
const router = express.Router()



router.get('/', authenticate, ctrlWrapper(ctrl.getAll));

router.get('/:id', authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post('/', authenticate, validateBody(schemasContact.addSchema), ctrlWrapper(ctrl.add));

router.delete('/:id', authenticate, isValidId, ctrlWrapper(ctrl.removeById));

router.put('/:id', authenticate, isValidId, validateBody(schemasContact.addSchema), ctrlWrapper(ctrl.updateById));

router.patch('/:id/favorite', authenticate, isValidId, validateBody(schemasContact.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));


module.exports = router;
