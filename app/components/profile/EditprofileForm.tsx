import React from "react";
import { Button } from "@/app/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { updateProfile } from "@/lib/actions";
import { useEffect } from "react";
import { toast } from "sonner";
import { EditProf } from "./EditProfileSheet";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "نام و نام خانوادگی باید حداقل 4 کاراکتر باشد.",
  }),
  image: z.string().url({
    message: "لینک تصویر نامعتبر است.",
  }),
});

const EditprofileForm = ({ user }: { user: EditProf }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name,
      image: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);

    const updateProfileWithId = updateProfile.bind(null, user.userId);
    await updateProfileWithId(formData);
    form.reset();
  };

  useEffect(() => {
    if (form.formState.isSubmitSuccessful)
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
  }, [form.formState.isSubmitting]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 rounded border-2 p-1 text-sm md:p-4 md:text-lg"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام و نام خانوادگی</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>لینک تصویر</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  {...field}
                  placeholder="example.com/avatar.jpg"
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
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </Button>
      </form>
    </Form>
  );
};

export default EditprofileForm;
