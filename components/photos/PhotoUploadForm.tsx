'use client'

import { useEffect, useRef, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface Props {
  synagogueId: string
  userId: string
  /** Called after successful insert. wasApproved=true for editors/admins. */
  onSuccess: (wasApproved: boolean) => void
}

const ACCEPTED_TYPES  = ['image/jpeg', 'image/png', 'image/webp']
const MAX_BYTES       = 5 * 1024 * 1024   // 5 MB
const AUTO_APPROVE_ROLES = ['editor', 'admin', 'super_admin']

function sanitizeFilename(name: string): string {
  const dot  = name.lastIndexOf('.')
  const ext  = dot >= 0 ? name.slice(dot).toLowerCase() : ''
  const base = name.slice(0, dot >= 0 ? dot : undefined)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return `${base || 'photo'}${ext}`
}

export default function PhotoUploadForm({ synagogueId, userId, onSuccess }: Props) {
  const supabase = createClientComponentClient()

  const [file,        setFile]        = useState<File | null>(null)
  const [preview,     setPreview]     = useState<string | null>(null)
  const [dimensions,  setDimensions]  = useState<{ w: number; h: number } | null>(null)
  const [caption,     setCaption]     = useState('')
  const [photographer,setPhotographer]= useState('')
  const [description, setDescription] = useState('')
  const [dateTaken,   setDateTaken]   = useState('')
  const [error,       setError]       = useState<string | null>(null)
  const [loading,     setLoading]     = useState(false)
  const [progress,    setProgress]    = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Revoke preview object URL when it changes or component unmounts
  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview) }
  }, [preview])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const chosen = e.target.files?.[0] ?? null
    if (!chosen) return

    setError(null)

    if (!ACCEPTED_TYPES.includes(chosen.type)) {
      setError('Only JPEG, PNG, and WebP files are accepted.')
      e.target.value = ''
      return
    }
    if (chosen.size > MAX_BYTES) {
      setError(`File too large (${(chosen.size / 1024 / 1024).toFixed(1)} MB). Maximum is 5 MB.`)
      e.target.value = ''
      return
    }

    // Revoke previous preview to avoid memory leaks
    if (preview) URL.revokeObjectURL(preview)
    const url = URL.createObjectURL(chosen)
    setPreview(url)
    setFile(chosen)
    setDimensions(null)

    // Read dimensions from the loaded image
    const img = new Image()
    img.onload = () => setDimensions({ w: img.naturalWidth, h: img.naturalHeight })
    img.src = url
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!file) {
      setError('Please select a photo.')
      return
    }
    if (!caption.trim()) {
      setError('Caption is required.')
      return
    }

    setLoading(true)
    setProgress(0)

    // ── 1. Upload to storage ─────────────────────────────────────────────────
    const storagePath = `synagogues/${synagogueId}/${Date.now()}-${sanitizeFilename(file.name)}`

    const { error: uploadError } = await supabase.storage
      .from('synagogue-images')
      .upload(storagePath, file, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
        // @ts-ignore — onUploadProgress is present in supabase-js ≥2.39
        onUploadProgress: (p: { loaded: number; total: number }) =>
          setProgress(Math.min(90, Math.round((p.loaded / p.total) * 90))),
      })

    if (uploadError) {
      setError(`Upload failed: ${uploadError.message}`)
      setLoading(false)
      return
    }

    setProgress(92)

    // ── 2. Fetch user role to determine approval status ─────────────────────
    const { data: userRow } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', userId)
      .maybeSingle()

    const approved = userRow ? AUTO_APPROVE_ROLES.includes(userRow.role) : false

    setProgress(96)

    // ── 3. Insert into images table ──────────────────────────────────────────
    // storage_path holds the relative path; url is intentionally empty.
    // The full URL is built at read-time from storage_config.base_url + storage_path.
    const yearFromDate = dateTaken ? parseInt(dateTaken.slice(0, 4)) : null

    const { error: insertError } = await supabase
      .from('images')
      .insert({
        synagogue_id:      synagogueId,
        source_type:       'hosted',
        url:               '',             // intentionally blank — path is in storage_path
        storage_path:      storagePath,
        storage_provider:  'supabase',
        caption:           caption.trim(),
        description:       description.trim() || null,
        photographer:      photographer.trim() || null,
        date_taken:        dateTaken || null,
        year:              yearFromDate,
        original_filename: file.name,
        file_size:         file.size,
        mime_type:         file.type,
        width:             dimensions?.w ?? null,
        height:            dimensions?.h ?? null,
        is_primary:        false,
        display_order:     0,
        uploaded_by:       userId,
        approved,
        ...(approved && {
          approved_by: userId,
          approved_at: new Date().toISOString(),
        }),
      })

    setProgress(100)
    setLoading(false)

    if (insertError) {
      // If insert fails, clean up the uploaded file to avoid orphans
      await supabase.storage.from('synagogue-images').remove([storagePath])
    
      if (insertError.code === '23503') {
        setError('Your account profile is not fully set up. Please sign out and sign in again.')
      } else {
        setError(insertError.message)
      }
      return
    }

    onSuccess(approved)
  }

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm'
  const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* ── File picker ────────────────────────────────────────────────────── */}
      <div>
        <label className={labelClass}>Photo</label>
        {preview ? (
          <div className="relative">
            {/* Preview */}
            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-48 object-contain"
              />
            </div>
            {dimensions && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {dimensions.w} × {dimensions.h}px · {(file!.size / 1024).toFixed(0)} KB
              </p>
            )}
            <button
              type="button"
              onClick={() => {
                setFile(null)
                setPreview(null)
                setDimensions(null)
                if (fileInputRef.current) fileInputRef.current.value = ''
              }}
              className="mt-2 text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition"
            >
              Remove photo
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition">
            <div className="text-center">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="text-sm text-gray-500 dark:text-gray-400">Click to select a photo</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 block mt-0.5">JPEG, PNG, WebP · max 5 MB</span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* ── Caption (required by DB) ────────────────────────────────────────── */}
      <div>
        <label htmlFor="photo-caption" className={labelClass}>
          Caption <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="photo-caption"
          type="text"
          required
          value={caption}
          onChange={e => setCaption(e.target.value)}
          className={inputClass}
          placeholder="Briefly describe what's shown in this photo"
        />
      </div>

      {/* ── Photographer / Date ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="photo-photographer" className={labelClass}>Photographer</label>
          <input
            id="photo-photographer"
            type="text"
            value={photographer}
            onChange={e => setPhotographer(e.target.value)}
            className={inputClass}
            placeholder="Name or unknown"
          />
        </div>
        <div>
          <label htmlFor="photo-date" className={labelClass}>Date taken</label>
          <input
            id="photo-date"
            type="date"
            value={dateTaken}
            onChange={e => setDateTaken(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* ── Description ─────────────────────────────────────────────────────── */}
      <div>
        <label htmlFor="photo-description" className={labelClass}>Description</label>
        <textarea
          id="photo-description"
          rows={2}
          value={description}
          onChange={e => setDescription(e.target.value)}
          className={inputClass}
          placeholder="Additional context about the photo (optional)"
        />
      </div>

      {/* ── Upload progress ─────────────────────────────────────────────────── */}
      {loading && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{progress < 92 ? 'Uploading…' : progress < 100 ? 'Saving…' : 'Done'}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !file}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-lg font-medium text-sm transition"
      >
        {loading ? 'Uploading…' : 'Upload photo'}
      </button>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        Photos are reviewed before appearing publicly.
      </p>
    </form>
  )
}
