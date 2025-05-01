/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from 'react';
import { modal, useAppStore } from '../stores/appStore';
import { useThemeStore } from '../stores/themeStore';
import { useRef } from 'react';

const ModalComponent: React.FC = () => {
  const app = useAppStore()
  const { theme } = useThemeStore();
  const modalElement = useRef<HTMLElement | null>(null);


  useEffect(() => {
    let bootstrapModal: any = null;

    // Dynamically import Bootstrap JS only on the client
    import('bootstrap').then(({ Modal }) => {
      modalElement.current = document.getElementById('myModal');
      if (modalElement.current) {
        bootstrapModal = new Modal(modalElement.current);

        if (app.modal.show) {
          bootstrapModal.show();
        } else {
          bootstrapModal.hide();
        }

        modalElement.current?.addEventListener('hidden.bs.modal', handleModalClose);

        // Cleanup
        return () => {
          modalElement.current?.removeEventListener('hidden.bs.modal', handleModalClose);
          bootstrapModal?.dispose();
        };
      }
    });

    // Return a no-op cleanup if not on client or modal not found
    return () => {
      modalElement.current?.removeEventListener('hidden.bs.modal', handleModalClose);
      bootstrapModal?.dispose();
    };
  }, [app.modal.show, modalElement]);

  const handleModalClose = () => modal.close();
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