"use client";

import MyCard from "./MyCard";
import { useQuery } from "@tanstack/react-query";
import { getDataPost } from "@/api/blog";

export default function LatestPost() {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const res = await getDataPost();
      return res.data;
    },
  });

  if (isLoading) return <div> Loading .... </div>;

  if (isError) return <div> {JSON.stringify(error.message)} </div>;

  return (
    <section className="">
      <div className="container flex gap-5">
        {data?.data.map((item: any, index: number) => (
          <MyCard
            id={item.id}
            key={index}
            title={item.title}
            // image={item.fields?.image?.sys?.id}
            // slug={item.fields.slug}
          />
        ))}
      </div>
    </section>
  );
}
