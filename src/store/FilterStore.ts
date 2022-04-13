import { makeAutoObservable, action, observable } from "mobx";
import { ICharacter } from "../components/Characters/Characters";

class FilterStore {
  public _data?: any[] = [];
  public _dataForRender: ICharacter[] = [];

  constructor() {
    makeAutoObservable(this, {
      _data: observable,
      _dataForRender: observable,
      setData: action,
      setDataForRender: action,
    });
  }

  get getData() {
    return this._data;
  }
  get getDataForRender() {
    return this._dataForRender;
  }

  setData(key: string, field: string) {

    const index  = this._data?.findIndex((el) => el[key] === field);
      // @ts-ignore
    if (index > -1) {
      if (typeof index === "number") {
        this._data?.splice(index, 1);
        console.log(this._data);
      }
    } else {
      const newElement = {};
      // @ts-ignore
      newElement[key] = field;
      this._data?.push(newElement);
    }
  }
  setDataForRender(data: ICharacter[]) {
    this._dataForRender = this._dataForRender.concat(data);
  }
}

export default new FilterStore();
