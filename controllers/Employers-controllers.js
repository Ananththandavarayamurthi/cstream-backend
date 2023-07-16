// controllers/employeeController.js
const Employee = require('../modelschema/employerschema');
const Organization = require('../modelschema/organisationschema');

// Controller methods
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { name, dob, phoneNumber, address, organizationName } = req.body;

    // Find the organization by name
    const organization = await Organization.findOne({ name: organizationName });

    if (!organization) {
      return res.status(400).json({ error: 'Organization not found' });
    }

    // Create new employee
    const employee = new Employee({
      name,
      dob,
      phoneNumber,
      address,
      organization: organization._id,
    });

    await employee.save();

    // Update organization's employee count and employees list
    organization.numberOfEmployees++;
    organization.employees.push({ _id: employee._id, name: employee.name });
    await organization.save();

    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    // Update organization's employee count and employees list
    const organization = await Organization.findById(employee.organization);
    organization.numberOfEmployees--;
    organization.employees.pull(employee._id);
    await organization.save();

    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
