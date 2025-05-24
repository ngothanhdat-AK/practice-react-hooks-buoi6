import React from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import {deleteProduct} from "../../services/productService";

const DeleteProduct = ({idProduct, onReload}) => {
  const deleteItem = async () => {
    const result = await deleteProduct(idProduct);
    return result;
  };

  const handleDelete = () => {
    //async là hàm bất đồng bộ
    // await fetch(`http://localhost:3002/products/${idProduct}`, {
    //   //await là chỉ hoạt động với hàm async, chờ cho hàm bất đồng bộ chạy xong
    //   method: "DELETE",
    // });
    // onReload();
    // //onReload là hàm truyền từ component cha xuống, dùng để reload lại dữ liệu
    // Swal.fire({
    //   title: "Delete product",
    //   text: "You clicked the button!",
    //   icon: "success",
    // });
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        onReload(); // Call the onReload function to refresh the product list
      }
    });
  };
  return (
    <>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default DeleteProduct;
