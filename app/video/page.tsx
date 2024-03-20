'use client';

import React from 'react';
import {VideoIcon} from "lucide-react";
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
import Heading from "@/components/heading";
import {useModalPro} from "@/hooks/use-modalpro";


const VideoPage = () => {
    const  modalPro = useModalPro();
    const router = useRouter();
    const [video, setVideo] = React.useState<string>();

    const form = useForm<zo.infer <typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: zo.infer<typeof formSchema>) => {
        try {
            setVideo(undefined);

            const response = await axios.post("/api/video", values);

            setVideo(response.data[0]);

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
                title='Video'
                description="Generate video using our AI"
                icon={VideoIcon}
                iconColor="text-orange-700"
                bgColor="bg-orange-700/10"
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
                                                    placeholder="Dog playing with cat"
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
                    { !video && !isLoading && (
                        <Empty label="No Video generated"/>
                    )}
                    {
                        video && (
                                <video
                                    className="w-full aspect-video mt-8 rounded-lg border bg-slate-900" controls
                                >
                                    <source src={video} />
                                </video>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default VideoPage;