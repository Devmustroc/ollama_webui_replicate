'use client';

import React, {useState} from 'react';
import Heading from "../../components/heading";
import {useForm} from "react-hook-form";
import * as zo from 'zod';
import {amountOptions, formSchema, resolutionOptions} from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import axios from "axios";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import {DownloadIcon, ImageIcon} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Card, CardFooter} from "@/components/ui/card";
import Image from "next/image";
import {useModalPro} from "@/hooks/use-modalpro";

const ImagePage = () => {
    const modalPro = useModalPro();
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);

    const form = useForm<zo.infer <typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: '1',
            resolution: "512x512",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: zo.infer<typeof formSchema>) => {
        try {
            setImages([]);
            const response = await axios.post(`/api/image`, values);

            const urls = response.data.map((image: { url: string}) => image.url);
            setImages(urls)

            form.reset()
        } catch (error: any) {
            if (error?.response?.status === 403) {
                modalPro.onOpen();
            }
        } finally {
            router.refresh()
        }
    }

    return (
        <div>
            <Heading
                title='Images'
                description="Imagine your own image with the most powerful AI Model"
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
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
                                            className='col-span-12 lg:col-span-6'
                                        >
                                            <FormControl
                                                className="m-0 p-0"
                                            >
                                                <Input
                                                    className='border-0 outline-none focus-visible:ring-0
                                                     focus-visible:ring-offset-0 focus-visible:ring-transparent'
                                                    disabled={isLoading}
                                                    placeholder="A picture of dolphin jumping out of the water"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem
                                        className="col-span-12 lg:col-span-2"
                                    >
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    amountOptions.map((option) => {
                                                        return (
                                                            <SelectItem value={option.value} key={option.value}>
                                                                {option.value}
                                                            </SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="resolution"
                                render={({ field }) => (
                                    <FormItem
                                        className="col-span-12 lg:col-span-2"
                                    >
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    resolutionOptions.map((option) => {
                                                        return (
                                                            <SelectItem value={option.value} key={option.value}>
                                                                {option.value}
                                                            </SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
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
                                className="p-20"
                            >
                                <Loader />
                            </div>
                        )
                    }
                    { images.length === 0 && !isLoading && (
                        <Empty label="No Images Founded"/>
                    )}
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8"
                    >
                        {
                            images.map((src) => (
                                <Card
                                    key={src}
                                    className="rounded-lg overflow-hidden"
                                >
                                    <div
                                        className="relative aspect-square"
                                    >
                                        <Image alt="image" src={src} layout="fill" objectFit="cover" />
                                    </div>
                                    <CardFooter
                                        className="p-2"
                                    >
                                        <Button
                                            onClick={() => window.open(src, "_blank")}
                                            variant="secondary"
                                            className="w-full"
                                        >
                                            <DownloadIcon
                                                className="h-4 w-4 mr-2"
                                            />
                                            Download
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImagePage;