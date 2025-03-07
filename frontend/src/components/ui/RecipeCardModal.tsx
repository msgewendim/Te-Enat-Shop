import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Recipe } from '../../client/types.gen';

interface RecipeModalProps {
  recipe: Recipe;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const RecipeModal: FC<RecipeModalProps> = ({ recipe, open, setOpen }) => {
  const { _id, image, name, description } = recipe;
  const { t } = useTranslation();
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={() => setOpen(false)} className="relative z-10">
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
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex flex-col items-center gap-y-1">
                    <DialogTitle as="h3" className="text-2xl text-center font-bold leading-6 text-gray-900 mb-4">
                      {name}
                    </DialogTitle>
                    <img src={image} alt={name} className="w-full h-[400px] object-cover rounded-md mb-4" />
                    <p className="text-start text-gray-600 mb-4 text-lg font-semibold">{description}</p>
                    <Link
                      to={`/recipes/${_id}`}
                      className="inline-flex justify-center max-w-fit rounded-md bg-[#42855b] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#3a7751] transition-colors sm:w-auto"
                    >
                      {t('homePage.ourSpecialty.readMore')}
                    </Link>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RecipeModal;
