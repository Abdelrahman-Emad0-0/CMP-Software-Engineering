const employee = [{ id: "1", name: "Mohamed Sayed" }];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const id = req.params.id;
  const target = employee.findIndex((e) => e.id === id);
  if (target === -1) {
    return res.status(404).json({ message: "Id not Found" });
  } else {
    employee.splice(target, 1);
    res.status(200).json({ data: employee });
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({ message: "..." });
  }
  const exists = employee.some((e) => e.id === id);
  if (exists) {
    return res.status(400).json({ message: "This Id is Already Created XD" });
  } else {
    employee.push({ id, name });
    res.status(201).json({ data: employee });
  }
};

// TODO
exports.updateEmployee = async (req, res, next) => {
  const id = req.params.id;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Please Enter Valid Name" });
  }
  const emp = employee.find((e) => e.id === id);

  if (emp) {
    emp.name = name;
    res.status(200).json({ data: employee });
  } else {
    return res.status(404).json({ message: "The iD not found " });
  }
};
