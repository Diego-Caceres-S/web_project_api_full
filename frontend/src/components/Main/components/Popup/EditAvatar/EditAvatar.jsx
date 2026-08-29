import { useContext, useRef, useState } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext.js";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    setError(e.target.validationMessage);
    setIsValid(e.target.closest("form").checkValidity());
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateAvatar({ avatar: avatarRef.current.value });
  }

  return (
    <form
      className="popup__form"
      id="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-url"
        className="popup__input popup__input_type_avatar"
        name="avatar"
        placeholder="Enlace a la nueva foto"
        required
        type="url"
        ref={avatarRef}
        onChange={handleChange}
      />
      <span className="popup__input-error" id="avatar-url-error">
        {error}
      </span>

      <button
        className="button popup__button"
        type="submit"
        disabled={!isValid}
      >
        Guardar
      </button>
    </form>
  );
}
