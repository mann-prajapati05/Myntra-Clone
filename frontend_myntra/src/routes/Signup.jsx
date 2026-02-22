import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { isAdminActions } from "../store";
axios.defaults.withCredentials = true;

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setLogin } = useOutletContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    const err = {};
    if (!form.firstName.trim()) err.firstName = "First name is required";
    if (!form.lastName.trim()) err.lastName = "Last name is required";
    if (!form.email.trim()) err.email = "Email is required";
    if (!form.password) err.password = "Password is required";
    if (form.password && form.password.length < 8)
      err.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword)
      err.confirmPassword = "Passwords do not match";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      try {
        const result = await axios.post(
          "https://myntra-clone-ultg.onrender.com/signup",
          form,
        );
        console.log(result.data);
        console.log("Signup payload:", form);
        alert("Signup successful");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          gender: "male",
        });
        dispatch(isAdminActions.setAdminState(false));
        setLogin(true);
        navigate("/");
      } catch (err) {
        console.log("something went wrong while signup..", err);
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4 text-center">Create Account</h3>
              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First name</label>
                    <input
                      type="text"
                      name="firstName"
                      className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <div className="invalid-feedback">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last name</label>
                    <input
                      type="text"
                      name="lastName"
                      className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <div className="invalid-feedback">{errors.lastName}</div>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Confirm password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="form-label d-block">Gender</label>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="genderMale"
                        value="male"
                        checked={form.gender === "male"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="genderMale">
                        Male
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="genderFemale"
                        value="female"
                        checked={form.gender === "female"}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="genderFemale"
                      >
                        Female
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="genderOther"
                        value="other"
                        checked={form.gender === "other"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="genderOther">
                        Other
                      </label>
                    </div>
                  </div>

                  <div className="col-12 mt-3 d-grid">
                    <button type="submit" className="btn btn-primary btn-block">
                      Create account
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="card-footer text-center small text-muted">
              By continuing you agree to our terms.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
