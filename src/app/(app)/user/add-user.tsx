"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AppUser } from "@/lib/model/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { addUser } from "./actions"

type AddEditUserProps = {
    children?: ReactNode | undefined,
}

export function AddEditUser({ children }: AddEditUserProps) {

    const [info, setInfo] = useState({
        error: "",
        success: "",
    })

    const userForm = useForm<z.infer<typeof AppUser>>({
        resolver: zodResolver(AppUser),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            provider: 'email-password',
            emailVerified: false,
            inactive_at: new Date()
        },
    })

    function save(values: z.infer<typeof AppUser>) {

        setInfo({error: '', success: ''})
        console.log(values)
        addUser(values)
        .then(r=> {
            if (r.ok) {
                userForm.reset()
                setInfo({error: '', success: `Created user with id = ${r.data?.id} `})
            } else {
                setInfo({error: r.error ?? '', success: ''})
            }
        }).catch((err: any) =>{
            console.error('r ', err)
        })
    }

    function onOpenChange() {
        setInfo({error: '', success: ''})
    }

    return (
        <Dialog onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm md:max-w-[728px]">
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogDescription>
                        Create a new user. A verification email will be sent to the entered email.
                    </DialogDescription>
                    { info.error && <div className="text-red-600">{info.error}</div> }
                    { info.success && <div className="text-blue-600">{info.success}</div> }
                </DialogHeader>
                <Form {...userForm}>
                    <form onSubmit={userForm.handleSubmit(save)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <FormField
                            control={userForm.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter first name" {...field} />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={userForm.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter last name" {...field} />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={userForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Enter email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="text-center p-4 col-span-2">
                            <Button type="submit" className="w-48">Save</Button>
                        </div>
                    </form>
                </Form>

                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
