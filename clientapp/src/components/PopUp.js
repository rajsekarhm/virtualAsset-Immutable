// Popup.js
import React, { useState } from 'react';
import styled from 'styled-components';

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

const Popup = ({ isOpen, onClose, children }) => {
    console.log(isOpen)
  const [isPopupOpen, setIsPopupOpen] = useState(isOpen);
  console.log(isPopupOpen)
  const handleClose = () => {
    setIsPopupOpen(false);
    onClose();
  };

  return (
    isPopupOpen && (
      <PopupOverlay>
        <PopupContent>
          <CloseButton onClick={handleClose}>Close</CloseButton>
          {children}
        </PopupContent>
      </PopupOverlay>
    )
  );
};

export  {Popup};
