import { z } from "zod";

const createUserValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    email: z.string({
      required_error: "Email is required!",
    }),
    role: z.string().optional(),
    password: z.string({
      required_error: "Password is required!",
    }),
  }),
});

const loginUserValidation = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required!",
    }),
    password: z.string({
      required_error: "Password is required!",
    }),
  }),
});

const updateUserValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    photo: z.string().optional(),
  }),
});

const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "oldPassword is required!",
    }),
    newPassword: z.string({
      required_error: "newPassword is required!",
    }),
  }),
});

const updateUserStatusValidation = z.object({
  body: z.object({
    status: z.enum(["ACTIVATE", "DEACTIVATE"]),
  }),
});

const updateUserRoleValidation = z.object({
  body: z.object({
    role: z.enum(["CUSTOMER", "ADMIN"]),
  }),
});

export const userValidation = {
  createUserValidation,
  loginUserValidation,
  updateUserValidation,
  updateUserStatusValidation,
  changePasswordValidation,
  updateUserRoleValidation,
};
