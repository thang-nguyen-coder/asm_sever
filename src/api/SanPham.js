
var obj = {
    msg: " "
}

const myMD = require('../model/SanPhamModel')

exports.getSP = async (req,res, next) =>{
    var listProduct = await myMD.productModel.find()
    // let listProduct = []
    

    res.json(listProduct)

}
exports.add = async (req, res, next) => {
    console.log("Thêm Sản Phẩm");
    let msg = "";
  
    if (req.method === "POST") {
        
      try {
        // let image = "";
        // if (req.file != null) {
        //   const destinationPath = path.join(__dirname, "../public/templates");
        //   const tempFilePath = req.file.path;
        //   const originalName = req.file.originalname;
  
        //   fs.renameSync(tempFilePath, path.join(destinationPath, originalName));
        //   console.log("Url: http://localhost:8080/templates/" + originalName + "success");
          
        //   image = "/templates/" + originalName;
        //}
  
        const objSP = new myMD.productModel({
          nameproduct: req.body.nameproduct,
          price: req.body.price,
          description: req.body.description,
          image: req.body.image
          
        });
  
        const new_sp = await objSP.save();
        console.log(new_sp);
        msg = "Đã thêm thành công";
        res.json(new_sp)
      } catch (error) {
        msg = "Lỗi: " + error.message;
        console.error(error);
      }
    }
  
   
  };

  exports.deleteProduct = async (req, res, next) => {
    const idPro = req.body._id;
    console.log(idPro);
  
    try {
      await myMD.productModel.deleteOne({ _id: idPro });
      obj.msg="đã xóa"
    } catch (error) {
      console.error(error);
      res.status(500).send("Đã xảy ra lỗi trong quá trình xóa sản phẩm.");
    }

    res.json(obj)
  };
  

  // Sửa sản phẩm
exports.editPro = async (req, res, next) => {
  const idSp = req.body._id
  console.log(idSp);
  var Spobj 
  if (req.method === 'POST') {
    try {
      // const destinationPath = path.join(__dirname, "../public/templates");
      // const tempFilePath = req.file.path;
      // const originalName = req.file.originalname;

      // fs.renameSync(tempFilePath, path.join(destinationPath, originalName));
      // console.log("Url: http://localhost:8080/templates/" + originalName + "Chuyển OKe");

      const updatedProduct = {
        nameproduct: req.body.nameproduct,
        price: req.body.price,
        description: req.body.description,
        // image: "/templates/" + originalName,
        image: req.body.image
      };

      Spobj =  await myMD.productModel.updateOne({ _id: idSp }, updatedProduct);
      console.log('Update thành công');
      
    } catch (error) {
      console.error(error);
      res.status(500).send("Đã xảy ra lỗi trong quá trình cập nhật sản phẩm.");
    }
  }

  res.json(Spobj);
};


exports.chiTiet = async (req, res) => {
 const idsp = req.body._id;
 console.log(idsp)
 const Sp = await myMD.productModel.findOne({ _id: idsp})
 console.log(Sp)
 res.json(Sp);


};