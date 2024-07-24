"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { AppUser } from "@/lib/model/user"
import { getUser } from "@/lib/service/user-service"
import { useEffect, useState } from "react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { updateUser } from "../actions"
import { Button } from "@/components/ui/button"

export default function ManageUsers({ params }: { params: any }) {
  console.log('searchParams', params.id)
  const [user, setUser] = useState<AppUser | null>(null)

  const userForm = useForm<z.infer<typeof AppUser>>({
    resolver: zodResolver(AppUser),
    defaultValues: {
      firstname: "",
      lastname: "",
    },
  })

  useEffect(() => {
    getUser(params.id).then(r => {
      setUser(r)
      userForm.reset({firstname: r?.firstname, lastname: r?.lastname})
    })
  }, [params.id])

  function save(values: z.infer<typeof AppUser>) {

    console.log("save", values)
    updateUser(user?.id!, values)
      .then(r => {
        console.log(r)
        if (r.ok) {
        } else {
        }
      }).catch(err => {
        console.error('r ', err)
      })
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0">
        <Card>
          <CardHeader>
            <CardTitle>Edit User</CardTitle>
            <CardDescription>
              {user.firstname} {user.lastname} ( {user.email} )
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                <div className="text-center p-4 col-span-2">
                  <Button type="submit" className="w-48">Save</Button>
                </div>
              </form>
            </Form>


          </CardContent>
        </Card>
      </main>
    </div>
  )
}