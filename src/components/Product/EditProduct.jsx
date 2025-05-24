import React, {useState, useEffect} from "react";
import Modal from "react-modal";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const EditProduct = ({onReload, item}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataCategory, setDataCategory] = useState([]);
  const [data, setData] = useState(item);

  console.log(item);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:3002/categories")
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data);
          setDataCategory(data);
        });
    };
    const fetchApiProductId = () => {
      fetch(`http://localhost:3002/products/${item.id}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    };
    fetchApiProductId();
    fetchData();
  }, [item.id]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    /* updating title of product with id 1 */
    fetch(`http://localhost:3002/products/${item.id}`, {
      method: "PUT" /* or PATCH */,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          closeModal();
          onReload();
          Swal.fire({
            title: "Edit product",
            text: "You clicked the button!",
            icon: "success",
          });
        }
      });
  };

  const handleChange = (e) => {
    // console.log(e.target.name);
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);

    setData({...data, [name]: value});
  };
  // console.log(data);
  //   console.log(dataCategory);
  return (
    <>
      <button onClick={openModal}>Edit</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Tiêu đề</td>
                <td>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={data.title || ""}
                  />
                </td>
              </tr>
              {dataCategory.length > 0 ? (
                <tr>
                  <td>Categories</td>
                  <td>
                    <select
                      name="category"
                      onChange={handleChange}
                      value={data.category || ""}
                    >
                      {(dataCategory || []).map((item, index) => (
                        <option key={index}>{item.name}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ) : (
                <>Loading...</>
              )}
              <tr>
                <td>Giá</td>
                <td>
                  <input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    value={data.price || ""}
                  />
                </td>
              </tr>
              <tr>
                <td>Giảm giá</td>
                <td>
                  <input
                    type="number"
                    name="discountPercentage"
                    onChange={handleChange}
                    value={data.discountPercentage || ""}
                  />
                </td>
              </tr>
              <tr>
                <td>Số lượng còn lại</td>
                <td>
                  <input
                    type="number"
                    name="stock"
                    onChange={handleChange}
                    value={data.stock || ""}
                  />
                </td>
              </tr>
              <tr>
                <td>Đường dẫn ảnh</td>
                <td>
                  <input
                    type="text"
                    name="thumbnail"
                    onChange={handleChange}
                    value={data.thumbnail || ""}
                  />
                </td>
              </tr>
              <tr>
                <td>Mô tả</td>
                <td>
                  <textarea
                    name="description"
                    id=""
                    cols="30"
                    rows="5"
                    onChange={handleChange}
                    value={data.description || ""}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>
                  <button type="submit" value="Tạo mới" onSubmit={handleSubmit}>
                    Edit Product
                  </button>
                </td>
                <td>
                  <button onClick={closeModal}>Hủy</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </Modal>
    </>
  );
};

export default EditProduct;
