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
import { FormValues } from "./hook-mutistep";

const FormSchema = z.object({
  accNum: z.string().min(2, {
    message: "Wrong account Number.",
  }),
  ifsc: z.string().min(10, {
    message: "Must be greater than 10.",
  }),
  bankName: z.string().min(2, {
    message: "Can't be empty.",
  }),
  bankHolderName: z.string().min(2, {
    message: "Enter your bank holder name.",
  }),
});

interface PersonalProps {
  handleNext: () => void;
  handleBack: () => void;
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

export const Account = ({
  handleBack,
  handleNext,
  formValues,
  setFormValues,
}: PersonalProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: formValues,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormValues({ ...formValues, ...data });
    handleNext();
  }

  return (
    <Form {...form}>
      <h3 className="font-bold text-center text-lg">Account Details</h3>

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
                <Input
                  {...field}
                  placeholder="0000"
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
          name="ifsc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IFSC Code</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="00000"
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
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="xyz" className="w-full" />
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
                <Input {...field} placeholder="xyz" className="w-full" />
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
