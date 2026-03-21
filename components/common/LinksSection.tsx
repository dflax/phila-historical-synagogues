interface LinkItem {
  id:          string
  link_type:   string
  url:         string
  title:       string | null
  description: string | null
}

interface Props {
  links: LinkItem[]
}

const TYPE_ICON: Record<string, string> = {
  website:      '🌐',
  youtube:      '📺',
  vimeo:        '🎬',
  facebook:     '📘',
  instagram:    '📷',
  twitter:      '🐦',
  wikipedia:    '📖',
  findagrave:   '🪦',
  documentary:  '🎥',
  virtual_tour: '🏛️',
  historical_doc: '📄',
  news_article: '📰',
  podcast:      '🎙️',
  interview:    '🎤',
  obituary:     '📜',
  sermon:       '📖',
  publication:  '📚',
  other:        '🔗',
}

const TYPE_LABEL: Record<string, string> = {
  website:      'Website',
  youtube:      'YouTube',
  vimeo:        'Vimeo',
  facebook:     'Facebook',
  instagram:    'Instagram',
  twitter:      'Twitter / X',
  wikipedia:    'Wikipedia',
  findagrave:   'Find a Grave',
  documentary:  'Documentary',
  virtual_tour: 'Virtual Tour',
  historical_doc: 'Historical Document',
  news_article: 'News Article',
  podcast:      'Podcast',
  interview:    'Interview',
  obituary:     'Obituary',
  sermon:       'Sermon',
  publication:  'Publication',
  other:        'Link',
}

function displayUrl(url: string): string {
  try {
    const { hostname } = new URL(url)
    return hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export default function LinksSection({ links }: Props) {
  if (links.length === 0) return null

  return (
    <div className="space-y-2">
      {links.map(link => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition group"
        >
          {/* Icon */}
          <span className="text-lg flex-shrink-0 mt-0.5" aria-hidden="true">
            {TYPE_ICON[link.link_type] ?? '🔗'}
          </span>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 truncate">
                {link.title || displayUrl(link.url)}
              </span>
              {/* External link indicator */}
              <svg
                className="w-3 h-3 text-gray-400 dark:text-gray-500 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </div>
            {/* Type label + domain */}
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {TYPE_LABEL[link.link_type] ?? 'Link'}
              {link.title && (
                <span className="ml-1">· {displayUrl(link.url)}</span>
              )}
            </div>
            {/* Description */}
            {link.description && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed line-clamp-2">
                {link.description}
              </p>
            )}
          </div>
        </a>
      ))}
    </div>
  )
}
