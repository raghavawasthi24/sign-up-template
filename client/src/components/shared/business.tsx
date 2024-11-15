"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { useEffect } from "react";

const FormSchema = z.object({
  accNum: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  ifsc: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bankName: z.string({
    message: "Can't be empty",
  }),
  bankHolderName: z.string().min(2, {
    message: "Wrong email format",
  }),
});

interface PersonalProps {
  handleNext: () => void;
  handleBack: () => void;
  formValues: any;
  setFormValues: any;
}

export const Account = ({ handleBack, handleNext, formValues, setFormValues }: PersonalProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: formValues
  });


  useEffect(() => {
    console.log("formValues", formValues
    );
  }, []
  );
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormValues({...formValues, ...data});
    handleNext();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-8"
      >
        <FormField
          control={form.control}
          name="accNum"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="John" className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ifsc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IFSC Code</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Doe" className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="999999"
                  type="number"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bankHolderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Holder Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="johndoe@email.com"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" onClick={handleBack} variant="secondary">
            Back
          </Button>
          <Button type="submit" className="self-end">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};
