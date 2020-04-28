import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TransferFund = ({ maxCoins, onTransferCoins }) => {
  const [amount, setAmount] = useState('');
  const [isPossible, setIsPossible] = useState(true);
  const [isTransd, setIsTransd] = useState(false);

  const onHandleChange = ev => {
    setAmount(ev.target.value);
  };

  const onClickHandle = ev => {
    ev.preventDefault();
    if (amount === '' || amount <= 0) return;
    if (amount > maxCoins) {
      setIsPossible(false);
      setTimeout(() => setIsPossible(true), 1500);
      return;
    } else setIsPossible(true);
    onTransferCoins(ev, amount);
    setIsTransd(true);
    setTimeout(() => {
      setIsTransd(false)
      setAmount('');
    }, 1500);
  };

  const notPossibleMsg = !isPossible ? (
    `Too much don't you think?`
  ) : null;

  const successMsg = isTransd ? `You've transferred ${amount} coins` : null;

  return (
    <div className="transfer-fund">
      <form>
        <input
          type="number"
          name="amount"
          value={amount}
          min="1"
          max={maxCoins}
          placeholder={`${maxCoins} coins available`}
          onChange={onHandleChange}
        />
        <button onClick={onClickHandle}>Transfer</button>
      </form>
      <small>{notPossibleMsg}</small>
      <small className="success">{successMsg}</small>
    </div>
  );
};

TransferFund.propTypes = {
  maxCoins: PropTypes.number.isRequired,
  onTransferCoins: PropTypes.func.isRequired,
};

export default TransferFund;
