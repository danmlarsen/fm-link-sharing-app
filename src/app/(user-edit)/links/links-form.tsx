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
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import IconSaved from "@/assets/images/icon-changes-saved.svg";
import IconDragAndDrop from "@/assets/images/icon-drag-and-drop.svg";
import IconInput from "@/components/ui/icon-input";

import IconLink from "@/assets/images/icon-link.svg";

export default function LinksForm({ linksData }: { linksData: TLink[] }) {
  const auth = useAuth();

  const form = useForm<z.infer<typeof linksFormSchema>>({
    resolver: zodResolver(linksFormSchema),
    defaultValues: {
      // links: [{ platform: "github", url: "https://www.github.com" }],
      links: linksData,
    },
    mode: "onChange",
  });

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
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <Card className="bg-accent">
                              <CardHeader className="flex-row justify-between">
                                <div className="flex items-center gap-2">
                                  <Image
                                    src={IconDragAndDrop}
                                    alt="Drag and drop icon"
                                  />
                                  <span>Link #{idx + 1}</span>
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
                                        <SelectContent>
                                          {platforms.map((platform) => {
                                            const Icon = platform.icon;

                                            return (
                                              <SelectItem
                                                key={platform.id}
                                                value={platform.id}
                                              >
                                                <div className="flex items-center gap-3">
                                                  <div>
                                                    <Icon className="text-current" />
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
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Link</FormLabel>
                                      <FormControl>
                                        <IconInput
                                          {...field}
                                          placeholder={`e.g. ${platforms[0].url}/test`}
                                          icon={
                                            <Image
                                              src={IconLink}
                                              alt="Link icon"
                                            />
                                          }
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
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
          <Button>Save</Button>
        </div>
      </form>
    </Form>
  );
}
