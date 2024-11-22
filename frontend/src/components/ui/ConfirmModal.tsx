import { useTranslation } from "react-i18next";
import { useAppContext } from "../../hooks/app/useAppContext";

const ConfirmationModal = () => {
  const { modalState, hideModal } = useAppContext()
  const { t } = useTranslation()
  if (!modalState.isOpen) return null;

  return (
    <div className="group select-none fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex items-center justify-center">
      <div className="relative bg-gray-800 w-full max-w-xs m-4 p-6 rounded-2xl shadow-lg">
        <div className="text-center flex-auto justify-center">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              fillRule="evenodd"
            ></path>
          </svg>

          <h2 className="text-xl font-bold py-4 text-gray-200">
            {t('admin.products.deleteConfirmation')}
          </h2>
        </div>
        <div className="p-3 mt-4 text-center space-x-4">
          <button
            onClick={hideModal}
            className="bg-gray-700 px-5 py-2 text-sm font-medium tracking-wider text-gray-300 rounded-full hover:bg-gray-600 hover:shadow-lg transition duration-300"
          >
            ביטול
          </button>
          <button
            onClick={() => { modalState.onConfirm(); hideModal(); }}
            className="bg-red-500 px-5 py-2 text-sm font-medium tracking-wider text-white rounded-full hover:bg-red-600 hover:shadow-lg transition duration-300"
          >
            מחיקה
          </button>
        </div>
      </div>
    </div>
  );

};

export default ConfirmationModal;