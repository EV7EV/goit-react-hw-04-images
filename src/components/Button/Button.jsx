import style from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <button className={style.button} onClick={onClick}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
