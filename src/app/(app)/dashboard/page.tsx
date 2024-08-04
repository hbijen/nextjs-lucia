"use client"

import ActiveUsers from "@/components/dashboard/active-users"

export default function Dashboard() {
  return (
      <div className="grid w-full flex-1 gap-6">
        <ActiveUsers></ActiveUsers>
      </div>
  )
}