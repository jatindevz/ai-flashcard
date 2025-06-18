//src/app/api/fetchdata/route.ts

import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const {prompt } = await request.json()


    if (!prompt) {
        return NextResponse.json({ message: "Prompt is required" }, { status: 400 });
    }
    
    if (!process.env.FLASHCARD_AI_KEY) {
        return NextResponse.json({ message: "API key not configured" }, { status: 500 });
    }
    
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.FLASHCARD_AI_KEY}`,
                "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
                "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-chat-v3-0324:free",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            return new NextResponse(`Error: ${response.status} - ${errorText}`, { status: response.status });
        }

        const data = await response.json();
        const assistantMessage = data.choices[0]?.message?.content;
        console.log(assistantMessage);
        

        return NextResponse.json({ message: assistantMessage }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });

    }

}