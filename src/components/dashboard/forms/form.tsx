"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { ZodSchema } from "zod";

type FieldType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "select"
  | "multiselect"
  | "radio"
  | "checkbox";

interface Option {
  label: string;
  value: string;
}

interface FieldConfig<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  label: string;
  type: FieldType;
  placeholder?: string;
  description?: string;
  options?: Option[];
}

interface CustomFormProps<TFormValues extends FieldValues> {
  schema: ZodSchema<TFormValues>;
  fields: FieldConfig<TFormValues>[];
  defaultValues: DefaultValues<TFormValues> | undefined;
  onSubmit: (values: TFormValues) => void;
}

export function CustomForm<TFormValues extends FieldValues>({
  schema,
  fields,
  defaultValues,
  onSubmit,
}: CustomFormProps<TFormValues>) {
  const form = useForm<TFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const renderField = (field: FieldConfig<TFormValues>) => {
    switch (field.type) {
      case "text":
        return (
          <Input
            type="text"
            placeholder={field.placeholder}
            {...form.register(field.name)}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            placeholder={field.placeholder}
            {...form.register(field.name, { valueAsNumber: true })}
          />
        );
      case "email":
      case "password":
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            {...form.register(field.name)}
          />
        );
      case "select":
        return (
          <Select
            onValueChange={(value) =>
              form.setValue(field.name, value as TFormValues[typeof field.name])
            }
            defaultValue={form.getValues(field.name) as string}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "multiselect":
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${field.name}-${option.value}`}
                  checked={(form.getValues(field.name) as string[])?.includes(
                    option.value
                  )}
                  onCheckedChange={(isChecked) => {
                    const currentValues =
                      (form.getValues(field.name) as string[]) || [];
                    const updatedValues = isChecked
                      ? [...currentValues, option.value]
                      : currentValues.filter((value) => value !== option.value);
                    form.setValue(
                      field.name,
                      updatedValues as TFormValues[typeof field.name]
                    );
                  }}
                />
                <label htmlFor={`${field.name}-${option.value}`}>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      case "radio":
        return (
          <RadioGroup
            onValueChange={(value) =>
              form.setValue(field.name, value as TFormValues[typeof field.name])
            }
            defaultValue={form.getValues(field.name) as string}
          >
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${field.name}-${option.value}`}
                />
                <label htmlFor={`${field.name}-${option.value}`}>
                  {option.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        );
      case "checkbox":
        return <Checkbox id={field.name} {...form.register(field.name)} />;
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={() => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>{renderField(field)}</FormControl>
                {field.description && (
                  <FormDescription>{field.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
