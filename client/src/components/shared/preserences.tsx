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
import { useRouter } from "next/navigation";
import { FormValues } from "./hook-mutistep";
import { useState } from "react";

const FormSchema = z.object({
  relocation: z.string(),
  noticePeriod: z.string().min(2, {
    message: "Please enter notice period.",
  }),
  hearAboutUs: z.string({
    message: "Can't be empty",
  }),
  currentLocation: z.string().min(2, {
    message: "Enter your current location.",
  }),
});

interface PersonalProps {
  handleNext: () => void;
  handleBack: () => void;
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

export const Preferences = ({
  handleBack,
  formValues,
  setFormValues,
}: PersonalProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormValues({ ...formValues, ...data });
    setLoading(true);

    fetch("https://sign-up-template.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then(() => {
        router.push("/success");
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Form {...form}>
      <h3 className="font-bold text-center text-lg">Preferences</h3>

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
                    <SelectValue placeholder="Please Select" />
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
                <Input {...field} placeholder="" className="w-full" />
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
                <Input {...field} placeholder="" className="w-full" />
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
                <Input {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button
            type="button"
            onClick={handleBack}
            disabled={loading}
            variant="secondary"
          >
            Back
          </Button>
          <Button type="submit" className="self-end" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
