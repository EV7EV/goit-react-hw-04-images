import { createPortal } from 'react-dom';
import React, { Component } from 'react';
import style from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  // метод який буде викликати функцію по натисканню на кнопку
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={style.overlay} onClick={this.handleBackdropClick}>
        <div className={style.modal}>
          <img src={this.props.largeImage} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
