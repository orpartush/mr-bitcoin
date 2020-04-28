import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

const MoveList = ({ title, moveList, contact }) => {
  const [listAt, setList] = useState('homepage');
  const [currList, setCurrList] = useState(moveList);

  useEffect(() => {
    const checkList = () => {
      title === 'Your Last 3 Moves:' ? setList('homepage') : setList('contact');
    };
    const getCurrList = () => {
      if (contact) {
        const currContactId = contact._id;
        let contactPageList = moveList.filter(
          move => move.toId === currContactId
        );
        setCurrList(contactPageList);
      } else {
        let homePageList = moveList.filter((move, idx) => idx < 3);
        setCurrList(homePageList);
      }
    };
    checkList();
    getCurrList();
  }, [title, listAt, moveList, contact]);

  if (currList.length === 0) return (
      <div className="move-list flex flex-column align-start justify-start">
        <p className="title">{title}</p>
        <small className="move-info">No moves yet...</small>
      </div>
    );
  return (
    <div className="move-list flex flex-column align-start justify-start">
      <p className="title">{title}</p>
      {currList.map(move => {
        let moveTo = listAt === 'homepage' ? <p>To: {move.to}</p> : '';
        return (
          <section key={uuid()} className="move-info">
            {moveTo}
            <p>At: {move.at}</p>
            <p className="amount">Amount: {move.amount} coins</p>
          </section>
        );
      })}
    </div>
  );
};

MoveList.propTypes = {
  title: PropTypes.string.isRequired,
  moveList: PropTypes.array.isRequired,
};

export default MoveList;
