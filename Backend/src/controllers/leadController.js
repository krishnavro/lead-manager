const User = require('../models/user');
const Lead = require('../models/lead');

async function addLeads(req,res){
    try{
        const user = req.user;

        if(!user){
            return res.status(401).json({
                message: "Login 1st"
            });
        }
        const {name,email,phone,company,source,status} = req.body;
      
        const lead = await Lead.create({
            name,
            email,
            phone,
            company,
            source,
            status,
            createdBy: user.id
        });
        

        return res.status(201).json({
            message: "User created Successfullly",
            lead
        })

    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

async function getLeads(req,res){
    try{
    const leads = await Lead.find({createdBy: req.user.id});

    res.status(200).json({
        message: "Fetched",
        leads
    })

    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
    

}

async function getLeadById(req,res){
    try{
        const id = req.params.id;
    const editLead = await Lead.findOne({_id: id, createdBy: req.user.id});
   
    if(!editLead){
        return res.status(404).json({
            message: "No Lead Found"
        });
    }
    res.status(200).json({
        message: "Lead Found",
        editLead
    })

    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }

    
}

async function updateLead(req, res) {
    try {
        const id = req.params.id;
        const { name, email, phone, company, source, status } = req.body;

        const updatedLead = await Lead.findOneAndUpdate(
            { _id: id, createdBy: req.user.id },
            { name, email, phone, company, source, status },
            { new: true, runValidators: true }
        );

        if (!updatedLead) {
            return res.status(404).json({
                message: "Lead not found"
            });
        }

        return res.status(200).json({
            message: "Lead updated successfully",
            updatedLead
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

async function deleteLead(req,res){
    try{
        const id = req.params.id;
        const deleteLead = await Lead.findOneAndDelete({
            _id: id,
            createdBy: req.user.id
        });
        if(!deleteLead){
            return res.status(404).json({
                message: "Lead not found"
            });
        }
        return res.status(200).json({
            message: "Lead deleted Successfully"
        })

    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}
module.exports = {getLeads, addLeads, getLeadById, updateLead, deleteLead}