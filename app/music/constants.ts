import * as zo from 'zod';


export const formSchema = zo.object({
    prompt: zo.string().min(1,  {
        message: "Prompt is required"
    })
})