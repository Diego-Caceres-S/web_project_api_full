export default function ImagePopup({ card }) {
  return (
    <div className="popup__content_content_image">
      <img className="popup__image" src={card.link} alt={card.name} />
      <p className="popup__caption">{card.name}</p>
    </div>
  );
}
