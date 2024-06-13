"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCommit, createIdentity, postTemplate } from "@albertiprotocol/sdk";
import axios from "axios";
import { useEffect, useState } from "react";
const EthCrypto = require("eth-crypto");

const SERVER_URL = "http://localhost:3200";

export default function Home() {
  const [key, setKey] = useState<string>("");
  const [identity, setIdentity] = useState<any>(null);

  const [post, setPost] = useState<any>({
    message: "",
    hashtag: "",
    attachment: "",
  });

  useEffect(() => {
    const identityString = localStorage.getItem("identity");
    if (identityString) {
      const identity = JSON.parse(identityString);
      setIdentity(identity);
    }
  }, []);

  if (identity) {
    return (
      <main className="container max-w-4xl my-24">
        <div className="mt-8">
          <p>Address: {identity.address}</p>
          <p>Public Key: {identity.publicKey}</p>
          <p>Private Key: {identity.privateKey}</p>
        </div>

        <div className="mt-8">
          <h2>Post into timeline</h2>

          <div>
            <label htmlFor="message">Message</label>
            <Textarea name="message" placeholder="Message" value={post.message} onChange={(e) => setPost({ ...post, message: e.target.value })} />
          </div>
          <div>
            <label htmlFor="hashtags">hashTags</label>
            <Input
              name="hashtags"
              type="text"
              placeholder="Hashtag"
              value={post.hashtag}
              onChange={(e) => setPost({ ...post, hashtag: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="attachment">Attachment</label>
            <Input
              name="attachment"
              type="text"
              placeholder="Attachment"
              value={post.attachment}
              onChange={(e) => setPost({ ...post, attachment: e.target.value })}
            />
          </div>
          <Button
            onClick={async () => {
              post.attachments = [["img", `https://ipfs.io/ipfs/${post.attachment}`]];
              post.hashtags = [post.hashtag];

              const postxx = postTemplate(post.message, post.hashtags, post.attachments);

              const commit = createCommit(identity.privateKey, JSON.stringify(postxx), "post");
              try {
                const response = await axios.post(`${SERVER_URL}/commit`, commit);
                console.log(response.data);
                alert("Post created, id: " + response.data.id);
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Submit
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="container max-w-4xl my-24 flex">
      <div className="flex-1">
        <form>
          <h2>Import key</h2>
          <Input type="key" placeholder="Key" value={key} onChange={(e) => setKey(e.target.value)} />
          <Button onClick={() => {}}>Upload Identity</Button>
        </form>
        <h2>Create new identity</h2>
        <Button
          onClick={() => {
            const identity = createIdentity();
            setIdentity(identity);
            localStorage.setItem("identity", JSON.stringify(identity));
          }}
          className="mt-4"
        >
          Create Identity
        </Button>
      </div>
    </main>
  );
}
