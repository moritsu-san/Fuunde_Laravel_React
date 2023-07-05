import * as z from "zod";

export const registerSchema = z
    .object({
        name: z.string().max(15, { message: "15文字以下にしてください。" }),
        email: z
            .string()
            .email({ message: "メールアドレス形式ではありません。" }),
        password: z
            .string()
            .min(8, { message: "8文字以上入力する必要があります。" })
            .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i, {
                message: "パスワードは半角英数字混合で入力してください。",
            }),
        password_confirmation: z
            .string()
            .min(1, { message: "確認用のパスワードを入力してください。" }),
    })
    .refine(({ password, password_confirmation }) => password === password_confirmation, {
        path: ["password_confirmation"],
        message: "パスワードが一致しません。",
    });
