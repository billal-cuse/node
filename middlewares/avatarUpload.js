const uploader = require("../utilities/single-uploader");

const avaterUpload = (req,res,next) => {
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/png", "image/jpg"],
    1000000,
    "only .jpg,jpeg,and .png are supported"
  );
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(501).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};


module.exports = avaterUpload;
