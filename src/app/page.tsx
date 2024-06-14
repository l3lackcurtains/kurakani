/* eslint-disable @next/next/no-img-element */
"use client";
import { AddPost } from "@/components/AddPost";
import { HeaderBox } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SERVER_URL } from "@/lib/utils";
// @ts-ignore
import { createIdentity } from "alberti-protocol-sdk";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [key, setKey] = useState<string>("");
  const [identity, setIdentity] = useState<any>(null);

  const [post, setPost] = useState<any>({
    message: "",
    hashtag: "",
    attachment: "",
  });

  const [userPosts, setUserPosts] = useState<any[]>([]);

  async function getPosts() {
    try {
      const response = await axios.get(`${SERVER_URL}/commits/0`);
      const uPosts = [];
      for (let i = 0; i < response.data.length; i++) {
        uPosts.push(response.data[i]);
      }
      setUserPosts(uPosts);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const identityString = localStorage.getItem("identity");
    if (identityString) {
      const identity = JSON.parse(identityString);
      setIdentity(identity);
    }
    getPosts();
  }, []);

  if (identity) {
    return (
      <main className="container max-w-2xl my-24">
        <HeaderBox identity={identity} />
        <AddPost identity={identity} getPosts={getPosts} />
        <div className="mt-8">
          {userPosts.map((post, index) => {
            return (
              <div key={index} className="mt-8">
                <PostCard post={post} />
              </div>
            );
          })}
        </div>
      </main>
    );
  }

  return (
    <main className="container max-w-2xl my-24 flex">
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
