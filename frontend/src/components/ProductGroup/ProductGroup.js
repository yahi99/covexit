import React from 'react';

import './ProductGroup.scss';
import ProductItem from 'components/ProductItem/ProductItem';

const ProductGroup = ({ products, edit, groupName}) => {
  return (
    <article id={groupName} className="ProductGroup">
      <h3 className="ProductGroup-heading">{groupName}</h3>

      {products.map(product =>
        <ProductItem key={product.id} product={product} edit={edit}/>
      )}
    </article>
  );
}

export default ProductGroup;
