import Attribute from "./Attribute.js";
import Product from "./Product.js";
import Category from "./Category.js";
import axios from "axios";
import fs from "fs";

const api = "https://backend-assignment.bylith.com/index.php";
let attributes;
let products;
let categories;
let labels;

const startAllExercises = async () => {
  labels = {};
  attributes = {};
  products = {};
  categories = {};
  await getData();
  const allProducts = getAllProductsObjects();
  const allCategories = getAllCategoriesObjects();
  const htmlData = getDataHtml(allCategories, allProducts);
  fs.writeFileSync("E-Commerce-Catalog.html", htmlData);
};

const parseDataFromApi = (data) => {
  data.attributes.forEach((attribute) => {
    attributes[attribute.id] = new Attribute(
      attribute.id,
      attribute.title,
      attribute.labels
    );
    labels = { ...labels, ...attributes[attribute.id].getLabels() };
  });

  data.products.forEach((product) => {
    const productObject = new Product(product.id, product.title, product.price);
    product.labels.forEach((label) => {
      const labelObject = getLabelObject(label);
      productObject.addLabel(labelObject);
    });
    product.categories.forEach((category) => {
      const categoryObject = getCategoryObject(category);
      productObject.addCategory(categoryObject);
    });

    products[product.id] = productObject;
  });
};

// Exercise #2
const getData = async () => {
  const apiData = await getDataFromApi();
  parseDataFromApi(apiData);
};

const getDataFromApi = async () => {
  const response = await axios.get(api);
  if (response.status === 200) {
    const data = await response.data;
    return data;
  } else {
    console.log('The Response Status isn"t right');
  }
};

// Exercise #3
const getAllProductsObjects = () => {
  return Object.values(products);
};

// Exercise #4
const getAllCategoriesObjects = () => {
  return Object.values(categories);
};

const getLabelObject = (labelId) => {
  return labels[labelId];
};

const getCategoryObject = (category) => {
  const categoryId = category.id;
  let categoryObject;
  if (categoryId in categories) {
    categoryObject = categories[categoryId];
  } else {
    categoryObject = new Category(category.id, category.title);
    categories[categoryId] = categoryObject;
  }

  return categoryObject;
};

const categoriesHtml = (allCategories) => {
  const categoriesHtml = `
    <h3 class="categories-number">There are ${
      allCategories.length
    } Categories</h3>
    <div class="categories">
        ${allCategories.map((category) => categoryHtml(category)).join("")}
    </div>
  `;

  return categoriesHtml;
};

const categoryHtml = (category) => {
  return `<div class="category">
      <h3> ${category.getTitle()}</h3>
      <h5>There are ${category.getCounter()} Products related to ${category.getTitle()}</h5>
      <p>Related attributes : ${category
        .getAttributes()
        .map(
          (attribute) => `
          <h6 class="attribute"> 
            ${attribute}
          </h6>
        `
        )
        .join("")}</p>
    </div>
    `;
};

const productsHtml = (allProducts) => {
  const rawProductHtml = `
  <h3 class="products-number">
    There are ${allProducts.length} Products
  </h3>
  <div class="products">
        ${allProducts.map((product) => productHtml(product)).join("")}
    </div>

  `;
  return rawProductHtml;
};

const productHtml = (product) => {
  const currentHtml = `
  <div class="product">
  <h5 class="product-title">
    ${product.getTitle()}
  </h5>
  <p>There are <span class="categories-per-product">${
    product.getCategories().length
  }</span> categories related to this product </p>
  <p>Related Categories: ${product
    .getCategories()
    .map(
      (category) => `<span class='category-title'>${category.getTitle()}</span>`
    )
    .join("///")}
    ${attributeHtml(...product.getAttributes())}
    </div>
  `;
  return currentHtml;
};

const attributeHtml = (data) => {
  if (data !== undefined) {
    const [att, ...labels] = data[0];
    return `
      <p>
        ${att.getTitle()}:
        ${labels
          .map((label) => {
            return `<span>
            ${label.getTitle()}(#${label.getCounter()})</span>
          `;
          })
          .join("")}
      </p>
    `;
  } else {
    return ``;
  }
};

// Exercise 5
const getDataHtml = (allCategories, allProducts) => {
  const data = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
  
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
  
        .categories-number {
          text-align: center;
          font-size: 3rem;
          border: 1px black solid;
          background-color: #faf5e4;
          margin-top: 2px;
        }
  
        .categories {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin: 10px 30px;
        }

        .products-number{
          text-align: center;
          font-size: 3rem;
          border: 1px black solid;
          background-color: #faf5e4;
          margin-top: 2px;
        }

        .products {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 5px;
          margin-top: 10px;
        }

        .product{
          padding: 5px 10px;
          border: 1px solid teal;
          text-align: center;
        }

        .category-title{
          color:blue;
          font-wight: bold;
          font-size: 1.1rem;
        }
  
        .category {
          padding: 10px 15px;
          border: 1px blue solid;
          text-align: center;
        }

        .attribute{
          color: red;
          border: 1px solid white;
          font-size: 1.2rem;
        }
        .categories-per-product{
          color: red;
          margin: 0 1px;
        }
      </style>
    </head>
    <body>
        ${categoriesHtml(allCategories)}
        ${productsHtml(allProducts)}
    </body>
    </html>`;

  return data;
};

startAllExercises();
