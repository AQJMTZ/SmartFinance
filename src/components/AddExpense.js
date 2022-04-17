import {Modal, Form, Button} from "react-bootstrap";
import {useRef} from "react";
import {useCategoria} from "../contexts/CategoriaContext";

export default function AddCategoria({show, handleClose}){
    const nameRef = useRef()
    const maxRef = useRef()
    const {addBudget} = useCategoria()
    function handleSubmit(e){
        e.preventDefault()
        addBudget(
        {
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value)
        })
        handleClose()
    }


    return(
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva Categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control ref={nameRef} type="text" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="max">
                        <Form.Label>Gasto maximo</Form.Label>
                        <Form.Control ref={maxRef} type="number" required min={1} step={0.01}/>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Agregar</Button>
                    </div>
                </Modal.Body>
            </form>
        </Modal>
    )
}