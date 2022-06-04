export default class Label {
  #id;
  #title;
  #attribute;
  #numRelatedProductCnt;
  constructor(attribute, id, title) {
    this.#id = id;
    this.#title = title;
    this.#attribute = attribute;
    this.#numRelatedProductCnt = 0;
  }

  getAttribute() {
    return this.#attribute;
  }

  getTitle() {
    return this.#title;
  }

  getCounter() {
    return this.#numRelatedProductCnt;
  }

  updateNumRelatedProducts(amount) {
    this.#numRelatedProductCnt += amount;
  }
}
