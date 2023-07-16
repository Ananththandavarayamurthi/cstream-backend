// controllers/organizationController.js
const Organization = require('../modelschema/organisationschema');

// Controller methods
exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
};

exports.getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    res.json(organization);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.createOrganization = async (req, res) => {
  try {
    
    const organization = new Organization(req.body);
    await organization.save();
    res.status(201).json(organization);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error });
  }
};

exports.updateOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(organization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndDelete(req.params.id);
    res.json(organization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
