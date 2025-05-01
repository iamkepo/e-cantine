/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from 'react';
import { modal, useAppStore } from '../stores/appStore';
import { useThemeStore } from '../stores/themeStore';

const ModalComponent: React.FC = () => {
  const app = useAppStore()
  const { theme } = useThemeStore();

  useEffect(() => {
    let bootstrapModal: any = null;
    let modalElement: HTMLElement | null = null;

    // Dynamically import Bootstrap JS only on the client
    import('bootstrap').then(({ Modal }) => {
      modalElement = document.getElementById('myModal');
      if (modalElement) {
        bootstrapModal = new Modal(modalElement);

        if (app.modal.show) {
          bootstrapModal.show();
        } else {
          bootstrapModal.hide();
        }

        const handleModalClose = () => modal.close && modal.close();
        modalElement.addEventListener('hidden.bs.modal', handleModalClose);

        // Cleanup
        return () => {
          modalElement?.removeEventListener('hidden.bs.modal', handleModalClose);
          bootstrapModal?.dispose();
        };
      }
    });

    // Return a no-op cleanup if not on client or modal not found
    return () => {};
  }, [app.modal.show]);
  if (!app.modal.show) return null;
  return (
    <div className="modal fade" id="myModal" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true">
      <div className={`modal-dialog modal-${app.modal.size || 'md'} modal-dialog-centered modal-dialog-scrollable`}>
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