import {Modal, Form, Button, Stack} from "react-bootstrap";
import {useRef} from "react";
import {CATEGORIA_SIN_NOMBRE, useCategoria} from "../contexts/CategoriaContext";
import {currencyFormater} from "../utils";

export default function ViewGastos({budgetId, handleClose}) {

    const {getBudgetExpenses, budgets, deleteBudget, deleteExpense} = useCategoria()

    const expenses = getBudgetExpenses(budgetId)
    const budget = CATEGORIA_SIN_NOMBRE === budgetId ?
        {name: "Sin categoria", id: CATEGORIA_SIN_NOMBRE} :
        budgets.find(b => b.id === budgetId)


    return (
        <Modal show={budgetId != null} onHide={handleClose}>

            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2">
                        <div>Gastos - {budget?.name}</div>
                        {budgetId !== CATEGORIA_SIN_NOMBRE && (
                            <Button onClick={() => {
                                deleteBudget(budget)
                                handleClose()
                            }}
                                    variant="outline-danger">Delete
                            </Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap="3">
                    {expenses.map(expense => (
                        <Stack direction="horizontal" gap="2" key={expense.id}>
                            <div className="me-auto fs-4">{expense.description}</div>
                            <div className="fs-5">{currencyFormater.format(expense.amount)}</div>
                            <Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">&times;</Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>

        </Modal>
    )
}