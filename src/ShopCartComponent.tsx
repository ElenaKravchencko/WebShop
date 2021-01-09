import React from "react";
import Container from "react-bootstrap/cjs/Container";
import {CartItem} from "./Cart";
import {dataService} from "./DataService";
import {ShopItem} from "./ShopItem";
import {Button, Card} from "react-bootstrap";
import "./ShopCart.css";


interface ShopCartComponentState {
    cart: CartItem[];
    cartItemMapping: Map<number, ShopItem>;
}

export class ShopCartComponent extends React.Component<{}, ShopCartComponentState>{


    constructor(props: Readonly<{}> | {}) {
        super(props);

        this.state = {
            cart: [],
            cartItemMapping: new Map<number, ShopItem>()
        };

        dataService.getCart().then(async value => {
            this.setState({
                ...this.state,
                cart: value
            });

            let mapping: Map<number, ShopItem> = new Map<number, ShopItem>();

            value.forEach(async cartItem => {
                let shopItem = await dataService.getById(cartItem.itemId);

                if (shopItem != null) {
                    mapping.set(cartItem.itemId, shopItem);
                }

                this.setState({
                    ...this.state,
                    cartItemMapping: mapping
                });
            })

        });

    }


    private addToCart(value: ShopItem) {
        dataService.addToCart(value);
        this.forceUpdate();
        alert('Обновите, пожалуйста, страницу')

    }



    render() {

        return (

            <Container fluid>
                <div>
                    <div className="title">
                        <h4>Корзина</h4>
                    </div>

                {
                    this.state.cart.length > 0 && this.state.cart.map(value => {
                        return (
                                <div className={"row"}>
                                    <div className="col-1" >
                                    </div>

                                    <div className="col-3 high">
                                    <span >{this.state.cartItemMapping.get(value.itemId)?.title}</span>
                                    </div>

                                    <div className="col-2" > {this.state.cartItemMapping.get(value.itemId)?.price} руб. </div>

                                    <div className={"col-2"}>
                                        <span>&nbsp;</span>     {value.quantity}  <span>&nbsp;</span>
                                        <Button  variant="light"  size="sm" className="cartbtn"  onClick={event => this.addToCart(this.state.cartItemMapping.get(value?.itemId)!)} >+</Button>
                                    </div>

                                    <div className="col-1" >
                                        <img className="cart-img" alt="cartItmimg" src={this.state.cartItemMapping.get(value.itemId)?.image}/>
                                    </div>

                                </div>

                    );
                    })
                }
                </div>
                {
                    this.state.cart.length === 0 && (<h4>Корзина пуста</h4>)
                }
                <div className={"row"}>
                    <div className={"col-2"}>
                    </div>
                    <div className={"col-8"}>
                <Card className="text-center">
                    <Card.Header>Ваш заказ</Card.Header>
                    <Card.Body>
                        <Card.Title>Пожалуйста, обратите внимание</Card.Title>
                        <Card.Text>
                           На данный момент на нашем сайте ведутся технические работы, оформление заказа может быть недоступно
                        </Card.Text>
                        <Button variant="primary"   onClick={() => {
                            alert('Оформление заказов временно недоступно. Приносим свои извинения!')
                        }}>Оформить заказ</Button>
                    </Card.Body>
                </Card>
                    </div>
                    <div className={"col-2"}>
                    </div>
                </div>
            </Container>
        );
    }


}
