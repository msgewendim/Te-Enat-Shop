import { FC } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { SelectProps } from '../../providers/interface/general.props';


const Select: FC<SelectProps> = ({
  items,
  value,
  onChange,
  displayKey,
  valueKey,
  placeholder,
  type,
  className = ''
}) => {
  const selectedItem = items.find(item => item[valueKey as keyof typeof item] === value);

  return (
    <div className={`max-w-xs ${className}`}>
      <Listbox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <ListboxButton className={`relative w-full cursor-default rounded-lg bg-white py-2 pl-10 pr-3 text-right shadow-md focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-sm ${type === "size" ? "text-grey-900 w-fit" : "text-blue-600"}`}>
            <span className="block truncate">
              {selectedItem ? selectedItem[displayKey as keyof typeof selectedItem] : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {items.map((item, index) => (
              <ListboxOption
                key={index}
                className={({ focus }) =>
                  `relative cursor-pointer py-2 pr-4 ${focus ? 'bg-primary/10 text-black' : 'text-gray-900'
                  }`
                }
                value={item[valueKey as keyof typeof item]}
              >
                {({ selected }) => (
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                    }`}>
                    {item[displayKey as keyof typeof item]}
                  </span>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;