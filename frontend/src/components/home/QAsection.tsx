import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { qaItems } from '../../utils/examples';

const QASection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gray-50 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-primary text-center mb-8">
          {t("homePage.q&a.title")}
        </h2>
        <dl className="space-y-3">
          {qaItems.map((item, index) => (
            <Disclosure as="div" key={index} className="pt-6">
              {({ open }) => (
                <>
                  <dt className="text-lg">
                    <DisclosureButton className="text-left w-full flex justify-between items-start text-gray-400">
                      <span className="font-medium text-primary">{item.q}</span>
                      <span className="ml-6 h-7 flex items-center">
                        {open ? (
                          <FiMinus className="h-6 w-6" aria-hidden="true" />
                        ) : (
                          <FiPlus className="h-6 w-6" aria-hidden="true" />
                        )}
                      </span>
                    </DisclosureButton>
                  </dt>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <DisclosurePanel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{item.a}</p>
                    </DisclosurePanel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default QASection;