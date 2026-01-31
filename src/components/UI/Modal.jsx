import React, { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import './Modal.css';

const Modal = ({ isOpen, onClose, children, title, size = 'medium' }) => {
  const modalRef = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      // Store currently focused element
      previousFocus.current = document.activeElement;
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
      
      // Add event listener
      window.addEventListener('keydown', handleEsc);
      
      // Focus modal for accessibility
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 100);
    }
    
    return () => {
      // Restore body scroll
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
      
      // Remove event listener
      window.removeEventListener('keydown', handleEsc);
      
      // Restore focus to previous element
      if (previousFocus.current) {
        previousFocus.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`modal-overlay ${isOpen ? 'modal-open' : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className={`modal-container modal-${size}`}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        tabIndex={-1}
      >
        {/* Animated background elements */}
        <div className="modal-bg-effects">
          <div className="modal-grid"></div>
          <div className="modal-orb modal-orb-1"></div>
          <div className="modal-orb modal-orb-2"></div>
        </div>

        {/* Top gradient line */}
        <div className="modal-top-line"></div>

        {/* Header */}
        <div className="modal-header">
          <h3 id="modal-title" className="modal-title">
            <span className="modal-title-text">{title}</span>
            <span className="modal-title-glow"></span>
          </h3>
          <button 
            className="modal-close" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <FaTimes />
            <span className="close-ripple"></span>
          </button>
        </div>

        {/* Content */}
        <div className="modal-content">
          <div className="modal-content-inner">
            {children}
          </div>
          
          {/* Scroll indicator */}
          <div className="scroll-fade-bottom"></div>
        </div>

        {/* Corner decorations */}
        <div className="modal-corner modal-corner-tl"></div>
        <div className="modal-corner modal-corner-tr"></div>
        <div className="modal-corner modal-corner-bl"></div>
        <div className="modal-corner modal-corner-br"></div>
      </div>
    </div>
  );
};

export default Modal;