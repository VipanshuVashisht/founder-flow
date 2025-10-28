import "server-only";

import { defineLive } from "next-sanity/live";
import { client } from "@/sanity/lib/client";

export const { sanityFetch, SanityLive } = defineLive({ client });