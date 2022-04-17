import './App.css';
import Container from "react-bootstrap/Container"
import {Button, Stack} from "react-bootstrap";
import TarjetaCategoria from "./components/TarjetaCategoria";
import AddCategoria from "./components/AddCategoria";
import {useState} from "react";
import {CATEGORIA_SIN_NOMBRE, useCategoria} from "./contexts/CategoriaContext";
import AddExpense from "./components/AddExpense";
import TarjetaSinCategoria from "./components/TarjetaSinCategoria";
import TarjetaTotal from "./components/TarjetaTotal";
import ViewGastos from "./components/ViewGastos";

function App() {
  const [showAddCategoria, setShowAddCategoria] = useState(false)
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [AddExpenseBudgetId, setAddExpenseBudgetId] = useState()
  const [ViewGastosBudgetId, setViewGastosBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useCategoria()


  function openAddExpense(budgetId){
    setShowAddExpense(true)
    setAddExpenseBudgetId(budgetId)
  }

  return (
      <>
    <Container className="my-4">
      <Stack direction="horizontal" gap = "2" className="mb-4">
        <h1 className="me-auto">SmartFinance</h1>
        <Button variant="primary" onClick={() => setShowAddCategoria(true)}> Agregar categoria</Button>
        <Button variant="outline-primary" onClick={openAddExpense}> Nuevo gasto</Button>
      </Stack>
        <div style={{display:"grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr", gap: "1rem", alignItems: "flex-start"}}>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
                return(
            <TarjetaCategoria
                key={budget.id}
                titulo={budget.name}
                cantidadActual={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpense(budget.id)}
                onViewExpenseClick={() => setViewGastosBudgetId(budget.id)}/>
                )
          })}
          <TarjetaSinCategoria onAddExpenseClick={openAddExpense} onViewExpenseClick={() => setViewGastosBudgetId(CATEGORIA_SIN_NOMBRE)}/>
          <TarjetaTotal/>
        </div>

    </Container>
    <AddCategoria show={showAddCategoria} handleClose= {() => setShowAddCategoria(false)}/>
        <AddExpense show={showAddExpense} defaultBudgetId={AddExpenseBudgetId} handleClose= {() => setShowAddExpense(false)} />
        <ViewGastos budgetId={ViewGastosBudgetId} handleClose={() => setViewGastosBudgetId()}/>
    </>
  );
}

export default App;
