import React, { useEffect } from "react";
import "./css/Refunds.css";
import { useSelector, useDispatch } from "react-redux";
import { getRefunds, reset } from "../features/refund/refundSlice";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Refunds = () => {
  const { refunds, isSuccess, isLoading } = useSelector(
    (state) => state.refund
  );

  console.log(refunds);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRefunds());
  }, []);

  if (isSuccess) {
    dispatch(reset());
  }

  if (isLoading) {
    return <Loading />;
  }

  const allRefunds = refunds.map((refund) => {
    return (
      <div key={refund._id} className="table-contents">
        <p>{refund.fullAddress}</p>
        <p>{refund.product}</p>
        <p>{refund.description}</p>
        <p className={`status-text-${refund.status}`}>{refund.status}</p>
        <Link to={`/refund/${refund._id}`}>
          <button className="view-btn">View</button>
        </Link>
      </div>
    );
  });

  return (
    <div className="refunds-container">
      <h1 className="refunds-text">List of Refunds</h1>

      <div className="table-header">
        <h3>Address</h3>
        <h3>Product</h3>
        <h3>Issue</h3>
        <h3>Status</h3>
        <h3>Action</h3>
      </div>

      {allRefunds.length > 0 ? (
        allRefunds
      ) : (
        <div>
          <h3 className="refunds-show-text">No Refunds Show</h3>
        </div>
      )}
    </div>
  );
};

export default Refunds;
