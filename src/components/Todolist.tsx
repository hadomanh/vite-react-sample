
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    ListGroup,
} from 'react-bootstrap'

import useArray from '../hooks/useArray';
import { useState } from 'react';

export default function Todolist() {

    const todos = useArray([]);
    const [todo, setTodo] = useState('');

    const handleAddTodo = (e: any) => {
      e.preventDefault();
      if (todo.length > 0) {
        todos.push(todo);
        setTodo('');
      }
    };

    return (
        <Container style={{ marginTop: '15px' }}>
            <Row>
                <Col lg='6' >
                    <Card>
                    <Card.Body>

                        <Form onSubmit={handleAddTodo}>
                        <Form.Group className="mb-3">
                            <Form.Label>Todo</Form.Label>
                            <Form.Control
                            type="text"
                            value={ todo }
                            onChange={(e) => setTodo(e.target.value)}
                            placeholder="Todo..." />
                        </Form.Group>
                        </Form>

                    </Card.Body>
                    </Card>
                </Col>
                <Col lg='6' >
                <ListGroup>
                    { todos.value.map((todo, index) => (
                    <ListGroup.Item key={index}>
                        <Row>
                        <Col lg='11'>{ todo }</Col>
                        <Col onClick={() => todos.remove(index)}><i className="fas fa-times"></i></Col>
                        </Row>
                        
                    </ListGroup.Item>
                    )) }
                </ListGroup>
                </Col>
            </Row>
        </Container>
        
    )

}
