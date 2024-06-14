"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { shortenAddress } from "@/lib/utils";
import Image from "next/image";

export function PostCard({ post }: { post: any }) {
  console.log(post);
  return (
    <Card className="w-[450px] m-auto">
      <CardHeader>
        <div className="mt-4 flex gap-4 justify-between ">
          <div className=" flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${post.address}`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{shortenAddress(post.address)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {post.data.attachments &&
          post.data.attachments.map((attachment: string, index: number) => {
            return <Image key={index} src={attachment[1]} alt="Deploy" className="w-full rounded-md" width={350} height={200} />;
          })}
        <div className="mt-4">
          {post.data.hashtags && (
            <div className=" flex gap-2 mb-4">
              {post.data.hashtags.map((tag: string, index: number) => {
                return (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                );
              })}
            </div>
          )}

          <div>{post.data.content}</div>
        </div>
      </CardContent>
    </Card>
  );
}
