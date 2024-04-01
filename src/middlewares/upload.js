'use strict'
const multer = require('multer')

module.exports = multer({
    storage:multer.diskStorage({
        destination:'./uploads',
        filename:function(req,file,returnCallback){
            returnCallback(null,file.fieldname +"_" + file.originalname + "-" + Date.now() )
        }
    })
})