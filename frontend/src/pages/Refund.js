import React, { useEffect, useState } from "react";
import "./css/Refund.css";
import { useParams, useNavigate } from "react-router-dom";
import { getRefund, closeRefund, reset } from "../features/refund/refundSlice";
import {
  getNotes,
  createNote,
  reset as notesReset,
} from "../features/note/noteSlice";
import { getUsers, reset as userReset } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Modal from "react-modal";
import NoteItem from "../components/NoteItem";
import Loading from "../components/Loading";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%,-50%)",
    position: "relative",
    border: "2px solid black",
  },
};

Modal.setAppElement("#root");

const Refund = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [text, setText] = useState("");

  const { refund, isLoading } = useSelector((state) => state.refund);
  const { user } = useSelector((state) => state.auth);
  const { isSuccess: userIsSuccess, users } = useSelector(
    (state) => state.user
  );
  const { notes, isLoading: noteIsLoading } = useSelector(
    (state) => state.note
  );
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  console.log(userIsSuccess);

  useEffect(() => {
    dispatch(getRefund(params.refundId));
  }, [dispatch, params.refundId]);

  useEffect(() => {
    dispatch(getNotes(params.refundId));
  }, [dispatch, params.refundId]);

  const handleClose = () => {
    dispatch(closeRefund(params.refundId));

    setTimeout(() => {
      toast.success("Closed Refund");

      navigate("/refunds");
    }, 500);
  };

  const openModal = () => setModalIsOpen(true);

  const closeModal = () => setModalIsOpen(false);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createNote({ refundId: params.refundId, text }));

    setText("");
    closeModal();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="refund-container">
      <h1 className="refund-text">Refund Details</h1>

      <div className="name-text-container">
        Request by:{" "}
        <span className="name-text">
          {users.map((user) => (user._id === refund.user ? user.name : null))}
        </span>
      </div>

      <div className="refund-headers">
        <h3>Address</h3>
        <h3>Status</h3>
        <h3>Product</h3>
        <h3>Issue</h3>
      </div>

      <div className="refund-contents">
        <p>{refund.fullAddress}</p>
        <p className={`status-text-${refund.status}`}>{refund.status}</p>
        <p> {refund.product}</p>
        <p>{refund.description}</p>
      </div>

      <div className="notes-container">
        <h3 className="follow-up-text">Follow up your Refund</h3>

        {notes.length > 0 ? (
          notes.map((note) => {
            return <NoteItem key={note._id} note={note} />;
          })
        ) : (
          <p className="notes-show-text">No Notes Show</p>
        )}

        {refund.status === "processing" ? (
          <button className="add-note-btn" onClick={openModal}>
            Add Note
          </button>
        ) : (
          ""
        )}

        {refund.status === "processing" && user.isStaff === false ? (
          <button className="close-btn" onClick={handleClose}>
            Close
          </button>
        ) : null}

        {refund.status === "processing" && user.isStaff === false && (
          <p className="reminder-text">
            <span className="reminder">Reminder:</span> Please click the close
            button if you already received your money.
          </p>
        )}

        {refund.status === "refunded" && user.isStaff === false && (
          <p className="reminder-text">
            <span className="reminder">Reminder:</span> This is already
            refunded.
          </p>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="add note"
        >
          <div className="modal-header-container">
            <h2>Add Note</h2>
            <button className="modal-btn-close" onClick={closeModal}>
              x
            </button>
          </div>

          <form className="modal-form-container" onSubmit={onSubmit}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            ></input>

            <button className="add-modal-btn" type="submit">
              Add
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Refund;
