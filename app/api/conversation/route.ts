import {Ollama} from 'ollama';
import {NextResponse} from "next/server";


interface InstructionProps {
    role: string;
    content: string;
}



const ollama = new Ollama({host: process.env.OLLAMA_ENV});

export async function POST(
    req: Request
) {
    try {
        const body = await req.json();
        const { messages } = await body;

        const message = { role: "user", content: messages.join(' ') };

        if(!body) return new NextResponse("Bad Request", { status: 400 });
        if(!messages) return new NextResponse("Bad Request", { status: 400 });


        const response = await ollama.chat({
            model: "llama2",
            messages: [message],
            stream: true
        });


        let responseData =  "";
        for await (const partition of response) {
            responseData += partition.message.content
        }

        return NextResponse.json({ data: responseData });
    } catch (err) {
        console.log("[conversation Error: ", err);
        return new NextResponse("Internal Error", { status: 500})
    }
}