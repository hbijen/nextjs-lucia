"use server"

import prisma from "@/lib/db"


// [
//     {
//       activity: "stand",
//       value: (8 / 12) * 100,
//       fill: "var(--color-stand)",
//     },
//     {
//       activity: "exercise",
//       value: (46 / 60) * 100,
//       fill: "var(--color-exercise)",
//     },
//     {
//       activity: "move",
//       value: (245 / 360) * 100,
//       fill: "var(--color-move)",
//     },
//   ]
export async function findActiveUsers() {

    const total = prisma.users.count()
    const totalActive = prisma.users.count({
        where: {
            inactive_at: null
        },
    })

    return Promise.all([total, totalActive]).then(r => {
        const active = r[1], total = r[0], inactive = (r[0] - r[1])
        return {
            total,
            data: [
                {
                    activity: "active",
                    label: "Active User",
                    count: active,
                    value: active / total * 100,
                    fill: "var(--color-active)"
                },
                {
                    activity: "inactive",
                    label: "Inactive User",
                    count: inactive,
                    value: inactive / total * 100,
                    fill: "var(--color-inactive)"
                }
            ]
        }
    })
}