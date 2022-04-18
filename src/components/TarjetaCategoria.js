import {Button, Card, ProgressBar, Stack} from "react-bootstrap"
import {currencyFormater} from "../utils";

export default function TarjetaCategoria({
                                             titulo,
                                             cantidadActual,
                                             max,
                                             gray,
                                             hideButtons,
                                             onAddExpenseClick,
                                             onAddIncomeClick,
                                             onViewExpenseClick
                                         }) {
    const classNames = []
    if (cantidadActual > max) {
        classNames.push("bg-danger", "bg-opacity-10")
    } else if (gray) {
        classNames.push("bg-light")
    }

    return (
        <Card className={classNames.join(" ")}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between
              align-items-baseline fw-normal mb-3">
                    <div className="me-2">{titulo}</div>
                    <div className="d-flex align-items-baseline">
                        {currencyFormater.format(cantidadActual)}
                        {max && (<span className="text-muted fs-6 ms-1">
                        / {currencyFormater.format(max)}
                    </span>)}
                    </div>
                </Card.Title>
                {max && (<ProgressBar className="rounded-pill" variant={getProgressBarVariant(cantidadActual, max)}
                                      min={0}
                                      max={max}
                                      now={cantidadActual}></ProgressBar>)}
                {!hideButtons && <Stack direction="horizontal" gap="2" className="mt-4">
                    <Button variant="outline-primary" className="ms-auto" onClick={onAddExpenseClick}>agregar egreso</Button>
                    <Button variant="outline-primary" ClassName="ms-auto" onClick={onAddIncomeClick}>agregar ingreso</Button>
                    <Button variant="outline-secondary" onClick={onViewExpenseClick}>ver gastos</Button>
                </Stack>}
            </Card.Body>
        </Card>
    )
}

function getProgressBarVariant(cantidadActual, max) {
    const ratio = cantidadActual / max
    if (ratio < .5) return "primary"
    if (ratio < .75) return "warning"
    return "danger"
}