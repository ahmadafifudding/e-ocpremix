import { z } from 'zod'

export const signInSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter an email',
    })
    .email({
      message: 'Please enter a valid email',
    }),
  password: z
    .string({
      required_error: 'Please enter a password',
    })
    .min(6, {
      message: 'Please enter a password',
    }),
})

export const signUpSchema = z.object({
  name: z
    .string({
      required_error: 'Please enter a name',
    })
    .min(3, {
      message: 'Please enter a name',
    }),
  email: z
    .string({
      required_error: 'Please enter an email',
    })
    .email({
      message: 'Please enter a valid email',
    }),
  password: z
    .string({
      required_error: 'Please enter a password',
    })
    .min(6),
  position: z
    .string({
      required_error: 'Please enter a position',
    })
    .min(3),
})

export const locationSchema = z.object({
  branch: z.string().min(3, {
    message: 'Please select a branch',
  }),
  district: z.string().min(3, {
    message: 'Please select a district',
  }),
})

export const step2Schema = z.object({
  lane: z.string().min(3, {
    message: 'Please select a lane',
  }),
  quarry: z.string().min(1, {
    message: 'Please select a quarry',
  }),
})

export const step3Schema = z.object({
  route: z.string().min(3, {
    message: 'Please enter a route name',
  }),
  section: z.string().min(3, {
    message: 'Please enter a section name',
  }),
  typeOfTreatment: z.string().min(3, {
    message: 'Please enter a type of treatment',
  }),
})

export const addQuarrySchema = z.object({
  quarry: z.string().min(3, {
    message: 'Please enter a quarry name',
  }),
})

export const calculatePremixSchema = z.object({
  date: z.date(),
  length: z.number().min(1, {
    message: 'Please enter a length',
  }),
  width: z.number().min(1, {
    message: 'Please enter a width',
  }),
  depth: z.number().min(1, {
    message: 'Please enter a depth',
  }),
  density: z.number().min(1, {
    message: 'Please enter a density',
  }),
})

export const descriptionOfWorkSchema = z.object({
  description: z.string().min(3, {
    message: 'Please enter a description',
  }),
})
export type SignInSchema = z.infer<typeof signInSchema>
export type SignUpSchema = z.infer<typeof signUpSchema>
export type LocationSchema = z.infer<typeof locationSchema>
export type Step2Schema = z.infer<typeof step2Schema>
export type Step3Schema = z.infer<typeof step3Schema>
export type AddQuarrySchema = z.infer<typeof addQuarrySchema>
export type CalculatePremixSchema = z.infer<typeof calculatePremixSchema>
export type DescriptionOfWorkSchema = z.infer<typeof descriptionOfWorkSchema>
