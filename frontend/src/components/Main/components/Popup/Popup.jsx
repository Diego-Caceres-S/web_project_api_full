export default function Popup(props) {
  //los hijos son el contenido de la ventana emergente
  const { title, children, onClose } = props;
  return (
    <div className="popup">
      <div className="popup__content">
        <button
          aria-label="Cerrar ventana emergente"
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
