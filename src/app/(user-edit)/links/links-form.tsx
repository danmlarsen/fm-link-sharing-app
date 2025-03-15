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
  FormMessage,
} from "@/components/ui/form";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

import { platforms } from "@/data/platforms";
import { linksFormSchema } from "@/validation/profile";
import { TLink } from "@/types/profile";
import { saveLinks } from "./actions";
import { useAuth } from "@/context/auth";

import { toast } from "sonner";

import IconSaved from "@/assets/images/icon-changes-saved.svg";
import IconDragAndDrop from "@/assets/images/icon-drag-and-drop.svg";
import IconInput from "@/components/ui/icon-input";

import IconLink from "@/assets/images/icon-link.svg";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function LinksForm({
  form,
}: {
  form: UseFormReturn<z.infer<typeof linksFormSchema>>;
}) {
  const auth = useAuth();

  const watchedLinkFields = form.watch("links");

  const {
    fields: linkFields,
    append,
    remove,
  } = useFieldArray({
    name: "links",
    control: form.control,
  });

  async function handleSubmit(data: z.infer<typeof linksFormSchema>) {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      return;
    }

    const response = await saveLinks({ links: data.links, token });

    if (!!response?.error) {
      console.log("Error!", response.message);
      return;
    }

    toast(
      <div className="flex items-center gap-2.5">
        <Image src={IconSaved} alt="Saved icon" />
        <span>Your changes have been successfully saved!</span>
      </div>,
    );
  }

  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;

    const items = [...watchedLinkFields];
    const [reorderedLink] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedLink);
    form.setValue("links", items);
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
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="links-dragdrop" direction="vertical">
                {(provided) => (
                  <ul
                    className="space-y-6"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {linkFields.map((linkField, idx) => (
                      <Draggable
                        key={linkField.id}
                        draggableId={linkField.id}
                        index={idx}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <Card className="bg-accent">
                              <CardHeader className="flex-row justify-between">
                                <div className="flex items-center gap-2">
                                  <button
                                    className="h-6"
                                    type="button"
                                    {...provided.dragHandleProps}
                                  >
                                    <Image
                                      src={IconDragAndDrop}
                                      alt="Drag and drop icon"
                                    />
                                  </button>
                                  <span className="font-bold">
                                    Link #{idx + 1}
                                  </span>
                                </div>
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
                              <CardContent className="space-y-3">
                                <FormField
                                  control={form.control}
                                  name={`links.${idx}.platform`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Platform</FormLabel>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="group">
                                          {platforms.map((platform) => {
                                            const Icon = platform.icon;

                                            return (
                                              <SelectItem
                                                key={platform.id}
                                                value={platform.id}
                                              >
                                                <div
                                                  className={cn(
                                                    "flex items-center gap-3",
                                                    field.value ===
                                                      platform.id &&
                                                      "group-data-[state=open]:text-primary",
                                                  )}
                                                >
                                                  <div>
                                                    <Icon
                                                      className={cn(
                                                        "text-muted-foreground",
                                                        field.value ===
                                                          platform.id &&
                                                          "group-data-[state=open]:text-primary",
                                                      )}
                                                    />
                                                  </div>
                                                  <div>{platform.title}</div>
                                                </div>
                                              </SelectItem>
                                            );
                                          })}
                                        </SelectContent>
                                      </Select>
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`links.${idx}.url`}
                                  render={({ field }) => {
                                    const selectedPlatform = form.getValues(
                                      `links.${idx}.platform`,
                                    );
                                    const platformUrl =
                                      platforms.find(
                                        (platform) =>
                                          platform.id === selectedPlatform,
                                      )?.url || "";

                                    return (
                                      <FormItem>
                                        <FormLabel>Link</FormLabel>
                                        <div className="relative">
                                          <FormControl>
                                            <Input
                                              {...field}
                                              placeholder={`e.g. ${platformUrl}/johnappleseed`}
                                              className="pl-10"
                                            />
                                          </FormControl>
                                          <Image
                                            src={IconLink}
                                            alt="test"
                                            className="absolute top-1/2 left-4 -translate-y-1/2"
                                          />
                                          <FormMessage className="absolute top-1/2 right-4 hidden -translate-y-1/2 md:block" />
                                        </div>
                                        <FormMessage className="md:hidden" />
                                      </FormItem>
                                    );
                                  }}
                                />
                              </CardContent>
                            </Card>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>

        <div className="flex flex-col">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
