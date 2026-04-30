import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button, Paper, TextField } from "@mui/material";
import AOS from "aos";
import API_URL from "../config/api";

const CreateProduct = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const fileInputRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [preview, setPreview] = useState(null);
  const [productLoading, setProductLoading] = useState(true);

  //Product edit states
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editActualPrice, setEditActualPrice] = useState("");
  const [editPreview, setEditPreview] = useState(null);
  const [editPopup, setEditPopup] = useState(false);
  const [editId, setEditId] = useState(null);

  const addProduct = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file before uploading.");
      return;
    }
    if (!name) {
      toast.error("Please Fill name before uploading.");
      return;
    }
    if (!description) {
      toast.error("Please write description before uploading.");
      return;
    }
    if (!price) {
      toast.error("Please Price Set before uploading.");
      return;
    }
    if (!actualPrice) {
      toast.error("Please Actual Price Set before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("actualPrice", actualPrice);
    formData.append("image", file);

    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Product Added Successfully");
      // setMessage(data.message);
      setFile(null);
      setName("");
      setDescription("");
      setPrice("");
      setActualPrice("");
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
    getProducts(); // products ui show
    console.log(data);
  };

  //Update Product
  const updateProduct = async () => {
    const formData = new FormData();
    formData.append("name", editName);
    formData.append("description", editDescription);
    formData.append("price", editPrice);
    formData.append("actualPrice", editActualPrice);
    if (file) {
      formData.append("image", file);
    }
    await fetch(`${API_URL}/products/${editId}`, {
      method: "PUT",
      body: formData,
    });

    toast.success("Product Update Successfully");
    setEditPopup(false);
    getProducts();
  };

  const handleEdit = (product) => {
    setEditPreview(`data:image/png;base64, ${product.image}`);
    setEditName(product.name);
    setEditDescription(product.description);
    setEditPrice(product.price);
    setEditActualPrice(product.actualPrice);
    setEditId(product._id);
    setEditPopup(true);
  };

  //Get Product
  const getProducts = async () => {
    //image show ui
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    setProducts(data);
    AOS.refresh();
    setProductLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  //Delete Product
  const deleteProduct = async (_id) => {
    const confirmDelete = window.confirm("Confirm to Delete");

    if (!confirmDelete) return;

    await fetch(`${API_URL}/products/${_id}`, { method: "DELETE" });

    toast.success("Product Deleted Successfully");

    //Ui Update without refresh
    setProducts((prev) => prev.filter((item) => item._id !== _id));
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    //5mb = 5 * 1024 * 1024
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("❌ File size Must be less than 5MB");
      // setMessage("");
      fileInputRef.current.value = "";
      return;
    } else {
      setPreview(URL.createObjectURL(selectedFile));
    }
    setFile(selectedFile);
  };

  const handleEditChange = (e) => {
    const selectedFile = e.target.files[0];
    //5mb = 5 * 1024 * 1024
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size Must be less than 5MB ❌ ");
      // setMessage("");
      fileInputRef.current.value = "";
      return;
    } else {
      setEditPreview(URL.createObjectURL(selectedFile));
    }
    setFile(selectedFile);
  };

  //Role access
  const role = localStorage.getItem("role");

  return (
    <>
      {role === "admin" ? (
        <div>
          <Toaster />
          <form className="form-container">
            <div className="form-div" data-aos="fade-up">
              <Paper elevation={20} className="p-2 rounded-5">
                <h2 className="text-center fw-bold my-3 text-decoration-underline">
                  ADD PRODUCT
                </h2>
                <br />
                <div className="d-flex flex-column align-items-center gap-4">
                  <label className="img-btn">
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleChange}
                    />
                    Upload Image
                    {preview && (
                      <img src={preview} alt="" width={180} className="ms-5" />
                    )}
                  </label>
                  <TextField
                    sx={{
                      width: "100%",
                      maxWidth: "450px",
                      "@media (max-width: 600px)": {
                        maxWidth: "90vw",
                      },
                    }}
                    label="Product Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    sx={{
                      width: "100%",
                      maxWidth: "450px",
                      "@media (max-width: 600px)": {
                        maxWidth: "90vw",
                      },
                    }}
                    label="Product Description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <TextField
                    sx={{
                      width: "100%",
                      maxWidth: "450px",
                      "@media (max-width: 600px)": {
                        maxWidth: "90vw",
                      },
                    }}
                    label="Product Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <TextField
                    sx={{
                      width: "100%",
                      maxWidth: "450px",
                      "@media (max-width: 600px)": {
                        maxWidth: "90vw",
                      },
                    }}
                    label="Product Actual Price"
                    value={actualPrice}
                    type="text"
                    onChange={(e) => setActualPrice(e.target.value)}
                  />
                  <Button
                    onClick={addProduct}
                    variant="contained"
                    sx={{
                      fontWeight: "bold",
                      paddingX: 3,
                      marginBottom: 1.5,
                      width: "100%",
                      maxWidth: "450px",
                      "@media (max-width: 600px)": {
                        maxWidth: "90vw",
                      },
                    }}
                  >
                    Add Product
                  </Button>
                </div>
              </Paper>
            </div>
          </form>

          <hr />

          <div>
            <h2 className="text-center fw-bold">Products List</h2>
            {productLoading ? (
              <div className="page-loading" style={{ minHeight: "200px" }}>
                <div className="page-loading-spinner"></div>
                <h4>Loading products...</h4>
              </div>
            ) : (
            <section
              className={editPopup ? "products-menu blur" : "products-menu"}
            >
              {products.map((item, index) => (
                <div data-aos="zoom-in" data-aos-delay={(index % 4) * 100}>
                  <div
                    key={item._id}
                    className="card"
                    style={{ width: "18rem" }}
                  >
                    <img
                      src={`data:image/png;base64, ${item.image}`}
                      className="card-img-top"
                      alt="Food Image"
                    />
                    <div className="card-body">
                      <h3 className="card-title"> {item.name} </h3>
                      <p className="card-text">{item.description}</p>
                      <div className="d-flex">
                        <h4 className="text-warning">Price:</h4>
                        <h5 className="card-text text-decoration-line-through text-secondary">
                          {`₹ ${item.actualPrice}`}
                        </h5>
                        <h5 className="card-text fw-bold ms-3">{`₹ ${item.price}`}</h5>
                      </div>

                      <button
                        className="btn btn-info"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger ms-3"
                        onClick={() => deleteProduct(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            )}
            {editPopup && (
              <div className="popup" data-aos="zoom-out">
                <div className="popup-content ">
                  <h3 className="text-decoration-underline fs-2 fw-bold">
                    Edit Product
                  </h3>
                  <label className="img-btn1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleEditChange}
                    />
                    Edit Image
                    {editPreview && (
                      <img
                        src={editPreview}
                        alt=""
                        width={100}
                        className="ms-5"
                      />
                    )}
                  </label>
                  <TextField
                    sx={{
                      width: "100%",
                      maxWidth: "350px",
                      "@media (max-width: 600px)": {
                        maxWidth: "85vw",
                      },
                    }}
                    type="text"
                    value={editName}
                    label="Name"
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <TextField
                    sx={{
                      width: "100%",
                      maxWidth: "350px",
                      "@media (max-width: 600px)": {
                        maxWidth: "85vw",
                      },
                    }}
                    type="text"
                    label="Description"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <TextField
                    sx={{
                      width: "100%",
                      maxWidth: "350px",
                      "@media (max-width: 600px)": {
                        maxWidth: "85vw",
                      },
                    }}
                    type="number"
                    label="Price"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                  />
                  <TextField
                    sx={{
                      width: "100%",
                      maxWidth: "350px",
                      "@media (max-width: 600px)": {
                        maxWidth: "85vw",
                      },
                    }}
                    type="text"
                    label="Actual Price"
                    value={editActualPrice}
                    onChange={(e) => setEditActualPrice(e.target.value)}
                  />
                  <button className="btn btn-primary" onClick={updateProduct}>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setEditPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <h2 className="text-center m-5">Access Denied ❌ (ADMIN ONLY)</h2>
      )}
    </>
  );
};

export default CreateProduct;
