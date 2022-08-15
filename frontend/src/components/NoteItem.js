import React from "react";
import "./css/NoteItem.css";
import { useSelector } from "react-redux";

const NoteItem = ({ note }) => {
  const { users } = useSelector((state) => state.user);

  const name = users.map((user) => {
    if (note.user === user._id && user.isStaff === false) {
      return user.name;
    } else if (note.user === user._id && user.isStaff === true) {
      return "Staff";
    }
  });

  return (
    <div className="note-text">
      <p>{name}</p>
      <p> {note.text}</p>
      <p>( {new Date(note.createdAt).toLocaleString("en-PH")} )</p>
    </div>
  );
};

export default NoteItem;
