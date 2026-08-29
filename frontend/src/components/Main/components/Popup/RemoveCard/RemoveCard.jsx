export default function RemoveCard({ card, onCardDelete }) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  return (
    <form className="popup__form" id="remove-card-form" onSubmit={handleSubmit}>
      <p className="popup__confirm-text">
        ¿Estás seguro de que deseas eliminar esta tarjeta? Esta acción no se
        puede deshacer.
      </p>
      <button className="button popup__button" type="submit">
        Sí, eliminar
      </button>
    </form>
  );
}
