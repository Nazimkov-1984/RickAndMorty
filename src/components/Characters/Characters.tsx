import { useCallback, useEffect, useState } from "react";
import CharacterCard from "../CharacterCard/CharacterCards";
import "./Characters.css";
import Spinner from "../Spinner/Spinner";
import classNames from "classnames";
import Filter from "../Filter/Filter";
import FilterStore from "../../store/FilterStore";

export interface ICharacter {
  id: number;
  name: string;
  image: string;
  status: string;
  url: string;
  species: string;
  gender: string;
}

const MAX_PAGES: number = 42;
const QUANTITY_PAGINATION_ITEM: number = 6;

const Characters = () => {
  const [charactersData, setCharactersData] = useState<ICharacter[]>([]);
  const [isShowSpinner, setIsShowSpinner] = useState<boolean>(false);
  const [numberPage, setNumberPage] = useState<number>(1);
  const [visiblePaginationItem, setVisiblePaginationItem] = useState<number[]>([
    1, 2, 3, 4, 5, 6,
  ]);
  const speciesVariant: string[] = [];
  const statusVariant: string[] = [];
  const genderVariant: string[] = [];
  const [filteredData, setFilteredData] = useState<ICharacter[]>([]);

  const getData = useCallback((numberPage?: number) => {
    setIsShowSpinner(true);
    const url: string = numberPage
      ? `https://rickandmortyapi.com/api/character?page=${numberPage}`
      : "https://rickandmortyapi.com/api/character?page=1";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setCharactersData(json.results);
        setIsShowSpinner(false);
      });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const onclickButtonPagination = useCallback(
    (status: string) => {
      if (status === "next") {
        setNumberPage((prevState) => {
          getData(prevState + 1);
          return prevState + 1;
        });
        if (numberPage >= visiblePaginationItem[5]) {
          setVisiblePaginationItem((prevState) => {
            return prevState.map((el) => el + QUANTITY_PAGINATION_ITEM);
          });
        }
      } else {
        setNumberPage((prevState) => {
          getData(prevState - 1);
          return prevState - 1;
        });
        if (numberPage <= visiblePaginationItem[0]) {
          setVisiblePaginationItem((prevState) => {
            return prevState.map((el) => el - QUANTITY_PAGINATION_ITEM);
          });
        }
      }
      setFilteredData([]);
    },
    [getData, numberPage, visiblePaginationItem]
  );

  const onClickPaginationItem = useCallback(
    (e: any) => {
      getData(e.target.id);
      setNumberPage(Number(e.target.id));
      setFilteredData([]);
    },
    [getData]
  );

  const onFilterChange = useCallback(
    (id: string, value: boolean) => {
      const key: string = id.split("-")[0];
      const field: string = id.split("-")[1];

      FilterStore.setData(key, field);

      const filter: [] = FilterStore.getData as [];
      console.log(filter.length);

      if (filter?.length === 0) {
        setFilteredData([]);
      } else {
        filter.forEach((filterItem) => {
          const key: string = Object.keys(filterItem)[0];
          const newArr: ICharacter[] = charactersData.filter(
            // @ts-ignore
            (el) => el[key] === filterItem[key]
          );
          FilterStore.setDataForRender(newArr);
        });
        const bigArray: ICharacter[] = FilterStore.getDataForRender;
        let result: ICharacter[] = [];

        bigArray.forEach((element: ICharacter, index: number) => {
          if (result.findIndex((el) => el.id === element.id) === -1) {
            result.push(element);
          }
        });
        setFilteredData(result);
      }
    },
    [charactersData]
  );

  charactersData.forEach((el) => {
    if (!statusVariant.includes(el.status)) {
      statusVariant.push(el.status);
    }
    if (!speciesVariant.includes(el.species)) {
      speciesVariant.push(el.species);
    }
    if (!genderVariant.includes(el.gender)) {
      genderVariant.push(el.gender);
    }
  });

  return (
    <div className="cardsWrapper">
      <Filter
        onFilterChange={onFilterChange}
        status={statusVariant}
        species={speciesVariant}
        gender={genderVariant}
      />
      <div className="charactersGridContainer">
        {filteredData.length > 0 &&
          filteredData.map((item: ICharacter) => {
            return (
              <CharacterCard
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                status={item.status}
                url={item.url}
                species={item.species}
                gender={item.gender}
              />
            );
          })}
        {filteredData.length === 0 &&
          charactersData.map((item: ICharacter) => {
            return (
              <CharacterCard
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                status={item.status}
                url={item.url}
                species={item.species}
                gender={item.gender}
              />
            );
          })}
      </div>
      <div className="pagination">
        <div
          onClick={() => onclickButtonPagination("prev")}
          className={classNames("buttonPagination", {
            buttonDisabled: numberPage === 1,
          })}
        >
          {"<Back"}
        </div>
        <ul className="listPagination">
          {visiblePaginationItem.map((number, index) => {
            return (
              <li
                id={number.toString()}
                onClick={onClickPaginationItem}
                key={index}
                className={classNames("paginationItem", {
                  activePage: numberPage === number,
                })}
              >
                {number}
              </li>
            );
          })}
        </ul>
        <div
          onClick={() => onclickButtonPagination("next")}
          className={classNames("buttonPagination", {
            buttonDisabled: numberPage === MAX_PAGES,
          })}
        >
          {"Forward>"}
        </div>
      </div>
      {isShowSpinner && <Spinner />}
    </div>
  );
};

export default Characters;
