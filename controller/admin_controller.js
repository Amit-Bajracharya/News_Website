const admin = require('../project_model/admin_model.js')


//  ADD ADMIN
const addAdmin =  async (req, res)=>{
    try {
        const add_admin = await admin.create(req.body)
        if(!add_admin){
            return res.status(400).json({successfull:false, message: "Unable To Add Admin"})
        }
       return res.status(200).json(add_admin)
    } catch (error) {
        res.status(400).json({successfull: false, message: error.message})
    }
}

//UPDATE ADMIN 
const updateAdmin =  async(req, res)=>{
  try {
    const {id} = req.params
    const updateAdmin = await admin.findByIdAndUpdate(id, req.body)
    if(!updateAdmin){
       return res.status(400).json({successfull:false, message: "Unable To Update Admin"})
    }
    const updatedAdmin = await admin.findById(id)
    return res.status(200).json(updatedAdmin)
  } catch (error) {
    res.status(400).json({successfull: false, message: error.message})
  }
}

//GET ADMIN BY ID
const getAdminById =  async (req, res)=>{
  try {
      const {id} = req.params
      const adminById = await admin.findById(id)
      if(!adminById){
        return res.status(400).json({successfull:false, message: "Unable To Get Admin By Id"})
      }
      return res.status(200).json({adminById})
  } catch (error) {
    res.status(400).json({successfull: false, message: error.message})
  }
}

//GET ADMIN 
const getAdmin =  async (req, res)=>{
  try {
        const total_admin = await admin.find({})
        if(!total_admin){
           return res.status(400).json({successfull: false, message: "Unable to find admin"})
        }
        return res.status(200).json(total_admin)
  } catch (error) {
    res.status(400).json({successfull: false, message: error.message})
  }
}

// DELETE ADMIN
const deleteAdmin = async (req, res)=>{
  try {
    const {id} = req.params
    const deleteAdmin = await admin.findByIdAndDelete(id)
    if(!deleteAdmin){
       return res.status(400).json({successfull:false, message: "Unable To Delete Admin"})
    } 
    return res.status(200).json({successfull: true, message :"Admin Deleted Succesfully"})
  } catch (error) {
    res.status(400).json({successfull: false, message: error.message})
  }
}
module.exports = {getAdmin, getAdminById, deleteAdmin, updateAdmin, addAdmin}