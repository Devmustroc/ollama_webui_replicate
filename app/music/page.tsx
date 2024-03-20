'use client';

import React from 'react';
import { MusicIcon } from "lucide-react";
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


const MusicPage = () => {
    const modalPro = useModalPro();
    const router = useRouter();
    const [music, setMusic] = React.useState<string>();

    const form = useForm<zo.infer <typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: zo.infer<typeof formSchema>) => {
        try {
            setMusic(undefined);

            const response = await axios.post("/api/music", values);

            setMusic(response.data.audio);

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
                title='Music'
                description="Generate music with our most advanced AI"
                icon={MusicIcon}
                iconColor="text-sky-700"
                bgColor="bg-sky-700/10"
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
                                                    placeholder="Hip Hop type beat"
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
                    { !music && !isLoading && (
                        <Empty label="No Music generated"/>
                    )}
                    {
                        music && (
                                <audio controls
                                       className="w-full mt-8"
                                >
                                    <source src={music}/>
                                </audio>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default MusicPage;