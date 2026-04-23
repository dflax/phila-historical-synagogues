'use client'

/**
 * ClergyCategorySelect — reusable dropdown for clergy person type.
 *
 * Supported types are defined once here. To add a new clergy type,
 * add an entry to CLERGY_TYPE_OPTIONS and it will appear everywhere
 * this component is used.
 */

export type ClergyPersonType = 'rabbi' | 'chazzan'

export const CLERGY_TYPE_OPTIONS: { value: ClergyPersonType; label: string }[] = [
  { value: 'rabbi',   label: 'Rabbi' },
  { value: 'chazzan', label: 'Cantor / Chazzan' },
]

interface Props {
  id?: string
  value: ClergyPersonType
  onChange: (value: ClergyPersonType) => void
  required?: boolean
  className?: string
}

export default function ClergyCategorySelect({
  id,
  value,
  onChange,
  required,
  className,
}: Props) {
  const defaultClass =
    'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'

  return (
    <select
      id={id}
      value={value}
      onChange={e => onChange(e.target.value as ClergyPersonType)}
      required={required}
      className={className ?? defaultClass}
    >
      {CLERGY_TYPE_OPTIONS.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
