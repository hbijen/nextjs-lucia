"use server"

import prisma from "@/lib/db"

export async function findActiveUsers() {

    const total = prisma.users.count()
    const totalActive = prisma.users.count({
        where: {
            inactive_at: null
        },
    })

    return Promise.all([total, totalActive]).then(r => {
        const active = r[1], total = r[0], inactive = (r[0] - r[1])
        return [
                {
                    status: "active",
                    label: "Active",
                    count: active,
                    fill: "var(--color-active)"
                },
                {
                    status: "inactive",
                    label: "Inactive",
                    count: inactive,
                    fill: "var(--color-inactive)"
                }
            ]
    })
}