import "./ModalInfoCharacter.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import ModalStore from "../../store/ModalStore";
import { observer } from "mobx-react-lite";
import Episodes from "./Episodes/Episodes";
import Spinner from "../Spinner/Spinner";

interface IAdditionalCharacterData {
  id: number;
  name: string;
  image: string;
  status: string;
  url: string;
  species: string;
  gender: string;
  created: string;
  location: {
    name: string;
    url: string;
  };
  episode: string[];
}

const ModalInfoCharacter = observer(() => {
  const [characterData, setCharacterData] =
    useState<IAdditionalCharacterData | null>(null);
  const [isLoadedData, setIsLoadedData] = useState<boolean>(false);

  const onCloseModal = useCallback(() => {
    ModalStore.toggleModal();
  }, []);

  useEffect(() => {
    const url = ModalStore.urlForAdditionalData;
    setIsLoadedData(true);
    if (url) {
      fetch(`${url}`)
        .then((response) => response.json())
        .then((json) => {
          setCharacterData(json);
          setIsLoadedData(false);
        });
    }
    // eslint-disable-next-line
  }, [ModalStore.urlForAdditionalData]);

  const dateCreated = useMemo(() => {
    return new Date(`${characterData?.created}`).toLocaleDateString();
  }, [characterData?.created]);

  if (ModalStore.isOpenModal) {
    return (
      <div className="modal">
        <div className="modalBody">
          <img
            className="modalImg"
            src={characterData?.image}
            alt={characterData?.name}
          />
          <div className="description">
            <div className="rowWrapper">
              <span className="fieldName">Name:</span>
              <span>{characterData?.name}</span>
            </div>
            <div className="rowWrapper">
              <span className="fieldName">Status:</span>
              <span>{characterData?.status}</span>
            </div>
            <div className="rowWrapper">
              <span className="fieldName">Species:</span>
              <span>{characterData?.species}</span>
            </div>
            <div className="rowWrapper">
              <span className="fieldName">Gender:</span>
              <span>{characterData?.species}</span>
            </div>
            <div className="rowWrapper">
              <span className="fieldName">Created:</span>
              <span>{dateCreated}</span>
            </div>
            <div className="rowWrapper">
              <span className="fieldName">Location:</span>
              <span>{characterData?.location.name}</span>
            </div>
            <Episodes episodes={characterData?.episode} />
          </div>
          <button className="modalButton" onClick={onCloseModal}>
            Close
          </button>
        </div>
        {isLoadedData && <Spinner />}
      </div>
    );
  } else return null;
});
export default ModalInfoCharacter;
