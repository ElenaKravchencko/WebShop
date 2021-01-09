import React from "react";
import {BrowserRouter as Router, Link, RouteComponentProps} from "react-router-dom";
import {ShopItem} from "./ShopItem";
import {dataService} from "./DataService";
import {Button, Card, Navbar, Table} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./ShopItemComponent.css";
import "./App.css";
import Carousel from "react-bootstrap/Carousel";
import Accordion from 'react-bootstrap/Accordion'

interface RouteParams {
    id: string;
}

interface ShopItemComponentProps extends RouteComponentProps<RouteParams> {

}

interface ShopItemComponentState {
    item: ShopItem | null;
}

export class ShopItemComponent extends React.Component<ShopItemComponentProps, ShopItemComponentState>{

    constructor(props: Readonly<ShopItemComponentProps> | ShopItemComponentProps) {
        super(props);

        this.state = {
            item: null
        };

        dataService.getById(+this.props.match.params.id).then(value => {
           this.setState({
               ...this.state,
               item: value
           })
        });
    }



    private addToCart(value: ShopItem | null) {
        if (value) {
            dataService.addToCart(value);
        }
    }

    render() {
        return (
           <Container fluid>
               <div className="row">
                   {/*ЗАГОЛОВОК*/}
                   <div className="col-1"></div>
                   <div className="col-11">
                       {
                           this.state.item && (
                               <>
                                   <p className="h4">{this.state.item.title}</p>
                               </>
                           )
                       }
                   </div>
               </div>

               <div className="row">
                   {/*отступим немного*/}
                   <div className="col-1"></div>

                   {/*фото товара в левой части*/}
                   <div className="col-5">
                   {
                       this.state.item && (
                           <div className="col-6">
                               <img className="item-image" src={this.state.item.image}/>
                           </div>
                       )
                   }
                       {
                           this.state.item && (
                               <p className="myp">{this.state.item.description}</p>
                           )
                       }
                       <Button  variant="light" className="mybtn" onClick={event => this.addToCart(this.state.item)}>Add to cart</Button>
                   </div>


                   {/*карусель с отзывами в правой части*/}
                   {/* if this.state.item.descriptionImages != null */}
                   <div className="col-5">
                       {
                           <Carousel>
                               {
                                   this.state.item && (
                                       this.state.item.descriptionImages?.map(image =>
                                           <Carousel.Item>
                                               <img
                                                   className="d-block w-100 mh-100"
                                                   src={image.image}
                                                   alt={image.title}
                                               />
                                               <Carousel.Caption>
                                                   <h2>{image.title}</h2>
                                                   <p>{image.p}</p>
                                               </Carousel.Caption>
                                           </Carousel.Item>
                                       )
                                   )
                               }
                           </Carousel>
                       }
                   </div>
               </div>


               <div className="title2">
                   <h4> Информация по скидкам при покупке товаров оптом: </h4>
               </div>
               <div className="row">
                   <div className="col-1"/>
                   <div className="col-10">
                       <Table striped bordered hover>
                           <thead>
                           <tr>
                               <th></th>
                               <th>Серая карта</th>
                               <th>Серебряная карта </th>
                               <th>Золотая карта</th>
                           </tr>
                           </thead>
                           <tbody>
                           <tr>
                               <td>&#60; 5 шт</td>
                               <td>1%</td>
                               <td>3%</td>
                               <td>5%</td>
                           </tr>
                           <tr>
                               <td>&#62; 5 шт</td>
                               <td>3%</td>
                               <td>5%</td>
                               <td>7%</td>
                           </tr>
                           <tr>
                               <td>&#62; 10 шт</td>
                               <td>5%</td>
                               <td>7%</td>
                               <td>10%</td>
                           </tr>
                           </tbody>
                       </Table>
                       <div className="col-1"></div>
                   </div>
               </div>

               <div className="row mar">
               <div className="col-1"/>
               <div className="col-10 title2">
                   <h5> Ознакомьтесь с правилами приобретения и возврата товара </h5>
               </div>
               </div>
               <div className="row">
               <div className="col-1"/>
               <div className="col-10">
                       <Accordion defaultActiveKey="0">
                           <Card>
                               <Card.Header>
                                   <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                       Правила возврата
                                   </Accordion.Toggle>
                               </Card.Header>
                               <Accordion.Collapse eventKey="0">
                                   <Card.Body>Обратите внимание, наш магазин предоставляет 21 день на возврат товара надлежащего качества.
                                       Также наш магазин предоставляет год гарантии на все товары.
                                       Срок службы товара 2 года.
                                        Также вы всегда можете обратиться к нашим мастерам, если требуется замена какого-либо элемента.
                                       Мы с радостью вышлем вам деталь совершенно бесплатно!</Card.Body>
                               </Accordion.Collapse>
                           </Card>
                           <Card>
                               <Card.Header>
                                   <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                       Скидки, бонусы и персональные предложения
                                   </Accordion.Toggle>
                               </Card.Header>
                               <Accordion.Collapse eventKey="1">
                                   <Card.Body>У нашего магазина предусмотрена система лояльности для клиентов.
                                   Для получения бонусной карты необходимо совершить хотя бы одну покупку и сразу после
                                       совершения первой покупки вы увидите в личном кабинете свою карту, на которую сразу
                                   после покупки будут начислены бонусы в размере 5% от заказа.
                                   1 бонус = 1 рублю.</Card.Body>
                               </Accordion.Collapse>
                           </Card>
                       </Accordion>
               </div>

               <div className="col-1"></div>
               </div>

           </Container>

       );
   }

}
