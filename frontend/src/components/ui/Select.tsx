import { FC, useEffect, useState } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useAppContext } from '../../hooks/useAppContext';
import { SelectTypes } from '../../providers/interface/general.props';


const Select: FC<SelectTypes> = ({
  selectItems,
  initialItem,
  classes = '',
  type,
  categoryMapping = {},
  onChange
}) => {
  const { category } = useAppContext();
  const [selectedOption, setSelectedOption] = useState(initialItem);

  useEffect(() => {
    if (type === 'category' && categoryMapping) {
      setSelectedOption(categoryMapping[category] || initialItem);
    } else {
      setSelectedOption(initialItem);
    }
  }, [category, categoryMapping, initialItem, type]);

  const handleChange = (newValue: string) => {
    setSelectedOption(newValue);
    onChange?.(newValue);
  };

  const displayItems = type === 'category'
    ? selectItems.map(item => categoryMapping[item] || item)
    : selectItems;

  return (
    <div className={`w-fit min-w-[80px] my-4 ${classes}`}>
      <Listbox value={selectedOption} onChange={handleChange}>
        <div className="relative mt-1">
          <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-6 pr-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selectedOption}</span>
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pr-2 mr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>
          <Transition
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {displayItems.map((displayOption, index) => (
                <ListboxOption
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 text-right pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={displayOption}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {displayOption}
                      </span>
                      {selected && <span className="text-amber-600"></span>}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;