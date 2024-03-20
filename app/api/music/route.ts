import {NextResponse} from "next/server";
import Replicate from "replicate";



const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
});

export async function POST(
    req: Request
) {
    try {
        const body = await req.json();
        const { prompt } = await body;


        if(!body) return new NextResponse("Bad Request", { status: 400 });
        if(!prompt) return new NextResponse("Bad Request", { status: 400 });



        const input = {
            prompt_b: prompt,
        };

        const output = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
                input
            });

        return NextResponse.json(output, { status: 200 });
    } catch (err) {
        console.log("[Music Error: ", err);
        return new NextResponse("Music Error", { status: 500})
    }
}