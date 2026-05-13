import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_ADDRESS = 'Philadelphia Historical Synagogues <contributions@historicalsynagogues.org>'

const PROPOSAL_TYPE_LABELS: Record<string, string> = {
  synagogue_edit:              'Edit synagogue details',
  synagogue_new:               'New synagogue',
  synagogue_delete:            'Delete synagogue',
  synagogue_merge:             'Merge synagogues',
  synagogue_split:             'Split synagogue',
  address_edit:                'Edit address',
  address_new:                 'New address',
  history_edit:                'Edit history entry',
  history_new:                 'New history entry',
  rabbi_edit:                  'Edit leader',
  rabbi_new:                   'New leader',
  rabbi_affiliation_new:       'Add clergy affiliation',
  lay_leader_affiliation_new:  'Add lay leader',
  staff_affiliation_new:       'Add staff member',
  affiliation_edit:            'Edit affiliation',
  rabbi_profile_new:           'New leader profile',
  rabbi_profile_edit:          'Edit leader profile',
  rabbi_profile_delete:        'Delete leader profile',
  rabbi_profile_merge:         'Merge leader profiles',
  rabbi_profile_split:         'Split leader profile',
  image_upload:                'Photo upload',
  link_add:                    'Add external link',
  relationship_add:            'Add synagogue relationship',
}

const FIELD_LABELS: Record<string, string> = {
  name:                 'Name',
  canonical_name:       'Full name',
  founded_year:         'Founded year',
  founded_text:         'Founded note',
  closed_year:          'Closed year',
  closed_text:          'Closed note',
  status:               'Status',
  neighborhood:         'Neighborhood',
  street_address:       'Street address',
  city:                 'City',
  state:                'State',
  zip_code:             'ZIP code',
  start_year:           'Start year',
  end_year:             'End year',
  is_current:           'Current address',
  content:              'Content',
  entry_type:           'Entry type',
  year:                 'Year',
  source:               'Source',
  birth_year:           'Birth year',
  death_year:           'Death year',
  biography:            'Biography',
  person_name:          'Person name',
  role_title:           'Role',
  person_type:          'Person type',
  affiliation_category: 'Category',
  caption:              'Caption',
  photographer:         'Photographer',
  url:                  'URL',
  link_type:            'Link type',
  relationship_type:    'Relationship type',
}

function formatValue(key: string, value: unknown): string {
  if (value === null || value === undefined) return '—'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

function buildProposedDataRows(proposedData: Record<string, unknown>): string {
  const SKIP_KEYS = new Set([
    'merge_target_id', 'split_fields', 'person_a', 'person_b',
    'affiliation_category', 'storage_path', 'storage_provider',
    'width', 'height', 'file_size', 'original_filename', 'mime_type',
    'people_names', 'people_metadata',
  ])

  const rows = Object.entries(proposedData)
    .filter(([k]) => !SKIP_KEYS.has(k))
    .map(([k, v]) => {
      const label = FIELD_LABELS[k] ?? k.replace(/_/g, ' ')
      const val = formatValue(k, v)
      if (val === '—') return ''
      return `
        <tr>
          <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:13px;">${val}</td>
        </tr>`
    })
    .filter(Boolean)
    .join('')

  if (!rows) return ''

  return `
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-top:8px;">
      <thead>
        <tr style="background:#f9fafb;">
          <th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid #e5e7eb;">Field</th>
          <th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid #e5e7eb;">Proposed value</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`
}

interface SendConfirmationParams {
  to: string
  proposalId: string
  proposalType: string
  proposedData: Record<string, unknown>
  submitterNote: string | null
  synagogueName: string | null
  submittedAt: string
  baseUrl: string
}

export async function sendProposalConfirmation({
  to,
  proposalId,
  proposalType,
  proposedData,
  submitterNote,
  synagogueName,
  submittedAt,
  baseUrl,
}: SendConfirmationParams): Promise<void> {
  const typeLabel = PROPOSAL_TYPE_LABELS[proposalType] ?? proposalType
  const dataRows = buildProposedDataRows(proposedData)
  const dashboardUrl = `${baseUrl}/contributions`
  const withdrawUrl = `${baseUrl}/contributions?withdraw=${proposalId}`

  const submittedDate = new Date(submittedAt).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })

  const entityLine = synagogueName
    ? `<tr><td style="padding:4px 0;color:#6b7280;font-size:14px;width:130px;">Synagogue</td><td style="padding:4px 0;color:#111827;font-size:14px;font-weight:500;">${synagogueName}</td></tr>`
    : ''

  const noteLine = submitterNote
    ? `<div style="margin-top:20px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Your note</p>
        <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:10px 12px;">${submitterNote}</p>
      </div>`
    : ''

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:580px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background:#1d4ed8;padding:28px 32px;">
      <p style="margin:0;font-size:13px;color:#93c5fd;letter-spacing:0.05em;text-transform:uppercase;font-weight:600;">Philadelphia Historical Synagogues</p>
      <h1 style="margin:8px 0 0;font-size:22px;color:#ffffff;font-weight:700;line-height:1.3;">Contribution received</h1>
    </div>

    <!-- Body -->
    <div style="padding:28px 32px;">
      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">
        Thank you for contributing to the preservation of Philadelphia's Jewish heritage.
        Your submission has been received and is now pending review by our editors.
      </p>

      <!-- Submission summary -->
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px 20px;margin-bottom:20px;">
        <p style="margin:0 0 10px;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Submission details</p>
        <table style="border-collapse:collapse;width:100%;">
          <tr>
            <td style="padding:4px 0;color:#6b7280;font-size:14px;width:130px;">Type</td>
            <td style="padding:4px 0;color:#111827;font-size:14px;font-weight:500;">${typeLabel}</td>
          </tr>
          ${entityLine}
          <tr>
            <td style="padding:4px 0;color:#6b7280;font-size:14px;">Submitted</td>
            <td style="padding:4px 0;color:#111827;font-size:14px;">${submittedDate}</td>
          </tr>
        </table>
      </div>

      ${dataRows ? `<div style="margin-bottom:20px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">What you proposed</p>
        ${dataRows}
      </div>` : ''}

      ${noteLine}

      <!-- What happens next -->
      <div style="margin-top:24px;padding:14px 16px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;">
        <p style="margin:0;font-size:14px;color:#1e40af;line-height:1.5;">
          <strong>What happens next:</strong> Our volunteer editors review each submission within a few days.
          You can track the status on your Contributor Dashboard.
        </p>
      </div>

      <!-- CTA buttons -->
      <div style="margin-top:28px;display:flex;gap:12px;">
        <a href="${dashboardUrl}" style="display:inline-block;padding:10px 20px;background:#1d4ed8;color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">View my contributions</a>
        <a href="${withdrawUrl}" style="display:inline-block;padding:10px 20px;background:#ffffff;color:#6b7280;text-decoration:none;border-radius:8px;font-size:14px;font-weight:500;border:1px solid #d1d5db;">Withdraw this submission</a>
      </div>

      <p style="margin:28px 0 0;font-size:12px;color:#9ca3af;line-height:1.6;">
        You're receiving this because you submitted a contribution at historicalsynagogues.org.
        To withdraw this submission, click the button above (you must be signed in).
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 32px;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        Philadelphia Historical Synagogues &mdash; Preserving 280+ years of Jewish heritage
      </p>
    </div>
  </div>
</body>
</html>`

  await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: `Your contribution has been received — Philadelphia Historical Synagogues`,
    html,
  })
}
