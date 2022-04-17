import {Modal, Form, Button} from "react-bootstrap";
import {useRef} from "react";
import {CATEGORIA_SIN_NOMBRE, useCategoria} from "../contexts/CategoriaContext";

export default function AddExpense({show, handleClose, defaultBudgetId}) {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const {addExpense, budgets} = useCategoria()

    function handleSubmit(e) {
        e.preventDefault()
        addExpense(
            {
                description: descriptionRef.current.value,
                amount: parseFloat(amountRef.current.value),
                budgetId: budgetIdRef.current.value
            })
        handleClose()
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Gasto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="descripcion">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control ref={descriptionRef} type="text" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cantidad">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control ref={amountRef} type="number" required min={1} step={0.01}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="budgetId">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
                            <option id={CATEGORIA_SIN_NOMBRE}>Sin categoria</option>
                            {budgets.map(budget => (
                                <option key={budget.id} value={budget.id}>{budget.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Agregar</Button>
                    </div>
                </Modal.Body>
            </form>
        </Modal>
    )
}