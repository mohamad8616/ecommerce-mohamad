import React, { useActionState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/app/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";

import { toast } from "sonner";
import { Input } from "../ui/CustomInput";
import { updatePassword } from "@/lib/actions";

const updatePassSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "رمز عبور باید 6 رقم و بیشتر باشد")
      .max(100, "رمز عبور بسیار طولانی است"),
    currentPassword: z
      .string()
      .min(6, "رمز عبور باید 6 رقم و بیشتر باشد")
      .max(100, "رمز عبور بسیار طولانی است"),
    confirmNewPassword: z
      .string()
      .min(6, "رمز عبور باید 6 رقم و بیشتر باشد")
      .max(100, "رمز عبور بسیار طولانی است"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "رمزهای عبور مطابقت ندارند",
    path: ["confirmNewPassword"],
  });
const UpdatePassword = () => {
  const [state, formAction] = useActionState(updatePassword, {
    error: null,
    success: false,
  });

  const form = useForm({
    resolver: zodResolver(updatePassSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof updatePassSchema>> = async (
    data,
  ) => {
    const formData = new FormData();
    formData.append("currentPassword", data.currentPassword);
    formData.append("newPassword", data.newPassword);
    formData.append("confirmNewPassword", data.confirmNewPassword);

    await formAction(formData);
  };

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast("موفق", {
          description: "تغییرات با موفقیت اعمال شدند",
          position: "top-center",
          classNames: {
            content: "flex flex-col gap-2",
          },
          style: {
            "--border-radius": "calc(var(--radius)  + 4px)",
          } as React.CSSProperties,
        });
        form.reset();
      } else if (state.error) {
        toast("خطا", {
          description: state.error,
          position: "top-center",
          classNames: {
            content: "flex flex-col gap-2",
          },
          style: {
            "--border-radius": "calc(var(--radius)  + 4px)",
          } as React.CSSProperties,
        });
      }
    }
  }, [state, form]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 rounded border-2 p-1 text-sm md:p-4 md:text-lg"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel> رمز عبور فعلی</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="رمز عبور فعلی"
                  {...field}
                  disabled={
                    form.formState.isSubmitting ||
                    form.formState.isSubmitSuccessful
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رمز عبور جدید</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  placeholder="رمز عبور جدید"
                  disabled={
                    form.formState.isSubmitting ||
                    form.formState.isSubmitSuccessful
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel> تایید رمز عبور جدید</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  placeholder="تایید رمز عبور جدید "
                  disabled={
                    form.formState.isSubmitting ||
                    form.formState.isSubmitSuccessful
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={
            !form.formState.isValid ||
            form.formState.isSubmitting ||
            form.formState.isSubmitSuccessful
          }
        >
          {form.formState.isSubmitSuccessful
            ? "اعمال شد"
            : form.formState.isSubmitting
              ? "در حال ذخیره..."
              : "ذخیره تغییرات"}
        </Button>
      </form>
    </Form>
  );
};

export default UpdatePassword;
