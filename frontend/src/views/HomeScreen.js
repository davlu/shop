import React, { Fragment, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader"; //spinny wheel when loading
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import MetaHelmet from "../components/MetaHelmet";
//redux
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

///page/:pageNumber
function HomeScreen({ match }) {
  const keyword = match.params.keyword; //what we set it up to in app.js
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList; //get these names from reducers

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Fragment>
      <MetaHelmet />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1> Latest Products </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </Fragment>
      )}
    </Fragment>
  );
}

export default HomeScreen;
