'use client'

import { useUserRole } from '@/hooks/useUserRole'

export default function TestRolePage() {
  const { 
    role, 
    loading, 
    error,
    isContributor, 
    isEditor, 
    isAdmin, 
    isSuperAdmin,
    canEdit 
  } = useUserRole()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading user role...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error: {error.message}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">useUserRole Hook Test</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
          <div>
            <span className="font-semibold">Role:</span>{' '}
            <span className="text-blue-600">{role || 'Not logged in'}</span>
          </div>
          
          <div className="border-t pt-4 space-y-2">
            <h2 className="font-semibold text-lg mb-2">Permission Checks:</h2>
            
            <div className="grid grid-cols-2 gap-2">
              <div>isContributor:</div>
              <div className={isContributor ? 'text-green-600' : 'text-gray-400'}>
                {isContributor ? '✓ Yes' : '✗ No'}
              </div>
              
              <div>isEditor:</div>
              <div className={isEditor ? 'text-green-600' : 'text-gray-400'}>
                {isEditor ? '✓ Yes' : '✗ No'}
              </div>
              
              <div>isAdmin:</div>
              <div className={isAdmin ? 'text-green-600' : 'text-gray-400'}>
                {isAdmin ? '✓ Yes' : '✗ No'}
              </div>
              
              <div>isSuperAdmin:</div>
              <div className={isSuperAdmin ? 'text-green-600' : 'text-gray-400'}>
                {isSuperAdmin ? '✓ Yes' : '✗ No'}
              </div>
              
              <div>canEdit:</div>
              <div className={canEdit ? 'text-green-600' : 'text-gray-400'}>
                {canEdit ? '✓ Yes' : '✗ No'}
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Expected for your super_admin account:
              <br />All checks should be ✓ Yes
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
