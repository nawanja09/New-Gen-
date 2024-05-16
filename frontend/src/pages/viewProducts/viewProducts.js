import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/product/productList/ProductList";
import ProductSummary from "../../components/product/productSummary/ProductSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getProducts } from "../../redux/features/product/productSlice";

const ViewProducts = () => {

  const dispatch = useDispatch();
  
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
  
      dispatch(getProducts());
    
  }, [ dispatch]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {message}</div>}
      {products && !isLoading && (
        <>
          <ProductSummary products={products} />
          <ProductList products={products} />
        </>
      )}
    </div>
  );
};

export default ViewProducts;
