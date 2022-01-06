import { useSelector, useDispatch } from 'react-redux'

import { setPopupState } from '../store/popup' 
import { RootState } from '../store'

import {
    Container,
    Row,
    Col,
    Card,
    Form,
} from 'react-bootstrap'


export default function PopupSetting() {
  
const popup = useSelector((state: RootState) => state.popup)
const dispatch = useDispatch()

return (
    <Container style={{ marginTop: '15px' }}>
        <Row>
            <Col lg='6' >
            <Card>
                <Card.Body>

                <Form.Group className="mb-3">
                    <Form.Label>Popup content</Form.Label>
                    <Form.Control
                    type="text"
                    value={ popup.content }
                    onChange={(e) => dispatch(setPopupState({content: e.target.value}))}
                    placeholder="Popup Content..." />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Background color</Form.Label>
                    <Form.Control
                    type="color"
                    value={ popup.backgroundColor }
                    onChange={(e) => dispatch(setPopupState({backgroundColor: e.target.value}))}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Text color</Form.Label>
                    <Form.Control
                    type="color"
                    value={ popup.textColor }
                    onChange={(e) => dispatch(setPopupState({textColor: e.target.value}))}
                    />
                </Form.Group>

                </Card.Body>
            </Card>
            </Col>
            <Col lg='6' >
            <h1 style={{ backgroundColor: popup.backgroundColor, color: popup.textColor, textAlign: 'center' }}>{ popup.content }</h1>
            </Col>
        </Row>
    </Container>
    
)
}
