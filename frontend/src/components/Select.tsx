import { Fragment, useContext, useEffect, useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { AppContext } from '../providers/interface/context'

interface SelectSizeProps {
  selectItems: Array<string>
  item: string
  classes: string
}
const Select = ({ selectItems,  item, classes }: SelectSizeProps) => {
  const [option, setOption] = useState("")
  const { category, setSizeIdx } = useContext(AppContext)
  useEffect(() => {
    const sizeIdx = selectItems.indexOf(option) === -1 ? 0 : selectItems.indexOf(option)
    setSizeIdx(sizeIdx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option])
  useEffect(() => {
    setOption(category ? category : "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])
  return (
    <div className={`w-fit min-w-[80px] my-4 ${classes}`}>
      <Listbox value={item} onChange={(e) => {
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
            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {selectItems.map((option, index) => (
                <ListboxOption
                  onSelect={() => setSizeIdx(index)}
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
                        <span className="text-amber-600"></span>
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