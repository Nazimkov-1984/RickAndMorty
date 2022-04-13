import { ICharacter } from "../Characters/Characters";
import "./CharacterCard.css";
import { useCallback } from "react";
import ModalStore from "../../store/ModalStore";

const CharacterCard: React.FC<ICharacter> = ({
  id,
  name,
  image,
  status,
  url,
  species,
  gender,
}) => {
  const onclickHandler = useCallback(() => {
    ModalStore.toggleModal(url);
  }, [url]);

  return (
    <div className="cardContainer" onClick={onclickHandler}>
      <div className="imageWrapper">
        <img className="cardImage" src={image} alt={name} />
        <span>{name}</span>
      </div>

      <div className="cardDescription">
        <div className="rowWrapper">
          <span className="fieldName">Status:</span>
          <span>{status}</span>
        </div>
        <div className="rowWrapper">
          <span className="fieldName">Species:</span>
          <span>{species}</span>
        </div>
        <div className="rowWrapper">
          <span className="fieldName">Gender:</span>
          <span>{gender}</span>
        </div>
      </div>
    </div>
  );
};
export default CharacterCard;
