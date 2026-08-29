import { useFormAndValidation } from "../../../../../hooks/useFormAndValidation.js";

export default function NewCard({ onAddPlaceSubmit }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({
      name: values["card-name"],
      link: values.link,
    });
  }

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_card-name"
        id="card-name"
        maxLength={30}
        minLength={1}
        name="card-name"
        placeholder="Title"
        required
        type="text"
        value={values["card-name"] || ""}
        onChange={handleChange}
      />
      <span className="popup__error" id="card-name-error">
        {errors["card-name"]}
      </span>

      <input
        className="popup__input popup__input_type_url"
        id="card-link"
        name="link"
        placeholder="Image link"
        required
        type="url"
        value={values.link || ""}
        onChange={handleChange}
      />
      <span className="popup__error" id="card-link-error">
        {errors.link}
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
