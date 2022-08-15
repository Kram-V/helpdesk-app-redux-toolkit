import React, { useState, useEffect } from "react";
import "./css/Create.css";
import { useSelector, useDispatch } from "react-redux";
import { createRefund, reset } from "../features/refund/refundSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const { user } = useSelector((state) => state.auth);
  const { isSuccess, isError, message } = useSelector((state) => state.refund);

  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/refunds");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      product,
      description,
      fullAddress,
    };

    dispatch(createRefund(data));
  };

  return (
    <div className="create-form-container">
      <h1 className="create-text">Create Refund</h1>
      <form onSubmit={onSubmit} className="create-form">
        <p className="input-container">
          <label>Product</label>
          <input
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
            placeholder="Product"
          ></input>
        </p>

        <p className="input-container">
          <label>Full Address</label>
          <input
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
            required
            placeholder="Full Address"
          ></input>
        </p>

        <p className="input-container">
          <label>Issue</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Issue"
          />
        </p>

        <button className="create-btn">Create</button>
      </form>
    </div>
  );
};

export default Create;
