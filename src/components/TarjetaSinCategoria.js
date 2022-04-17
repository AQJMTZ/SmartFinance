import TarjetaCategoria from "./TarjetaCategoria";
import {useCategoria} from "../contexts/CategoriaContext";
import {CATEGORIA_SIN_NOMBRE} from "../contexts/CategoriaContext";


export default function TarjetaSinCategoria(props) {
    const {getBudgetExpenses} = useCategoria()
    const amount = getBudgetExpenses(CATEGORIA_SIN_NOMBRE).reduce((total, expense) => total + expense.amount, 0)
    if (amount === 0) return null
    return <TarjetaCategoria titulo="Sin categoria" cantidadActual={amount} gray {...props}/>
}