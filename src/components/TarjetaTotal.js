import TarjetaCategoria from "./TarjetaCategoria";
import {useCategoria} from "../contexts/CategoriaContext";
import {CATEGORIA_SIN_NOMBRE} from "../contexts/CategoriaContext";


export default function TarjetaTotal(props) {
    const {expenses, budgets} = useCategoria()
    const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
    const max = budgets.reduce((total, budget) => total + budget.max, 0)
    if (amount === 0) return null
    return <TarjetaCategoria titulo="Total" cantidadActual={amount} gray max={max} hideButtons/>
}