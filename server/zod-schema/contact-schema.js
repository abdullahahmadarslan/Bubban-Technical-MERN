//requiring zod library
const z = require("zod");

//creating zod schema for auth
const contactZodSchema = z.object({
    name: z
        .string({ message: "name is required" })
        .trim()
        .min(4, { message: "name must be atleast 4 characters login" })
        .max(12, { message: "name must be at max 12 characters long" }),
    email: z
        .string({ message: "email is required" })
        .trim()
        .min(4, { message: "email must be atleast 4 characters login" })
        .max(50, { message: "email must be at max 12 characters long" }),
    phone: z
        .string({ message: "phone is required" })
        .trim()
        .min(4, { message: "phone must be atleast 4 characters login" })
        .max(12, { message: "phone must be at max 12 characters long" }),
    message: z
        .string({ message: "message is required" })
        .min(4, { message: "message must be atleast 4 characters login" })
        .max(100, { message: "message must be at max 12 characters long" })
});

module.exports = contactZodSchema;
