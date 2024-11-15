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
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormValues } from "./hook-mutistep";

const FormSchema = z.object({
  firstName: z.string()
    .min(2, { message: "First name must be at least 2 characters long." })
    .max(50, { message: "First name must be 50 characters or fewer." }),
  
  lastName: z.string()
    .min(2, { message: "Last name must be at least 2 characters long." })
    .max(50, { message: "Last name must be 50 characters or fewer." }),
  
  dob: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      return new Date(arg);
    }
  }, z.date({ message: "Please provide a valid date of birth." })),
  
  email: z.string()
    .email({ message: "Please enter a valid email address." })
    .max(100, { message: "Email must be 100 characters or fewer." }),
  
  phoneNo: z.string()
    .length(10, { message: "Phone number must be exactly 10 digits." })
    .regex(/^[0-9]+$/, { message: "Phone number must contain only numbers." })
});



interface PersonalProps {
  handleNext: () => void;
  formValues: FormValues,
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>
}

export const Personal = ({ handleNext,formValues, setFormValues  }: PersonalProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: formValues
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormValues({...formValues, ...data});
    handleNext();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-8">
        
        <h3 className="font-bold text-center text-lg">Personal Details</h3>
        <div className="flex justify-between gap-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John" className="w-[240px]"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Doe"  className="w-[240px]"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between items-center gap-8">
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone No</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="999999" type="number"  className="w-[240px]"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="johndoe@email.com"  className="w-[240px]"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="self-end">Next</Button>
      </form>
    </Form>
  );
};
