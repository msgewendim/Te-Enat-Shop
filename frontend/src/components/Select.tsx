import { Fragment, useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

interface SelectSizeProps {
  selectItems: Array<string>
  handleClick: (size: string) => void
  item: string
  classes: string
}
const Select = ({ selectItems, handleClick, item, classes }: SelectSizeProps) => {
  const [option, setOption] = useState("")
  return (
    <div className={`w-fit min-w-[80px] my-4 ${classes}`}>
      <Listbox value={item} onChange={(e) => {
        handleClick(e)
        setOption(e)
      }}>
        <div className="relative mt-1"> 
          <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-6 pr-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{option ? option : item}</span>
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pr-2 mr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {selectItems.map((option, index) => (
                <ListboxOption
                  key={index}
                  className={({ focus }) =>
                    `relative cursor-default select-none py-2 text-right pr-4 ${focus ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {option}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>

                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default Select