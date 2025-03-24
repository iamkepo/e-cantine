import React, { useEffect } from 'react';
import { Modal as BootstrapModal } from 'bootstrap';
import { modal, useAppStore } from '../stores/appStore';
import { useThemeStore } from '../stores/themeStore';

const ModalComponent: React.FC = () => {
  const app = useAppStore()
  const { theme } = useThemeStore();

  useEffect(() => {
    const modalElement = document.getElementById('myModal');
    let bootstrapModal: BootstrapModal | null = null;

    if (modalElement) {
      bootstrapModal = new BootstrapModal(modalElement);
      
      // Show or hide modal based on 'show' prop
      if (app.modal.show) {
        bootstrapModal.show();
      } else {
        bootstrapModal.hide();
      }

      const handleModalClose = () => modal.close && modal.close();
      modalElement.addEventListener('hidden.bs.modal', handleModalClose);

      // Cleanup event listener and modal instance on unmount
      return () => {
        modalElement.removeEventListener('hidden.bs.modal', handleModalClose);
        bootstrapModal?.dispose();
      };
    }

    // Return a no-op cleanup function if modalElement is not found
    return () => {};
  }, [app.modal.show]);
  if (!app.modal.show) return false;
  return (
    <div className="modal fade" id="myModal" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true">
      <div className={`modal-dialog modal-${app.modal.size || 'md'} modal-dialog-centered`}>
        <div className="modal-content">
          <div className={`modal-body text-bg-${app.modal.size == 'fullscreen' ? 'secondary' : theme}`}>
            <button type="button" className="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
            {app.modal.body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;