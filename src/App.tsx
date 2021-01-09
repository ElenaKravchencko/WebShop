import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Main} from "./Main";
import {ShopListComponent} from "./ShopListComponent";
import {ShopItemComponent} from "./ShopItemComponent";
import {ShopCartComponent} from "./ShopCartComponent";
import {BrowserRouter as Router, Link, Route, Switch,} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {CartItem} from "./Cart";
import {dataService} from "./DataService";
import Badge from "react-bootstrap/Badge";



interface AppState {
    cart: CartItem[];
}

export class App extends React.Component<{}, AppState> {


    constructor(props: Readonly<{}> | {}) {
        super(props);

        this.state = {
            cart: []
        };

        dataService.getCart().then(value => {
            this.setState({
                ...this.state,
                cart: value
            });
        })
    }

    render() {
        return (
            <div>
            <Router>
                {/*NAV BAR из BOOTSTRAP LIB*/}
                <Navbar className="navbar-abc">
                    <a className="h3" href="/">ENWOOD</a>
                    <span>&nbsp;&nbsp;</span>
                    <Nav className="mr-auto">
                        <a className="h6" href="/catalogue">Каталог</a>
                    </Nav>
                    <Link to={"/cart"}>
                        <Button variant={"light"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black"
                                 className="bi bi-cart" viewBox="0 0 16 16">
                                <path
                                      d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                            </svg>

                            <Badge className="ml-1" variant="light">{this.state.cart.length}</Badge>
                        </Button>
                    </Link>
                </Navbar>

                <Switch>
                    <Route exact={true} path="/">
                        <Main/>
                    </Route>

                    <Route exact={true} path="/catalogue">
                        <ShopListComponent/>
                    </Route>

                    <Route path="/item/:id" component={ShopItemComponent}/>

                    <Route exact={true} path="/cart">
                        <ShopCartComponent/>
                    </Route>
                </Switch>
            </Router>
                <footer className={"foot"}>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            ENWOOD 2020
                        </div>
                        <div className={"col-5 ri"}>
                            ellenkrav@gmail.com
                        </div>
                        <div className={"col-1"}>
                        </div>
                    </div>

                </footer>
            </div>

        );
    }

}

export default App;
