const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/Organization.controllers');

// Define routes for organizations
router.get('/', organizationController.getAllOrganizations);
router.get('/:id', organizationController.getOrganizationById);
router.post('/', organizationController.createOrganization);
router.put('/:id', organizationController.updateOrganization);
router.delete('/:id', organizationController.deleteOrganization);

module.exports = router;