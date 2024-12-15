import {employee} from "../models/employee.model.js";

async function deleteEmployee(req, res) {
    
    const id = req.params.id;
    console.log(id);
    try {
        const employeeRemove = await employee.findByIdAndDelete(id);
        if (!employeeRemove) {
            return res.status(404).json({ message: "Employee not found" });
        }
        return res.status(200).json({ message: "Employee deleted successfully", data: employeeRemove });
    } catch (error) {
        console.error("Error deleting employee:", error);
        return res.status(500).json({ error: "Failed to delete employee" });
    }
} 
 
async function addEmployee(req, res) {
    console.log("call add staff")
    console.log(req.body)
  try {
    const newEmployee = new employee(req.body);
    await newEmployee.save();
    return res
      .status(201)
      .json({ message: "Employee added successfully", data: newEmployee });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Failed to add employee", details: error.message });
  }
}

const getEmployees =async(req,res)=>{
    try {
        const employees = await employee.find();
        return res.status(200).json({ employees });
      } catch (error) {
        console.error('Error fetching grievances:', error);
        throw error;
      }
}

export { deleteEmployee, addEmployee, getEmployees }