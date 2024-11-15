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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect } from "react";

const FormSchema = z.object({
  relocation: z.string({
    message: "Username must be at least 2 characters.",
  }),
  noticePeriod: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  hearAboutUs: z.string({
    message: "Can't be empty",
  }),
  currentLocation: z.string().min(2, {
    message: "Wrong email format",
  }),
});

interface PersonalProps {
  handleNext: () => void;
  handleBack: () => void;
  formValues: any;
  setFormValues: any;
}

export const Preferences = ({
  handleBack,
  handleNext,
  formValues,
  setFormValues,
}: PersonalProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    console.log("formValues", formValues);
  }, []);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormValues({ ...formValues, ...data });

    fetch("http://localhost:5001/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err
        ));
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
          name="relocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Are u willing to relocate?</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="noticePeriod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your notice period?</FormLabel>
              <FormControl>
                <Input {...field} placeholder="John" className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hearAboutUs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Where did you hear about us?</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Doe" className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currentLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Where are you currently residing?</FormLabel>
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
