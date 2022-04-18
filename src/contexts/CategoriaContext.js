import React, {useContext, useState} from "react";
import {v4 as uuidV4} from 'uuid'
import useLocalStorage from "../hooks/useLocalStorage";

const CategoriaContext = React.createContext()

export const CATEGORIA_SIN_NOMBRE = "Sin categoria"

export function useCategoria() {
    return useContext(CategoriaContext)
}


export const CategoriaProvider = ({children}) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])
    const [income, setIncome] =useLocalStorage("Income", [])


    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addExpense({description, amount, budgetId}) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, {id: uuidV4(), description, amount, budgetId}]
        })
    }

    function addBudget({name, max}) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, {id: uuidV4(), name, max}]
        })
    }

    function deleteBudget({id}) {
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if(expense.budgetId !== id) return expense
                return {...expense, budgetId: CATEGORIA_SIN_NOMBRE}
            })
        })
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }

    function deleteExpense({id}) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    function addIncome({description,amount, budgetId}){
        setIncome(prevIncome=> {
            return [...prevIncome,{id:uuidV4(),description,amount,budgetId}]
        })
    }

    function getBudgetIncome(budgetId){
        return income.filter(income => income.budgetId === budgetId)
    }



    return <CategoriaContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        addIncome,
        getBudgetIncome,
        deleteExpense
    }}>{children}</CategoriaContext.Provider>
}