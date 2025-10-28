import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { STARTUP_VIEW_QUERY } from "@/sanity/lib/queries";
import { formatViewCount } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from "next/server";

const View = async ({id}: {id: string}) => {
    const { views: totalViews } = await client
        .withConfig({ useCdn: false }) // ← Bypass cache for real-time data
        .fetch(STARTUP_VIEW_QUERY, { id });

    // After is used to run code after the page has been rendered
    // Non-blocking: allows immediate user interaction while background tasks process
    after(async() => {
        await writeClient
            .patch(id)
            .set({ views: totalViews + 1 })
            .commit();
    })

    return(
        <div className="view-container">
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>

            <p className="view-text">
                <span className="font-black">{formatViewCount(totalViews)}</span>
            </p>
        </div>
    )
}

export default View;