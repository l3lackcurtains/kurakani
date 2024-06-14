import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
// @ts-ignore
import { createCommit, postTemplate } from "alberti-protocol-sdk";
import axios from "axios";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

export function AddPost({ identity, getPosts }: { identity: any; getPosts: any }) {
  const [post, setPost] = useState<any>({
    message: "",
    hashtag: "",
    attachment: "",
  });

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-end">
          <Button className="my-8">Add Post to timeline</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Post to timeline</DialogTitle>
          <DialogDescription>Post your message to the timeline</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <label htmlFor="message">Message</label>
            <Textarea name="message" placeholder="Message" value={post.message} onChange={(e) => setPost({ ...post, message: e.target.value })} />
          </div>
          <div>
            <label htmlFor="hashtags">hashTags</label>
            <Input
              name="hashtags"
              type="text"
              placeholder="Hashtags separated by comma"
              value={post.hashtag}
              onChange={(e) => setPost({ ...post, hashtag: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="attachment">Attachment</label>
            <Input
              name="attachment"
              type="text"
              placeholder="Attachments separated by comma"
              value={post.attachment}
              onChange={(e) => setPost({ ...post, attachment: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              const attachmentsArray: any = [];

              const attachments = post.attachment.split(",");

              attachments.forEach((attachment: string) => {
                attachmentsArray.push(["img", `https://ipfs.io/ipfs/${attachment}`]);
              });
              post.hashtags = post.hashtag.split(",");

              const postxx = postTemplate(post.message, post.hashtags, attachmentsArray);
              console.log(postxx);
              const commit = createCommit(identity.privateKey, postxx, "post");
              console.log(commit);

              try {
                await axios.post(`/api/create-commit`, commit);
                getPosts();
                setOpen(false);
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Post to timeline
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
