const InfoTooltip = ({ icon, text, onClose }) => {
  console.log(icon, text);
  return (
    <div className="popup__container">
      <div className={`popup__card`}>
        <img src={icon} alt={text} />

        {text && <h3 className="popup__text">{text}</h3>}
        <button
          className={"popup__button-close"}
          draggable="true"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default InfoTooltip;
