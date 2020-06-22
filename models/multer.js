const multer = require('multer')
const cryto = require('crypto')
const path= require('path')



 const storage = multer.diskStorage({
        destination:(req,res,cb)=>{
            cb (null,resolve('./uploads'))
    },
    filename:(req,file,cb)=>{
        const {name, ext}= path.parse(file.originalname)
            
        cb(null, `${name}-${Date.now()}.${ext}`)
        
    }
})
   
