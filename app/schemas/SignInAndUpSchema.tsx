import {z} from 'zod'

export const SignInSchema = z.object({
    email: z
    .string({
        required_error: "Email is required."
    })
    .email({
        message: "Not a valid email!"
    }),
    password: z
    .string({
        required_error: "Password is required."
    })
    .min(6,{
        message: "Password is to short - should be 6 chars minimum."
    }),

    
})

export const SignUpSchema = SignInSchema.extend({
    passwordConfirm: z
    .string({
        required_error: "Password confirm is required."
    })
    .min(6,{
        message: "Password confirm is to short - should be 6 chars minimum."
    }),
    
}).superRefine(({passwordConfirm, password}, ctx)=>{
    if (passwordConfirm!==password) {
        ctx.addIssue({code:'custom', message:"The passwords didn't match", path:['passwordConfirm']})
    }
})


export const ResetPasswordSchema = z.object({
    oldPassword: z
    .string({
        required_error: "Old password is required."
    })
    .min(6,{
        message: "Old password is to short - should be 6 chars minimum."
    }),
    newPassword: z
    .string({
        required_error: "New password is required."
    })
    .min(6,{
        message: "New password is to short - should be 6 chars minimum."
    }),
    confirmPassword: z
    .string({
        required_error: "Confirm password is required."
    })
    .min(6,{
        message: "Confirm password is to short - should be 6 chars minimum."
    }),
    
})
