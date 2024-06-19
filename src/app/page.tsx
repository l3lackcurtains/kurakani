/* eslint-disable @next/next/no-img-element */
"use client";
import { AddPost } from "@/components/AddPost";
import { HeaderBox } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// @ts-ignore
import { createIdentity } from "alberti-protocol-sdk";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [key, setKey] = useState<string>("");
  const [identity, setIdentity] = useState<any>(null);

  const [userPosts, setUserPosts] = useState<any[]>([]);

  async function getPosts() {
    try {
      const response = await axios.get(`/api/commits`);
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
        <Tabs defaultValue="timeline" className="w-full mt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="message">Message</TabsTrigger>
          </TabsList>
          <TabsContent value="timeline">
            <AddPost identity={identity} getPosts={getPosts} />
            <div className="mt-8">
              {userPosts.map((post, index) => {
                return (
                  <div key={index} className="mt-8">
                    <PostCard post={post} />
                  </div>
                );
              })}
              {userPosts.length === 0 && <div className="text-center text-gray-500 mt-8">No posts yet</div>}
            </div>
          </TabsContent>
          <TabsContent value="message">
            <AddPost identity={identity} getPosts={getPosts} />
            {/* grid with left sidebar */}
            <div className="grid grid-cols-4 gap-4 mt-8">
              <div className="col-span-1">
                <ul>
                  <li>
                    <div className="flex items-center">
                      <img src="https://api.dicebear.com/8.x/lorelei/svg?seed=xxx" alt="avatar" className="w-8 h-8 rounded-full" />
                      <div className="ml-2">Alice</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-span-3">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="text-gray-500">No messages yet</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
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
