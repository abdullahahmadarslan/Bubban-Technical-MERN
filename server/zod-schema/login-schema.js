//requiring zod library
const z = require("zod");

//creating login schema
const loginZodSchema = z.object({
    email: z
        .string({ message: "email is required" })
        .trim()
        .min(4, { message: "email must be atleast 4 characters login" })
        .max(50, { message: "email must be at max 12 characters long" }),
    password: z
        .string({ message: "password is required" })
        .min(4, { message: "password must be atleast 4 characters login" })
        .max(12, { message: "password must be at max 12 characters long" })
});

//exporting login zod schema
module.exports = loginZodSchema;
