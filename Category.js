export default class Category {
  #id;
  #title;
  #numOfRelatedProduct;
  #relatedAttributes;
  constructor(id, title) {
    this.#id = id;
    this.#title = title;
    this.#numOfRelatedProduct = 0;
    this.#relatedAttributes = [];
  }

  getId() {
    return this.#id;
  }

  getTitle() {
    return this.#title;
  }

  getAttributes() {
    return this.#relatedAttributes;
  }

  getCounter() {
    return this.#numOfRelatedProduct;
  }

  updateRelatedAttributes(attributesList) {
    attributesList.forEach((attribute) => {
      const [attObj, ...labelObject] = attribute[0];
      if (!this.#relatedAttributes.includes(attObj.getTitle())) {
        this.#relatedAttributes.push(attObj.getTitle());
      }
    });
  }

  updateNumRelatedProducts(amount) {
    this.#numOfRelatedProduct += amount;
  }
}
