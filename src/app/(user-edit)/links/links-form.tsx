"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import EmptyIllustration from "@/assets/images/illustration-empty.svg";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { platforms } from "@/data/platforms";

const linksFormSchema = z.object({
  links: z.array(
    z.object({
      platform: z
        .string()
        .refine((value) =>
          platforms.map((platform) => platform.id).includes(value),
        ),
      // TODO: Add URL validation
      url: z.string().min(1, "Can't be empty"),
    }),
  ),
});

export default function LinksForm() {
  const form = useForm<z.infer<typeof linksFormSchema>>({
    resolver: zodResolver(linksFormSchema),
    defaultValues: {
      // links: [{ platform: "github", url: "https://www.github.com" }],
    },
  });

  const {
    fields: linkFields,
    append,
    remove,
  } = useFieldArray({
    name: "links",
    control: form.control,
  });

  function handleSubmit(data: z.infer<typeof linksFormSchema>) {
    console.log({ data });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <div className="space-y-6">
          <div className="flex flex-col">
            <Button
              variant="outline"
              type="button"
              onClick={() => append({ platform: platforms[0].id, url: "" })}
            >
              + Add new link
            </Button>
          </div>

          {linkFields.length === 0 && (
            <Card className="bg-accent">
              <CardHeader className="text-center">
                <div className="flex justify-center">
                  <Image
                    className="w-[124px]"
                    src={EmptyIllustration}
                    alt="Empty illustration"
                  />
                </div>
                <CardTitle>Let's get you started</CardTitle>
                <CardDescription>
                  Use the “Add new link” button to get started. Once you have
                  more than one link, you can reorder and edit them. We’re here
                  to help you share your profiles with everyone!
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          {linkFields.length > 0 && (
            <ul className="space-y-6">
              {linkFields.map((linkField, idx) => (
                <li key={linkField.id}>
                  <Card className="bg-accent">
                    <CardHeader className="flex-row justify-between">
                      <div>Link #{idx + 1}</div>
                      <div>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => remove(idx)}
                        >
                          Remove
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name={`links.${idx}.platform`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Platform</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={platforms[0].id}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {platforms.map((platform) => (
                                  <SelectItem
                                    key={platform.id}
                                    value={platform.id}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div>
                                        <img src={platform.icon} alt="" />
                                      </div>
                                      <div>{platform.title}</div>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`links.${idx}.url`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Link</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={`e.g. ${platforms[0].url}/test`}
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col">
          <Button>Save</Button>
        </div>
      </form>
    </Form>
  );
}
