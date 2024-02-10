import { useSelector, useDispatch } from "react-redux";
import { startCreateOrder } from "../../actions/order-action";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => {
        return state;
    });

    const { packages: pack, channels } = useSelector((state) => {
        return state.order || {};
    });

    const calculateTotalPriceForPackages = () => {
        return pack.reduce((total, item) => total + item.packagePrice, 0);
    };

    const calculateTotalPriceForChannels = () => {
        return channels.reduce((total, item) => total + item.channelPrice, 0);
    };

    const calculateTotalPriceForBoth = () => {
        return calculateTotalPriceForPackages() + calculateTotalPriceForChannels();
    };

    const handleOrder = () => {
        const formData = {
            packages: pack,
            channels: channels,
            orderDate: new Date(),
        };
        dispatch(startCreateOrder(formData));
    };

    useEffect(() => {
        if (cart.order.cart.length > 0) {
            const price = calculateTotalPriceForPackages();
            navigate('/orderpay', { state: cart.order.cart });
        }
    }, [cart.order.cart]);

    return (
        <Container>
            <Row className="mt-3">
                <Col>
                    <h2>Cart</h2>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h3>Packages</h3>
                    <ListGroup>
                        {cart.order.packages.map((item, index) => (
                            <ListGroup.Item key={index}>
                                {item.packageName} - {item.packagePrice} - {item.selectedChannels}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
               
                    <h3>Channels</h3>
                    <ListGroup>
                        {cart.order.channels.map((item, index) => (
                            <ListGroup.Item key={index}>
                                {item.channelName} - {item.channelPrice}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col>
                    <h3>Total Price for Packages: {calculateTotalPriceForPackages()}</h3>
                    <h3>Total Price for Channels: {calculateTotalPriceForChannels()}</h3>
                    <h3>Total Price for Both: {calculateTotalPriceForBoth()}</h3>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col>
                    <Button variant="success" onClick={handleOrder}>
                        Order
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
