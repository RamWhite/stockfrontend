import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import AppBar from '../navbar/Appbar'
import ajax from '../../Services/fetchService';
import { useLocalState } from '../../util/useLocalStorage';

const ProductView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const productId = window.location.href.split("/nomenclature/")[1];
    const [product, setProduct] = useState({
      name: "",
      barcode: "",
      type: "",
      arrivingCost: "",
      sellingPrice: ""
    });
    const [productTypeEnums, setProductTypeEnums] = useState([])

    function updateProduct(prop, value){
      const newProduct = {...product};
      newProduct[prop] = value;
      setProduct(newProduct);
      console.log(product);
    }

    function saveProduct(){
      ajax(`/nomenclature/updateProduct/${productId}`, "PUT", jwt, product).then(
        (productData) => {
          setProduct(productData);
          window.location.href="/nomenclature";
        }
      );
    }

    useEffect(() => {
      ajax(`/nomenclature/getProduct/${productId}`, "GET", jwt).then(
        (productData) => {
          // let productData = productResponse.product;
          setProduct(productData);
          // setProductTypeEnums(productResponse.productTypeEnums);
        }
      );
    }, [])   

    return(
      <>
      <AppBar />
      <Container className="mt-5">
        <Row className="d-flex align-items-center">
          <Col>
            Product Name: {productId}
          </Col>
        </Row>
        {product ? (
          <>
            <Form.Group as={Row} className="my-3" controlId="productName">
              <Col sm="9" md="8" lg="6">
                {/* <DropdownButton
                  as={ButtonGroup}
                  variant={"info"}
                  title="PIECE"
                  title={
                    product.id
                      ? `product ${product.id}`
                      : "Select product"
                  }
                  onSelect={(selectedElement) => {
                    updateProduct("id", selectedElement);
                  }}
                >
                  {productTypeEnums.map((productTypeEnum) => (
                    <Dropdown.Item
                      key={productTypeEnum.productType}
                      eventKey={productTypeEnum.productType}
                    >
                      {productTypeEnum.productType}
                    </Dropdown.Item>
                  ))}
                </DropdownButton> */}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="my-3" controlId="githubUrl">
              <Form.Label column sm="3" md="2">
                Name:
              </Form.Label>
              <Col sm="9" md="8" lg="6">
                <Form.Control
                  type="text"
                  placeholder="name"
                  onChange={(e) => updateProduct("name", e.target.value)}
                  value={product.name}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="branch">
              <Form.Label column sm="3" md="2">
                Barcode:
              </Form.Label>
              <Col sm="9" md="8" lg="6">
                <Form.Control
                  type="text"
                  placeholder="barcode"
                  onChange={(e) => updateProduct("barcode", e.target.value)}
                  value={product.barcode}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="branch">
              <Form.Label column sm="3" md="2">
                Arriving Cost:
              </Form.Label>
              <Col sm="9" md="8" lg="6">
                <Form.Control
                  type="number"
                  placeholder="arriving_cost"
                  onChange={(e) => updateProduct("arrivingCost", e.target.value)}
                  value={product.arrivingCost}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="branch">
              <Form.Label column sm="3" md="2">
                Selling Price:
              </Form.Label>
              <Col sm="9" md="8" lg="6">
                <Form.Control
                  type="number"
                  placeholder="selling_price"
                  onChange={(e) => updateProduct("sellingPrice", e.target.value)}
                  value={product.sellingPrice}
                />
              </Col>
            </Form.Group>

            <div className="d-flex gap-5">
              <Button
                size="lg"
                onClick={saveProduct}
              >
                Create Product
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}
      </Container>
    </>
    );
}

export default ProductView;