const multer = require("multer");
const path = require('path')


const uploader = (sub_Folder_Path,allowed_file_type,max_file_size,errorMessage)=>{
    const uploaderPath = `${__dirname}/../public/uploads/${sub_Folder_Path}`

    const storage = multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,uploaderPath)
        },
        filename:(req,file,cb)=>{
            const fileExt = path.extname(file.originalname)
            const fileName = file.originalname.replace(fileExt,"").toLowerCase().split(" ").join("-")+"-"+Date.now()
            cb(null, fileName + fileExt)
        }
    })
    const upload  = multer({
        storage,
        limits : {
            fileSize: max_file_size
        },
        fileFilter: (req,file,cb)=>{
            if(allowed_file_type.includes(file.mimetype)){
                cb(null,true)
            }
            else{
                cb('file not supported')
            }
        }
    })

    return upload
}

module.exports = uploader;