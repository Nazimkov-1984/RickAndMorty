import React, { useCallback, useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import "./ToDo.css";

const URL = "https://rickandmortyapi.com/api/episode";

interface IEpisode {
  id: number;
  name: string;
}
interface IMyEpisode {
  id: number;
  done: boolean;
  episode: number;
}

const ToDo = () => {
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  const [isShowSpinner, setIsShowSpinner] = useState<boolean>(false);
  const [myEpisodes, setMyEpisodes] = useState<IMyEpisode[]>([
    { id: 1, done: false, episode: 5 },
  ]);

  useEffect(() => {
    setIsShowSpinner(true);
    fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        setEpisodes(json.results);
        setIsShowSpinner(false);
      });

    if (localStorage.getItem("1") === null) {
      localStorage.setItem(
        myEpisodes[0].id.toString(),
        JSON.stringify(myEpisodes[0])
      );
    } else {
      const keys: string[] = Object.keys(localStorage);
      const allDataFromStorage: IMyEpisode[] = [];
      keys.forEach((key: string) => {
        const result: IMyEpisode = JSON.parse(
          localStorage.getItem(key) as string
        );
        allDataFromStorage.push(result);
      });
      setMyEpisodes(allDataFromStorage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddRecord = useCallback(() => {
    setMyEpisodes((prevState) => {
      const newState: IMyEpisode[] = [...prevState];
      const idArray: number[] = [];
      newState.forEach((el) => {
        idArray.push(el.id);
      });
      const maxId: number = Math.max(...idArray);
      localStorage.setItem(
        (maxId + 1).toString(),
        JSON.stringify({
          id: maxId + 1,
          done: false,
          episode: 1,
        })
      );

      newState.push({
        id: maxId + 1,
        done: false,
        episode: 1,
      });
      return newState;
    });
  }, []);

  const onRemoveItem = useCallback(
    (e: any) => {
      localStorage.removeItem(e.target.id);
      const index: number = myEpisodes.findIndex(
        (el) => el.id.toString() === e.target.id
      );
      const newArray: IMyEpisode[] = [...myEpisodes];
      newArray.splice(index, 1);
      setMyEpisodes(newArray);
    },
    [myEpisodes]
  );

  const onChangeInput = useCallback((e: any) => {
    setMyEpisodes((prevState) => {
      const newState = [...prevState];
      const index: number = newState.findIndex(
        (el) => el.id === Number(e.target.id)
      );
      newState[index].done = e.target.checked;
      return newState;
    });
    const valueObj: IMyEpisode = JSON.parse(
      localStorage.getItem(e.target.id) as string
    );
    valueObj.done = e.target.checked;
    localStorage.setItem(e.target.id, JSON.stringify(valueObj));
  }, []);

  const onChangeSelect = useCallback((e: any) => {
    setMyEpisodes((prevState) => {
      const newState = [...prevState];
      const index: number = newState.findIndex(
        (el) => el.id === Number(e.target.id)
      );
      newState[index].episode = e.target.value;
      return newState;
    });
    const valueObj: IMyEpisode = JSON.parse(
      localStorage.getItem(e.target.id) as string
    );
    valueObj.episode = e.target.value;
    localStorage.setItem(e.target.id, JSON.stringify(valueObj));
  }, []);

  return (
    <>
      <button onClick={onAddRecord}>Add episode</button>
      {myEpisodes.map((record: IMyEpisode) => {
        return (
          <div id={record.id.toString()} key={record.id}>
            <input
              onChange={onChangeInput}
              id={record.id.toString()}
              checked={record.done}
              type={"checkbox"}
            />
            <select
              onChange={onChangeSelect}
              id={record.id.toString()}
              value={record.episode}
              name={"episodes"}
              placeholder={"Change"}
            >
              <option value="" disabled selected>
                Select episode
              </option>
              {episodes.map((episode: IEpisode) => {
                return (
                  <option key={episode.id} value={episode.id}>
                    {episode.name}
                  </option>
                );
              })}
            </select>
            <img
              onClick={onRemoveItem}
              id={record.id.toString()}
              alt={"icon"}
              className="imageTrash"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMa11MTLxI41RKf1Rm5e6M7oIQxKWOAbi3-w&usqp=CAU"
            />
          </div>
        );
      })}

      {isShowSpinner && <Spinner />}
    </>
  );
};

export default ToDo;
