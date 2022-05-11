// 1
import { useState } from "react";

// 2
const formatDate = (value) => {
  if (!value) {
    return "";
  }
  return new Date(value).toLocaleTimeString();
};

// 3
function MessageBox({ message, onEdit, onDelete }) {
  // 4
  const [isEditing, setIsEditing] = useState(false);
  const [messageText, setMessageText] = useState(message.attributes.content);

  // 5
  const handleOnEdit = async (e) => {
    e.preventDefault();
    await onEdit({ id: message.id, message: messageText });
    setIsEditing(false);
  };

  // 6
  const handleOnDelete = async (e) => {
    e.preventDefault();
    await onDelete({ id: message.id });
  };

  // 7
  return (
    <div>
      <div>
        <p>{formatDate(message.attributes.createdAt)}</p>
        <b>{message.attributes.postedBy}</b>
        <p
          contentEditable
          onFocus={() => setIsEditing(true)}
          onInput={(e) => setMessageText(e.target.innerText)}
        >
          {message.attributes.content}
        </p>
      </div>
      <div>
        {message.attributes.timesUpdated > 0 && (
          <p>Edited {message.attributes.timesUpdated} times</p>
        )}
        {isEditing && (
          <>
            <button onClick={handleOnEdit}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        )}
        <button onClick={handleOnDelete}>Delete</button>
      </div>
    </div>
  );
}

// 8
export default MessageBox;