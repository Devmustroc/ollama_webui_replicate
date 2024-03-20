import { Configuration, OpenAIApi } from "openai";
import {NextResponse} from "next/server";


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
export async function POST(
    req: Request
) {
    try {
        const body = await req.json();
        const { prompt, amount = 1, resolution = "512x512"} = await body;

        if(!body) return new NextResponse("Bad Request", { status: 400 });
        if(!prompt) return new NextResponse("Prompt is Required", { status: 400 });
        if(!amount) return new NextResponse("Amount is Required", { status: 400 });
        if(!resolution) return new NextResponse("resolution is Required", { status: 400 });

        const response = await openai.createImage({
            prompt,
            n: parseInt(amount, 10),
            size: resolution
        })


        return NextResponse.json(response.data.data, { status: 200 });
    } catch (err) {
        console.log("[Image Error: ", err);
        return new NextResponse("Internal Error", { status: 500})
    }
}