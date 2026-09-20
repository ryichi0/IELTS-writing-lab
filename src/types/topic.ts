import { TopicType } from "@/generated/prisma/enums";


export type Topic = {
  id: string;
  title: string;
  description: string;
  type: TopicType;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};