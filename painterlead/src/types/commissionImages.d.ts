import { StaticImageData } from "next/image";

export type commissionImages = {
  sort: number;
  id: string;
  src: StaticImageData; //must change to src for s3 url in the future
};
