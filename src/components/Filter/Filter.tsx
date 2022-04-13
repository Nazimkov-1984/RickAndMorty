import "./Filter.css";
import { useCallback } from "react";

interface IProps {
  species: string[];
  status: string[];
  gender: string[];
  onFilterChange: (id: string, value: boolean) => void;
}
const Filter: React.FC<IProps> = ({
  species,
  status,
  gender,
  onFilterChange,
}) => {
  const onChangeHandler = useCallback(
    (e: any) => {
      onFilterChange(e.target.id, e.target.checked);
    },
    [onFilterChange]
  );

  return (
    <div className="filterContainer">
      <div className="sectionWrapper">
        <span className="sectionTitle">Species</span>
        {species.map((el: string, index: number) => {
          return (
            <div key={`species${index}`} className="itemWrapper">
              <input
                id={`species-${el}`}
                onChange={onChangeHandler}
                className="input"
                type={"checkbox"}
              />
              <label className="label">{el}</label>
            </div>
          );
        })}
      </div>

      <div className="sectionWrapper">
        <span className="sectionTitle">Gender</span>
        {gender.map((el: string, index: number) => {
          return (
            <div key={`gender${index}`} className="itemWrapper">
              <input
                id={`gender-${el}`}
                onChange={onChangeHandler}
                className="input"
                type={"checkbox"}
              />
              <label className="label">{el}</label>
            </div>
          );
        })}
      </div>
      <div className="sectionWrapper">
        <span className="sectionTitle">Status</span>
        {status.map((el: string, index: number) => {
          return (
            <div key={`status${index}`} className="itemWrapper">
              <input
                id={`status-${el}`}
                onChange={onChangeHandler}
                className="input"
                type={"checkbox"}
              />
              <label className="label">{el}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
