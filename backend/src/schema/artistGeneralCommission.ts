import { array, z } from "zod";

const Status = ["OPEN", "WAITLIST", "CLOSED"]

export const ArtistGeneralCommissionSchema = z.object({ 
    name: z.string({
        required_error: "Commission name is required",
    }),
    artistId: z.number({
        required_error: "ArtistId is required",
    }),
    blurb: z.string().max(100).optional(),
    description: z.string().max(500),
    mainTagId: z.number({
        required_error: "MainTagId is required"
    })
    // status: z.enum(Status)
})