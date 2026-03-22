'use client'

import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  sortableKeyboardCoordinates,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export interface HistoryEntry {
  id: string
  entry_type: string | null
  content: string | null
  year: number | null
  year_range_start: number | null
  year_range_end: number | null
  circa: boolean | null
  source: string | null
  source_url: string | null
  display_order: number | null
}

interface HistoryListProps {
  items: HistoryEntry[]
  synagogueId: string
  canReorder: boolean
  onDeleteClick?: (id: string) => void
}

function formatHistoryYear(entry: HistoryEntry): string {
  if (entry.year_range_start && entry.year_range_end) {
    return `${entry.year_range_start}–${entry.year_range_end}`
  }
  if (entry.year) return entry.circa ? `c. ${entry.year}` : String(entry.year)
  if (entry.year_range_start) return `${entry.year_range_start}–`
  return ''
}

function GripIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  )
}

interface SortableRowProps {
  entry: HistoryEntry
  canReorder: boolean
  onDeleteClick?: (id: string) => void
}

function SortableRow({ entry, canReorder, onDeleteClick }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: entry.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    position: isDragging ? 'relative' as const : undefined,
    zIndex: isDragging ? 1 : undefined,
  }

  return (
    <div ref={setNodeRef} style={style} className="flex gap-4 group">
      {/* Year label */}
      <div className="w-12 flex-shrink-0 text-right">
        <span className="text-xs font-mono text-gray-400 dark:text-gray-500 leading-5">
          {formatHistoryYear(entry)}
        </span>
      </div>
      {/* Dot */}
      <div className="flex-shrink-0 w-4 flex items-start justify-center pt-1.5">
        <span className="w-2 h-2 rounded-full bg-blue-300 ring-2 ring-white dark:ring-gray-800" />
      </div>
      {/* Content */}
      <div className="flex-1 pb-1 min-w-0">
        {entry.entry_type && entry.entry_type !== 'general' && (
          <span className="text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wide">
            {entry.entry_type}
          </span>
        )}
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mt-0.5">
          {entry.content}
        </p>
        {(entry.source || entry.source_url) && (
          <div className="mt-1">
            {entry.source_url ? (
              <a
                href={entry.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
              >
                {entry.source ?? 'Source'} ↗
              </a>
            ) : (
              <span className="text-xs text-gray-300 dark:text-gray-600">{entry.source}</span>
            )}
          </div>
        )}
      </div>
      {/* Actions: grip (editors, drag to reorder) + trash (editors, delete) */}
      {(canReorder || onDeleteClick) && (
        <div className="flex items-start gap-0.5 pt-0.5 flex-shrink-0">
          {canReorder && (
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition p-0.5 rounded"
              aria-label="Drag to reorder"
              title="Drag to reorder"
            >
              <GripIcon />
            </button>
          )}
          {onDeleteClick && (
            <button
              onClick={() => onDeleteClick(entry.id)}
              title="Delete"
              className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition p-0.5 rounded opacity-0 group-hover:opacity-100"
              aria-label="Delete"
            >
              <TrashIcon />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default function HistoryList({ items, synagogueId, canReorder, onDeleteClick }: HistoryListProps) {
  const [entries, setEntries] = useState<HistoryEntry[]>(items)
  const [isSaving, setIsSaving] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = entries.findIndex(e => e.id === active.id)
    const newIndex = entries.findIndex(e => e.id === over.id)
    const reordered = arrayMove(entries, oldIndex, newIndex)
    setEntries(reordered)

    setIsSaving(true)
    try {
      await fetch('/api/history/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          synagogueId,
          items: reordered.map((e, i) => ({ id: e.id, display_order: i })),
        }),
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="relative">
      {isSaving && (
        <span className="absolute top-0 right-0 text-xs text-gray-400 dark:text-gray-500 italic">
          Saving…
        </span>
      )}
      {/* Timeline vertical line */}
      <div className="absolute left-[52px] top-0 bottom-0 w-px bg-gray-100 dark:bg-gray-700" />
      <div className="space-y-5">
        {canReorder ? (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={entries.map(e => e.id)} strategy={verticalListSortingStrategy}>
              {entries.map(entry => (
                <SortableRow
                  key={entry.id}
                  entry={entry}
                  canReorder={true}
                  onDeleteClick={onDeleteClick}
                />
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          entries.map(entry => (
            <SortableRow
              key={entry.id}
              entry={entry}
              canReorder={false}
              onDeleteClick={onDeleteClick}
            />
          ))
        )}
      </div>
    </div>
  )
}
