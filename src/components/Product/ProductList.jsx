import React, {useEffect, useState} from "react";
import "./Product.scss";
import DeleteProduct from "./DeleteProduct";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
const Product = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteReload, setDeleteReload] = useState(false);
  const [editReload, setEditReload] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:3002/products")
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data);
          setData(data.reverse());
          setLoading(false);
        });
    };
    fetchData();
  }, [deleteReload, editReload, reload]);

  setTimeout(() => {
    setLoading(false);
  }, 3000);
  console.log(data);

  const handleDeleteReload = () => {
    setDeleteReload(!deleteReload);
  };
  const handleEditReload = () => {
    setEditReload(!editReload);
  };
  const handleReload = () => {
    setReload(!reload);
  };
  return (
    <>
      <CreateProduct onReload={handleReload} />
      <div className="product__list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          data.map((item, index) => (
            <div className="product__item" key={index}>
              <img
                className="product__image"
                src={item.thumbnail}
                alt={item.title}
              />
              <h4 className="product__title">{item.title}</h4>
              <p className="product__price">Giá: {item.price}$</p>
              <p className="product__discount"> {item.discountPercentage}%</p>
              <EditProduct idProduct={item.id} onReload={handleEditReload} />
              <DeleteProduct
                idProduct={item.id}
                onReload={handleDeleteReload}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Product;
