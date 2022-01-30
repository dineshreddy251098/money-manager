import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDelete} = props
  const {id, title, amount, type} = transactionDetails

  const onClickedDelete = () => {
    onDelete(id, type, amount)
  }

  return (
    <li className="list">
      <hr />
      <div className="list-headings-container">
        <p className="each-title-value">{title}</p>
        <p className="each-title-value">{amount}</p>
        <p className="each-title-value">{type}</p>
        <button
          testid="delete"
          onClick={onClickedDelete}
          className="delete-btn"
          type="button"
        >
          <img
            className="delete-icon"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}
export default TransactionItem
