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
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
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
import { toast } from "sonner";

import IconDragAndDrop from "@/assets/images/icon-drag-and-drop.svg";

import IconLink from "@/assets/images/icon-link.svg";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Fragment } from "react";

export default function LinksForm({
  form,
}: {
  form: UseFormReturn<z.infer<typeof linksFormSchema>>;
}) {
  const watchedLinkFields = form.watch("links");

  const {
    fields: linkFields,
    append,
    remove,
  } = useFieldArray({
    name: "links",
    control: form.control,
  });

  function handleAddLink() {
    const selectedPlatforms = linkFields.map((field) => field.platform);
    const availablePlatforms = platforms.filter(
      (platform) => !selectedPlatforms.includes(platform.id),
    );

    if (availablePlatforms.length === 0) {
      toast.error("No more available platforms");
      return;
    }

    append({ platform: availablePlatforms[0].id, url: "" });
  }

  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;

    const items = [...watchedLinkFields];
    const [reorderedLink] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedLink);
    form.setValue("links", items);
    form.clearErrors();
  }

  return (
    <div className="space-y-3">
      <div className="space-y-6">
        <div className="flex flex-col">
          <Button variant="outline" type="button" onClick={handleAddLink}>
            + Add new link
          </Button>
        </div>

        {linkFields.length === 0 && (
          <Card className="bg-accent">
            <CardHeader className="gap-6 text-center md:gap-10">
              <div className="flex justify-center">
                <Image
                  className="w-[7.75rem] md:w-[15.625rem]"
                  src={EmptyIllustration}
                  alt="Empty illustration"
                />
              </div>
              <div className="mx-auto flex max-w-[30.5rem] flex-col gap-6">
                <CardTitle>Let&apos;s get you started</CardTitle>
                <CardDescription>
                  Use the “Add new link” button to get started. Once you have
                  more than one link, you can reorder and edit them. We’re here
                  to help you share your profiles with everyone!
                </CardDescription>
              </div>
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
                              <div className="flex items-center">
                                <div
                                  className="flex h-6 items-center pr-2"
                                  {...provided.dragHandleProps}
                                >
                                  <Image
                                    src={IconDragAndDrop}
                                    alt="Drag and drop icon"
                                  />
                                </div>
                                <span className="font-bold">
                                  Link #{idx + 1}
                                </span>
                              </div>
                              <div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  className="text-card-foreground"
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
                                      <SelectContent className="group px-4 py-3">
                                        {platforms.map((platform, index) => {
                                          const Icon = platform.icon;

                                          return (
                                            <Fragment key={platform.id}>
                                              <SelectItem
                                                value={platform.id}
                                                className="py-3"
                                                disabled={
                                                  !!linkFields.find(
                                                    (field) =>
                                                      field.platform ===
                                                      platform.id,
                                                  )
                                                }
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
                                              {index + 1 < platforms.length && (
                                                <SelectSeparator />
                                              )}
                                            </Fragment>
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
                                            type="url"
                                            list="defaultURLs"
                                            {...field}
                                            placeholder={`e.g. ${platformUrl}johnappleseed`}
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

      <datalist id="defaultURLs">
        {platforms.map((platform) => (
          <option
            key={platform.id}
            value={platform.url}
            label={platform.title}
          />
        ))}
      </datalist>
    </div>
  );
}
