import { Switch } from '@headlessui/react'
import i18next from 'i18next'
import { useState } from 'react'


const SwitchLanguage = () => {
  const [enabled, setEnabled] = useState(false)
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      onClick={() => i18next.changeLanguage(enabled ? "he-IL" : "en")}
      className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">{enabled ? "EN" : "HE"}</span>
      <span
        className={`${enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  )
}

export default SwitchLanguage