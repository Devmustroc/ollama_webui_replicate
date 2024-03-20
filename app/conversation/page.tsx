'use client';

import React from 'react';
import { MessageSquareIcon}  from "lucide-react";
import Heading from "../../components/heading";
import {useForm} from "react-hook-form";
import * as zo from 'zod';
import { formSchema} from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import axios from "axios";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import {cn} from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import Markdown from "react-markdown";
import {useModalPro} from "@/hooks/use-modalpro";

const ConversationPage = () => {
    const modalPro = useModalPro();
    const router = useRouter();
    const [messages, setMessages] = React.useState<Array<{ role: string, content: string }>>([]);

    const form = useForm<zo.infer <typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: zo.infer<typeof formSchema>) => {
        try {
            const userMessage = { role: "user", content: values.prompt };

            const response = await axios.post("/api/conversation", {
                messages: [userMessage.content]
            });

            const assistantMessage = { role: 'assistant', content: response.data.data };

            setMessages((curr) => [...curr, userMessage, assistantMessage]);

            form.reset();

        } catch (error: any) {
            if (error?.response?.status === 403) {
                modalPro.onOpen()
            }
        } finally {
            router.refresh()
        }
    }

    return (
        <div>
            <Heading
                title='Conversation'
                description="Our Most advanced Model for conversation"
                icon={MessageSquareIcon}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <div
                className="px-4 lg:px-8"
            >
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                              className="roundedlg border w-full p-4 px-3 md:px-6 focus-within:shadow-md
                                grid grid-cols-12 gap-2 rounded-lg bg-white border-gray-200
                            "
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => {
                                    return (
                                        <FormItem
                                            className='col-span-12 lg:col-span-10'
                                        >
                                            <FormControl
                                                className="m-0 p-0"
                                            >
                                                <Input
                                                    className='border-0 outline-none focus-visible:ring-0
                                                     focus-visible:ring-offset-0 focus-visible:ring-transparent'
                                                    disabled={isLoading}
                                                    placeholder="What's is React Hooks"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )
                                }}
                            />
                            <Button
                                className="col-span-12 lg:col-span-2 w-full"
                                disabled={isLoading}
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div
                    className="space-y-4 mt-4"
                >
                    {
                        isLoading && (
                            <div
                                className="p-8 rounded-lg w-full items-center justify-center flex bg-muted gap-x-4"
                            >
                                <Loader />
                            </div>
                        )
                    }
                    { messages.length === 0&& !isLoading && (
                        <Empty label="No Chat Founded"/>
                    )}
                    <div
                        className="flex flex-col-reverse gap-4"
                    >
                        {
                            messages.map((message) => (
                                <div key={message.content}
                                     className={cn(`
                                        p-8 w-full flex items-start gap-x- 8 rounded-lg gap-x-4
                                     `, message.role === "user" ? "bg-emerald-500/10 border border-black/10" : "bg-slate-600/10 border border-muted/10"
                                     )}
                                >
                                    {message.role === "user" ?
                                        (
                                            <div
                                                className="flex flex-row justify-between gap-5 w-full items-center"
                                            >
                                            <UserAvatar/>
                                                <p
                                                    className="text-sm w-full start font-semibold"
                                                >
                                                    {message.content}
                                                </p>
                                            </div>
                                        ) : (
                                            <div
                                                className="flex flex-row justify-between gap-5 w-full items-center"
                                            >

                                                <BotAvatar/>
                                                <Markdown
                                                    className="text-sm w-full items-end"
                                                >
                                                    {message.content.split('.\n').join('.\n\n')}
                                                </Markdown>
                                            </div>
                                        )}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationPage;