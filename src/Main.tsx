import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from "react-bootstrap/Carousel";

export class Main extends React.Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/light.jpg"
                        alt="Декорации для дома"
                    />
                    <Carousel.Caption>
                        <h3>Декор для дома</h3>
                        <p>Тематический и классический декор для создания уюта</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/peng.jpg"
                        alt="penguin"
                    />

                    <Carousel.Caption>
                        <h3>Елочные игрушки</h3>
                        <p>Деревянные елочные игрушки - это простой и в то же время особенный новогодний декор.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/box.jpg"
                        alt="box"
                    />

                    <Carousel.Caption>
                        <h3>Коробы для фотографий</h3>
                        <p>Наши коробчки для фото станут прекрасным вариантом для хранения снимков.
                            А если вы фотограф, то отдача материала в таких коробах удивит ваших клиентов!</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

        );
    }
}