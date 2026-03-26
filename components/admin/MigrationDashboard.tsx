'use client'

import { useState } from 'react'
import Link from 'next/link'

interface VerificationData {
  counts: {
    oldProfiles: number
    newProfiles: number
    oldAffiliations: number
    newAffiliations: number
  }
  personTypes: Record<string, number>
  affiliationCategories: Record<string, number>
  slugIssues: {
    duplicates: Array<{ slug: string; count: number }>
    clergyWithoutSlugs: Array<{ id: string; canonical_name: string; person_type: string }>
    nonClergyWithSlugs: Array<{ id: string; canonical_name: string; person_type: string }>
  }
  syncIssues: {
    profilesOnlyInOld: string[]
    profilesOnlyInNew: string[]
    affiliationsOnlyInOld: string[]
    affiliationsOnlyInNew: string[]
  }
}

interface Props {
  data: VerificationData
}

export default function MigrationDashboard({ data }: Props) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const profilesMatch = data.counts.oldProfiles === data.counts.newProfiles
  const affiliationsMatch = data.counts.oldAffiliations === data.counts.newAffiliations
  const hasSlugIssues =
    data.slugIssues.duplicates.length > 0 ||
    data.slugIssues.clergyWithoutSlugs.length > 0 ||
    data.slugIssues.nonClergyWithSlugs.length > 0
  const hasSyncIssues =
    data.syncIssues.profilesOnlyInOld.length > 0 ||
    data.syncIssues.profilesOnlyInNew.length > 0 ||
    data.syncIssues.affiliationsOnlyInOld.length > 0 ||
    data.syncIssues.affiliationsOnlyInNew.length > 0

  const overallHealthy = profilesMatch && affiliationsMatch && !hasSlugIssues && !hasSyncIssues

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Migration Verification Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Verify data integrity during the leadership model migration
          </p>
        </div>

        {/* Overall Health Status */}
        <div className={`mb-8 p-6 rounded-lg border-2 ${
          overallHealthy
            ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
            : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500'
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">
              {overallHealthy ? '✅' : '⚠️'}
            </span>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {overallHealthy ? 'Migration Healthy' : 'Issues Detected'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {overallHealthy
                  ? 'All tables are in sync with no issues detected'
                  : 'Some issues require attention before cutover'}
              </p>
            </div>
          </div>
        </div>

        {/* Record Counts */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            📊 Record Counts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Person Profiles */}
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Person Profiles
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Old (rabbi_profiles):</span>
                  <span className="font-mono font-bold">{data.counts.oldProfiles}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">New (person_profiles):</span>
                  <span className="font-mono font-bold">{data.counts.newProfiles}</span>
                </div>
                <div className={`flex justify-between items-center pt-2 border-t ${
                  profilesMatch
                    ? 'border-green-200 dark:border-green-800'
                    : 'border-red-200 dark:border-red-800'
                }`}>
                  <span className="font-semibold">Status:</span>
                  <span className={profilesMatch ? 'text-green-600' : 'text-red-600'}>
                    {profilesMatch ? '✓ Match' : '✗ Mismatch'}
                  </span>
                </div>
              </div>
            </div>

            {/* Affiliations */}
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Affiliations
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Old (rabbis):</span>
                  <span className="font-mono font-bold">{data.counts.oldAffiliations}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">New (affiliations):</span>
                  <span className="font-mono font-bold">{data.counts.newAffiliations}</span>
                </div>
                <div className={`flex justify-between items-center pt-2 border-t ${
                  affiliationsMatch
                    ? 'border-green-200 dark:border-green-800'
                    : 'border-red-200 dark:border-red-800'
                }`}>
                  <span className="font-semibold">Status:</span>
                  <span className={affiliationsMatch ? 'text-green-600' : 'text-red-600'}>
                    {affiliationsMatch ? '✓ Match' : '✗ Mismatch'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Breakdown */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            📋 Category Breakdown
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Person Types */}
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Person Types (person_profiles)
              </h3>
              <div className="space-y-2">
                {Object.entries(data.personTypes).map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400 capitalize">{type}:</span>
                    <span className="font-mono font-bold">{count}</span>
                  </div>
                ))}
                {Object.keys(data.personTypes).length === 0 && (
                  <p className="text-sm text-gray-400">No records</p>
                )}
              </div>
            </div>

            {/* Affiliation Categories */}
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Affiliation Categories (affiliations)
              </h3>
              <div className="space-y-2">
                {Object.entries(data.affiliationCategories).map(([cat, count]) => (
                  <div key={cat} className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400 capitalize">{cat}:</span>
                    <span className="font-mono font-bold">{count}</span>
                  </div>
                ))}
                {Object.keys(data.affiliationCategories).length === 0 && (
                  <p className="text-sm text-gray-400">No records</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Slug Issues */}
        {hasSlugIssues && (
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-yellow-300 dark:border-yellow-700 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              ⚠️ Slug Issues
            </h2>

            {data.slugIssues.duplicates.length > 0 && (
              <div className="mb-4">
                <button
                  onClick={() => toggleSection('duplicates')}
                  className="w-full text-left font-semibold text-red-600 dark:text-red-400 flex justify-between items-center"
                >
                  <span>Duplicate Slugs ({data.slugIssues.duplicates.length})</span>
                  <span>{expandedSection === 'duplicates' ? '▼' : '▶'}</span>
                </button>
                {expandedSection === 'duplicates' && (
                  <div className="mt-2 pl-4 space-y-1">
                    {data.slugIssues.duplicates.map(({ slug, count }) => (
                      <div key={slug} className="text-sm text-gray-600 dark:text-gray-400">
                        {slug} ({count} records)
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {data.slugIssues.clergyWithoutSlugs.length > 0 && (
              <div className="mb-4">
                <button
                  onClick={() => toggleSection('noSlugs')}
                  className="w-full text-left font-semibold text-yellow-600 dark:text-yellow-400 flex justify-between items-center"
                >
                  <span>Clergy Without Slugs ({data.slugIssues.clergyWithoutSlugs.length})</span>
                  <span>{expandedSection === 'noSlugs' ? '▼' : '▶'}</span>
                </button>
                {expandedSection === 'noSlugs' && (
                  <div className="mt-2 pl-4 space-y-1">
                    {data.slugIssues.clergyWithoutSlugs.map((p) => (
                      <div key={p.id} className="text-sm text-gray-600 dark:text-gray-400">
                        {p.canonical_name} ({p.person_type})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {data.slugIssues.nonClergyWithSlugs.length > 0 && (
              <div>
                <button
                  onClick={() => toggleSection('badSlugs')}
                  className="w-full text-left font-semibold text-yellow-600 dark:text-yellow-400 flex justify-between items-center"
                >
                  <span>Non-Clergy With Slugs ({data.slugIssues.nonClergyWithSlugs.length})</span>
                  <span>{expandedSection === 'badSlugs' ? '▼' : '▶'}</span>
                </button>
                {expandedSection === 'badSlugs' && (
                  <div className="mt-2 pl-4 space-y-1">
                    {data.slugIssues.nonClergyWithSlugs.map((p) => (
                      <div key={p.id} className="text-sm text-gray-600 dark:text-gray-400">
                        {p.canonical_name} ({p.person_type})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* Sync Issues */}
        {hasSyncIssues && (
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-red-300 dark:border-red-700 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              🔴 Sync Issues
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              These records exist in one table but not the other, indicating a sync problem.
            </p>

            {data.syncIssues.profilesOnlyInOld.length > 0 && (
              <div className="mb-4">
                <div className="font-semibold text-red-600 dark:text-red-400">
                  Profiles Only in Old Table: {data.syncIssues.profilesOnlyInOld.length}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono break-all">
                  {data.syncIssues.profilesOnlyInOld.slice(0, 5).join(', ')}
                  {data.syncIssues.profilesOnlyInOld.length > 5 && ' ...'}
                </div>
              </div>
            )}

            {data.syncIssues.profilesOnlyInNew.length > 0 && (
              <div className="mb-4">
                <div className="font-semibold text-red-600 dark:text-red-400">
                  Profiles Only in New Table: {data.syncIssues.profilesOnlyInNew.length}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono break-all">
                  {data.syncIssues.profilesOnlyInNew.slice(0, 5).join(', ')}
                  {data.syncIssues.profilesOnlyInNew.length > 5 && ' ...'}
                </div>
              </div>
            )}

            {data.syncIssues.affiliationsOnlyInOld.length > 0 && (
              <div className="mb-4">
                <div className="font-semibold text-red-600 dark:text-red-400">
                  Affiliations Only in Old Table: {data.syncIssues.affiliationsOnlyInOld.length}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono break-all">
                  {data.syncIssues.affiliationsOnlyInOld.slice(0, 5).join(', ')}
                  {data.syncIssues.affiliationsOnlyInOld.length > 5 && ' ...'}
                </div>
              </div>
            )}

            {data.syncIssues.affiliationsOnlyInNew.length > 0 && (
              <div>
                <div className="font-semibold text-red-600 dark:text-red-400">
                  Affiliations Only in New Table: {data.syncIssues.affiliationsOnlyInNew.length}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono break-all">
                  {data.syncIssues.affiliationsOnlyInNew.slice(0, 5).join(', ')}
                  {data.syncIssues.affiliationsOnlyInNew.length > 5 && ' ...'}
                </div>
              </div>
            )}
          </section>
        )}

        {/* No issues — show an all-clear panel */}
        {!hasSlugIssues && !hasSyncIssues && (
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-green-200 dark:border-green-800 p-6 mb-6">
            <p className="text-green-700 dark:text-green-400 font-medium">
              ✓ No slug issues detected
            </p>
            <p className="text-green-700 dark:text-green-400 font-medium mt-1">
              ✓ No sync issues detected — all IDs present in both old and new tables
            </p>
          </section>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            🔄 Refresh Data
          </button>

          <Link
            href="/admin"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
          >
            ← Back to Admin
          </Link>
        </div>
      </div>
    </main>
  )
}
