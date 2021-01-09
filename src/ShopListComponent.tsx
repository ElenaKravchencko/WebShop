import React from "react";
import {Button, Card } from "react-bootstrap";
import {dataService} from "./DataService";
import {ShopItem} from "./ShopItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Category} from "./Category";
import {Link} from "react-router-dom";
import "./ShopList.css";

interface ShopListComponentState {
    items: ShopItem[];
    categories: Category[];
}

export class ShopListComponent extends React.Component<{}, ShopListComponentState> {

    constructor(props: Readonly<{}> | {}) {
        super(props);

        this.state = {
            items: [],
            categories: []
        };

        dataService.getAll().then(value => {
            this.setState({
                ...this.state,
                items: value
            });
        });

        dataService.getAllCategories().then(value => {
            this.setState({
                ...this.state,
                categories: value
            });
        });
    }

    onCategorySelect(category: Category) {
        dataService.getAllByCategory(category).then(value => {
            this.setState({
                ...this.state,
                items: value
            });
        });
    }

    private addToCart(value: ShopItem) {
        dataService.addToCart(value);
    }

    render() {
        return (
            <Container fluid>
                <Row className={"marg"}>
                    <h6>Выберите, пожалуйста, интересную вам категорию:</h6>
                </Row>
                <Row className="mb-1, cats">
                    {
                        this.state.categories.map(value => {
                           return (
                               <Button className="ml-1 mr-1" variant={"secondary"} onClick={event => this.onCategorySelect(value)}>
                                   {value.title}
                               </Button>
                           );
                        })
                    }
                </Row>

                <Row>

                </Row>


                <Row>
                    {
                        this.state.items.map(value => {
                            return (
                                <Col sm={12} xs={12} md={3}>
                                    <Card>
                                        <Card.Img variant="top" src={value.image} />
                                        <Card.Body>
                                            <Card.Title>{value.title}</Card.Title>
                                            <Card.Text>{value.description}</Card.Text>
                                            <Link to={`/item/${value.id}`}>
                                                <Button variant={"secondary"}>View</Button>
                                            </Link>
                                            <Button className="mybtn" onClick={event => this.addToCart(value)}>Add to cart</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })
                    }
                </Row>


            </Container>
        );
    }

}
