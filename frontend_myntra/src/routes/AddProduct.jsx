import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!productId;

  const [form, setForm] = useState({
    title: "",
    description: "",
    rating: "",
    reviewNumbers: "",
    actualPrice: "",
    MRP: "",
    discounts: "",
    photo: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      console.log(productId);
      const result = await axios.get(
        `http://localhost:3030/admin/${productId}`,
        { withCredentials: true, signal },
      );
      const {
        photo,
        title,
        description,
        rating,
        reviewNumbers,
        actualPrice,
        MRP,
        discounts,
      } = result.data;
      const new_form = {
        photo,
        title,
        description,
        rating,
        reviewNumbers,
        actualPrice,
        MRP,
        discounts,
      };
      setForm(new_form);
    })();

    return () => {
      console.log("Clean-up..");
      controller.abort();
    };
  }, [productId, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = "Title is required";
    if (!form.description.trim()) err.description = "Description is required";
    if (!form.rating || form.rating < 0 || form.rating > 5)
      err.rating = "Rating must be between 0 and 5";
    if (!form.reviewNumbers.trim())
      err.reviewNumbers = "Review numbers is required";
    if (!form.actualPrice || form.actualPrice <= 0)
      err.actualPrice = "Actual price must be greater than 0";
    if (!form.MRP || form.MRP <= 0) err.MRP = "MRP must be greater than 0";
    if (form.MRP && form.actualPrice && form.actualPrice > form.MRP)
      err.actualPrice = "Actual price cannot be greater than MRP";
    if (form.discounts !== "" && (form.discounts < 0 || form.discounts > 100))
      err.discounts = "Discounts must be between 0 and 100";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      setLoading(true);
      try {
        if (isEditMode) {
          const result = await axios.put(
            `http://localhost:3030/admin/modify-product/${productId}`,
            form,
            { withCredentials: true },
          );
          console.log("Product updated:", result);
          setSuccess("Product updated successfully!");
        } else {
          const result = await axios.post(
            "http://localhost:3030/admin/add-product",
            form,
            { withCredentials: true },
          );
          console.log("Product added:", result);
          setSuccess("Product added successfully!");
        }
        setForm({
          title: "",
          description: "",
          rating: "",
          reviewNumbers: "",
          actualPrice: "",
          MRP: "",
          discounts: "",
          photo: "",
        });
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(""), 3000);
        setTimeout(() => navigate("/"), 1000);
      } catch (err) {
        console.error("Error adding product:", err);
        setErrors({
          submit: err.response?.data?.message || "Error adding product",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4 text-center">
                {isEditMode ? "Update Product" : "Add New Product"}
              </h3>

              {success && (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  {success}
                </div>
              )}

              {errors.submit && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {errors.submit}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  {/* Title */}
                  <div className="col-12">
                    <label className="form-label fw-bold">Product Title</label>
                    <input
                      type="text"
                      name="title"
                      className={`form-control ${errors.title ? "is-invalid" : ""}`}
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Enter product title"
                    />
                    {errors.title && (
                      <div className="invalid-feedback">{errors.title}</div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="col-12">
                    <label className="form-label fw-bold">Description</label>
                    <textarea
                      name="description"
                      className={`form-control ${errors.description ? "is-invalid" : ""}`}
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Enter product description"
                      rows="4"
                    />
                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Rating (0-5)</label>
                    <input
                      type="number"
                      name="rating"
                      className={`form-control ${errors.rating ? "is-invalid" : ""}`}
                      value={form.rating}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      max="5"
                      step="0.1"
                    />
                    {errors.rating && (
                      <div className="invalid-feedback">{errors.rating}</div>
                    )}
                  </div>

                  {/* Review Numbers */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Review Numbers</label>
                    <input
                      type="text"
                      name="reviewNumbers"
                      className={`form-control ${errors.reviewNumbers ? "is-invalid" : ""}`}
                      value={form.reviewNumbers}
                      onChange={handleChange}
                      placeholder="e.g., 123 or 1.2K"
                    />
                    {errors.reviewNumbers && (
                      <div className="invalid-feedback">
                        {errors.reviewNumbers}
                      </div>
                    )}
                  </div>

                  {/* Actual Price */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Actual Price</label>
                    <input
                      type="number"
                      name="actualPrice"
                      className={`form-control ${errors.actualPrice ? "is-invalid" : ""}`}
                      value={form.actualPrice}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                    {errors.actualPrice && (
                      <div className="invalid-feedback">
                        {errors.actualPrice}
                      </div>
                    )}
                  </div>

                  {/* MRP */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      MRP (Maximum Retail Price)
                    </label>
                    <input
                      type="number"
                      name="MRP"
                      className={`form-control ${errors.MRP ? "is-invalid" : ""}`}
                      value={form.MRP}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                    {errors.MRP && (
                      <div className="invalid-feedback">{errors.MRP}</div>
                    )}
                  </div>

                  {/* Discounts */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Discount (%)</label>
                    <input
                      type="number"
                      name="discounts"
                      className={`form-control ${errors.discounts ? "is-invalid" : ""}`}
                      value={form.discounts}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    {errors.discounts && (
                      <div className="invalid-feedback">{errors.discounts}</div>
                    )}
                  </div>

                  {/* Photo URL */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Photo URL</label>
                    <input
                      type="text"
                      name="photo"
                      className="form-control"
                      value={form.photo}
                      onChange={handleChange}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>

                  {/* Submit Button */}

                  {!isEditMode && (
                    <>
                      <div className="col-12 mt-4 d-grid">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                          disabled={loading}
                        >
                          {loading ? "Adding Product..." : "Add Product"}
                        </button>
                      </div>
                    </>
                  )}
                  {isEditMode && (
                    <>
                      <div className="col-12 mt-4 d-grid">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                          disabled={loading}
                        >
                          {loading ? "updating Product..." : "Update Product"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
