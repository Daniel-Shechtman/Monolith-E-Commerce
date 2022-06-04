export default class Product {
  #id;
  #title;
  #price;
  #attributesLabelsDict;
  #categories;

  constructor(id, title, price) {
    this.#id = id;
    this.#title = title;
    this.#price = price;
    this.#attributesLabelsDict = {};
    this.#categories = [];
  }

  getId() {
    return this.#id;
  }

  getTitle() {
    return this.#title;
  }

  getPrice() {
    return this.#price;
  }

  getCategories() {
    return this.#categories;
  }

  getAttributes() {
    return Object.values(this.#attributesLabelsDict);
  }

  addLabel(label) {
    label.updateNumRelatedProducts(1);
    const labelsAttributeId = label.getAttribute().getId();
    if (!(labelsAttributeId in this.#attributesLabelsDict)) {
      this.#attributesLabelsDict[labelsAttributeId] = [
        [label.getAttribute(), label],
      ];
    } else {
      this.#attributesLabelsDict[labelsAttributeId][0].push(label);
    }
  }

  addCategory(category) {
    category.updateNumRelatedProducts(1);
    category.updateRelatedAttributes(Object.values(this.#attributesLabelsDict));
    this.#categories.push(category);
  }
}
