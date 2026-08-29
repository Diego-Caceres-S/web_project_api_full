import { useContext, useEffect } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext.js";
import { useFormAndValidation } from "../../../../../hooks/useFormAndValidation.js";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    resetForm(
      { name: currentUser?.name || "", description: currentUser?.about || "" },
      {},
      true,
    );
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser({ name: values.name, about: values.description });
  }

  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        id="name"
        className="popup__input popup__input_type_name"
        name="name"
        placeholder="Nombre"
        type="text"
        required
        minLength={2}
        maxLength={40}
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="popup__input-error" id="name-error">
        {errors.name}
      </span>

      <input
        id="description"
        className="popup__input popup__input_type_description"
        name="description"
        placeholder="Acerca de mí"
        type="text"
        required
        minLength={2}
        maxLength={200}
        value={values.description || ""}
        onChange={handleChange}
      />
      <span className="popup__input-error" id="description-error">
        {errors.description}
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
