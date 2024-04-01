import HeroDetail from "@/components/HeroDetail";
import { Heading } from "@chakra-ui/react";
import { getDetailDataPost } from "@/api/blog";

export default function BlogDetail() {
  return (
    <div className="h-full">
      <HeroDetail />
      <Heading marginTop={40} textAlign={"center"}>
        {" "}
        Blog Detail{" "}
      </Heading>
    </div>
  );
}
