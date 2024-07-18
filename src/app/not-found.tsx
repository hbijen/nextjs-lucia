import Link from 'next/link'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <div className="w-full h-screen flex items-center justify-center px-4">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Not Found</CardTitle>
                    <CardDescription>
                        Could not find requested resource
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/">
                        <Button>Go Home</Button>
                    </Link>

                </CardContent>
            </Card>
        </div>
    )
}