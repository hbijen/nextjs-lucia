import { z } from "zod";

export const Name = z.object({
    firstname: z.string(),
    middlename: z.string(),
    lastname: z.string(),
    salutation: z.string(),
})

export const Address = z.object({
    line1: z.string(),
    line2: z.string(),
    city: z.string(),
    state: z.string(),
    pin: z.string(),
    country: z.string(),
})

export const Phone = z.string()
export const Email = z.string().email()

export const Contact = z.object({
    phone: Phone,
    email: Email,
})
Contact.refine(d => d.phone || d.email, "Email or Phone is required.")

export const BloodGroup  = z.enum(['A-', 'A+', 'B-', 'B+', 'AB-', 'AB+', 'O-', 'O+'])
export type BloodGroup = z.infer<typeof BloodGroup>

export const Reservation  = z.enum(['SC', 'ST', 'OBC'])
export type Reservation = z.infer<typeof Reservation>

export const PersonBasic1 = z.object({
    dob: z.string().date(),
    bloodGroup: BloodGroup,
    category: Reservation,
    aadhaar: z.string(),
})

export const Person = z.object({
    name: Name,
    contact: Contact,
    address: Address,
})

export type Person = z.infer<typeof Person>