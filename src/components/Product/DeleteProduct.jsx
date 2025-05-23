import React from "react";

const DeleteProduct = ({idProduct, onReload}) => {
  const handleDelete = async () => {
    //async là hàm bất đồng bộ
    await fetch(`http://localhost:3002/products/${idProduct}`, {
      //await là chỉ hoạt động với hàm async, chờ cho hàm bất đồng bộ chạy xong
      method: "DELETE",
    });
    onReload();
  };
  return (
    <>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default DeleteProduct;
