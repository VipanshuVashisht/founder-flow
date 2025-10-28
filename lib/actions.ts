"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
    state: any, 
    form: FormData, 
    pitch: string
) => {
    const session = await auth();

    if(!session){
        // parseServerActionResponse(utility function): Creates a deep clone of the response object using JSON serialization.
        // This ensures the original object remains unchanged and prevents accidental mutations
        // The original response cannot be modified by reference
        return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR",
        })
    }

    // Extract all form fields EXCEPT 'pitch' since it's already available
    // Converts FormData to array of [key, value] pairs
    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter( ([key]) => key !== 'pitch' )
    )

    const slug = slugify(title as string, {lower: true, strict: true})

    try{
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                _type: "reference",
                _ref: session?.id,
            },
            pitch,
        }

        const result = await writeClient.create({ _type: 'startup', ...startup })

        return parseServerActionResponse({
            ...result,
            error: "",
            status: "SUCCESS",
        })
    } catch(error){
        console.log(error);

        return parseServerActionResponse({
            error: JSON.stringify(error), 
            status: "Error" 
        });
    }
}