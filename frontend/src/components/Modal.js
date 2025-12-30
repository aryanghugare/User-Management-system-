import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', type = 'default' }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white p-8 rounded-2xl max-w-md w-11/12 shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="m-0 mb-4 text-gray-900 text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-4 justify-end">
          <button 
            className="btn btn-secondary"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button 
            className={`btn ${type === 'danger' ? 'btn-danger' : 'btn-primary'}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
