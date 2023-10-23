import { useState } from 'react';
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

export const ImageGalleryItem = ({ webformatURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <img src={webformatURL} alt={tags} onClick={openModal} />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img src={webformatURL} alt={tags} />
        <CloseButton type="button" onClick={closeModal}>
          <AiOutlineClose />
        </CloseButton>
      </Modal>
    </>
  );
};
