import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  onDelete = id => {
    const {transactionsList} = this.state
    const updatedTransactionList = transactionsList.filter(
      eachTransaction => id !== eachTransaction.id,
    )

    this.setState({
      transactionsList: updatedTransactionList,
    })
  }

  submitTransaction = event => {
    event.preventDefault()

    const {title, amount, type} = this.state
    const optionType = transactionTypeOptions.find(
      eachOption => eachOption.optionId === type,
    )

    const {displayText} = optionType

    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parseInt(amount),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      title: '',
      amount: '',
      type: transactionTypeOptions[0].optionId,
    }))
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {transactionsList, title, amount, type} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="bg-container">
        <div className="user-card-container">
          <h1 className="user-name">Hi, Richard</h1>
          <p className="greeting">
            Welcome back to your{' '}
            <span className="span-element">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expensesAmount={expensesAmount}
        />
        <div className="bottom-section-container">
          <form onSubmit={this.submitTransaction} className="form-container">
            <h1 className="transaction-heading">Add transaction</h1>
            <label className="label" htmlFor="title">
              TITLE
            </label>
            <br />
            <input
              onChange={this.onChangeTitle}
              placeholder="TITLE"
              className="input"
              id="title"
              type="text"
              value={title}
            />
            <br />
            <label className="label" htmlFor="amount">
              AMOUNT
            </label>
            <br />
            <input
              onChange={this.onChangeAmount}
              placeholder="AMOUNT"
              className="input"
              id="amount"
              value={amount}
              type="text"
            />
            <br />
            <label className="label" htmlFor="type">
              TYPE
            </label>
            <br />
            <select
              id="type"
              value={type}
              onChange={this.onChangeType}
              className="input"
            >
              {transactionTypeOptions.map(eachOption => (
                <option key={eachOption.optionId} value={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <br />
            <button className="add-btn" type="submit">
              Add
            </button>
          </form>
          <div className="form-container">
            <h1 className="transaction-heading">History</h1>
            <div className="transaction-list">
              <div className="list-headings-container">
                <p className="each-item">Title</p>
                <p className="each-item">Amount</p>
                <p className="each-item">Type</p>
              </div>
              <ul className="transactions-history-container">
                {transactionsList.map(eachTransaction => (
                  <TransactionItem
                    onDelete={this.onDelete}
                    key={eachTransaction.id}
                    transactionDetails={eachTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
