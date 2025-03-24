import React, { useEffect, useRef } from 'react';
import { Toast } from 'bootstrap';
import { useAppStore } from '../stores/appStore';

const ToastComponent: React.FC = () => {
 const app = useAppStore()
  const toastRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (toastRef.current) {
      const toastInstance = new Toast(toastRef.current);
      if (app.toast.show) {
        toastInstance.show();
      } else {
        toastInstance.hide();
      }
    }

    const toastElList = document.querySelectorAll('.toast');
    toastElList.forEach(toastEl => new Toast(toastEl));
    
  }, [app.toast.show]);

  return (
    <div
      className={`toast position-fixed top-0 end-0 text-bg-${app.toast.type || 'primary'}`}
      ref={toastRef}
      id="myToast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ zIndex: 1000 }}
    >
      <div className="toast-body">
        <button type="button" className="btn-close float-end" data-bs-dismiss="toast" aria-label="Close"></button>
        {app.toast.message}
      </div>
    </div>
  );
};

export default ToastComponent;