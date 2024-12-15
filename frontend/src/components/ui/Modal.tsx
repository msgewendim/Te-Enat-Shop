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
      <Dialog onClose={() => setOpen(false)} className={`relative z-50 overflow-y-auto ${className}`}>
        <div className="flex items-center justify-between text-2xl font-bold text-primary">
          <span>{title}</span>
          <div className="text-gray-500 hover:text-red-500 transition-colors">
            <button onClick={() => setOpen(false)}>
              <XMarkIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
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
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-right shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                <div className={`bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ${contentClassName}`}>
                  <DialogTitle as="h3" className={`text-2xl font-bold leading-6 text-gray-900 mb-4 ${titleClassName}`}>
                    {title}
                  </DialogTitle>
                  <div className={contentClassName}>{content}</div>
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