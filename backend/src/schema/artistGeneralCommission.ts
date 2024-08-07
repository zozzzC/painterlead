import { array, z } from "zod";

const Status = ["OPEN", "WAITLIST", "CLOSED"]

export const ArtistGeneralCommissionSchema = z.object({ 
    name: z.string({
        required_error: "Commission name is required",
    }),
    artistId: z.number(),
    blurb: z.string().max(100).optional(),
    description: z.string().max(500),
    // status: z.enum(Status)
})