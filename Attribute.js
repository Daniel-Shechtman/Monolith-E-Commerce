import Label from "./Label.js";

export default class Attribute {
  #id;
  #title;
  #labels;
  constructor(id, title, labels) {
    this.#id = id;
    this.#title = title;
    this.#labels = this.getAllLabels(labels);
  }

  getTitle() {
    return this.#title;
  }

  getId() {
    return this.#id;
  }

  getLabels() {
    return this.#labels;
  }
  getAllLabels(labels) {
    const labelsDict = {};
    labels.forEach((label) => {
      labelsDict[label.id] = new Label(this, label.id, label.title);
    });

    return labelsDict;
  }
}
