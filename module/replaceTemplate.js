module.exports = (temp, product) => {
  let output = temp.replaceAll("{%PRODUCTNAME%}", product.productName);
  output = output.replaceAll("{%IMAGE%}", product.image);
  output = output.replaceAll("{%PRICE%}", product.price);
  output = output.replaceAll("{%NUTRIENTS%}", product.nutrients);
  output = output.replaceAll("{%QUANTITY%}", product.quantity);
  output = output.replaceAll("{%DESCRIPTION%}", product.description);
  output = output.replaceAll("{%FROM%}", product.from);
  output = output.replaceAll("{%id%}", product.id);
  if (!product.organic) {
    output = output.replaceAll("{%NOTORGANIC%}", "not-organic");
  }
  return output;
};

// export default replaceTemplate;
