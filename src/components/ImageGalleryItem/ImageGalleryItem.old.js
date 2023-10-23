import React, { Component } from 'react';
import { CloseButton } from './ImageGalleryItem.styled';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '30px',
  },
};

Modal.setAppElement('#root');

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { webformatURL, tags } = this.props;
    const { isModalOpen } = this.state;

    return (
      <>
        <img src={webformatURL} alt={tags} onClick={this.openModal} />
        <Modal
          isOpen={isModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <img src={webformatURL} alt={tags} />
          <CloseButton type="button" onClick={this.closeModal}>
            <AiOutlineClose />
          </CloseButton>
        </Modal>
      </>
    );
  }
}
