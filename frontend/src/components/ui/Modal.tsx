import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FC, Fragment } from 'react';

interface GenericModalProps {
  title: string | React.ReactNode;
  content: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  titleClassName?: string;
  contentClassName?: string;
  className?: string;
}

const GenericModal: FC<GenericModalProps> = ({ title, content, open, setOpen, titleClassName, contentClassName, className }) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={() => setOpen(false)} className={`relative z-50 ${className || ''}`}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className={`relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl ${className || ''}`}>
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <DialogTitle as="h3" className={`text-lg font-semibold text-gray-900 ${titleClassName || ''}`}>
                    {title}
                  </DialogTitle>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className={`bg-white ${contentClassName || ''}`}>
                  {content}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default GenericModal;