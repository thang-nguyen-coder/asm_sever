var MD = require('../model/user');

var objReturn = {
    status: 1,
    msg: " ",
    info_user: " ",
  };
  

exports.api_Login = async (req, res, next) => {
    if (req.method == "POST") {
      const cleanedPassword = req.body.password.trim();
      
      try {
        let objU = await MD.userModel.findOne({ username: req.body.username });
        console.log(objU);
        if (objU !== null) {
          if (objU.password == cleanedPassword) {
            
            
            objReturn.status = 0;
            objReturn.msg = "Đăng nhập thành công";
            objReturn.info_user = objU
          } else {
            objReturn.msg = "Sai Mật Khẩu" + req.body.password;
            objReturn.status = 1;
            console.log("Sai mật khẩu" + req.body.password + "=" + objU.password);
            console.log(objU);
          }
        } else {
          objReturn.msg =
            "Không có thông tin người dùng " +
            req.body.password +
            req.body.username;
          objReturn.info_user = "";
          objReturn.status = 1;
        }
      } catch (error) {
        objReturn.msg = "Lỗi : " + error.message;
        console.log(error);
      }
    }
    res.json(objReturn.info_user);
  };


  exports.api_Reg = async (req, res, next) => {
    if (req.method == "POST") {
      console.log(req.body);
      let objU = await MD.userModel.findOne({ username: req.body.username });
  
      //lưu CSDL
  
      if (
        req.body.username != null &&
        req.body.email != null &&
        req.body.password != null
      ) {
        if (objU != null) {
          objReturn.msg = "Tài Khoản này đã được đăng ký";
          objReturn.status = 3;
          console.log("Tài khoản trùng");
        } else {
          try {
            let objU = new MD.userModel();
            objU.username = req.body.username;
           
            objU.password = req.body.password;
            objU.email = req.body.email;
            objU.role = 1;
           
            
            await objU.save();
            console.log("Oke");
            console.log(objU);
            objReturn.msg = "Đăng Ký thành Công";
            objReturn.status = 0;
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        console.log("Chưa dk đc");
      }
    }
  
    res.json(objReturn);
  };