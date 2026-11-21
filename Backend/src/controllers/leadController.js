const User = require('../models/user');
const Lead = require('../models/lead');

async function addLeads(req,res){
    try{
        const user = req.user;
        console.log("REQ.USER:", req.user);
console.log("REQ.USER.ID:", req.user.id);
console.log("USER:", user);
console.log("USER.ID:", user.id);

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
module.exports = {getLeads, addLeads}