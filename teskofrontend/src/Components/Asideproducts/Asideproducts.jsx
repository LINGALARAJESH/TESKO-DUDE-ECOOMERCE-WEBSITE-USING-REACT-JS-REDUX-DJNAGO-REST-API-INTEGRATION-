
import "./Asideproduct.css";
import { Row, Col } from "react-bootstrap";
import Card from "../Card/Card";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Asideproducts = () => {
  const { data } = useParams();
  const productList = useSelector((state) => state.productList);
  const products = productList.product;

  return (
    <>
      <section id="product1" className="section-p1">
        <h2>All {data} Products</h2>
        <p>All Summer collection New Morden Design</p>
      </section>
      <Row className="rowdata">
        {products.map((item) => {
          if (data === item.category) {
            return (
              <Col
                key={item._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                xxl={2}
                className="d-flex justify-content-center p-0"
              >
                <Card prods={item} key={item._id} />
              </Col>
            );
          } else {
            return null;
          }
        })}
      </Row>
    </>
  );
};

export default Asideproducts;
