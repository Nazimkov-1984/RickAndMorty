import { observable, makeAutoObservable, action, computed } from "mobx";

class ModalStore {
  public _isOpenModal: boolean = false;
  public _url?: string;

  constructor() {
    makeAutoObservable(this, {
      _isOpenModal: observable,
      _url: observable,
      toggleModal: action,
      isOpenModal: computed,
    });
  }

  get isOpenModal() {
    return this._isOpenModal;
  }

  get urlForAdditionalData() {
    return this._url;
  }

  toggleModal = (url?: string) => {
    this._url = url;
    this._isOpenModal = url !== undefined;
  };
}

export default new ModalStore();
