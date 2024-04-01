import Link from "next/link";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";

interface IMyCard {
  id: number;
  title: string;
  // slug: string;
  // image: string;
}

export default function MyCard(props: IMyCard) {
  const { id, title } = props;

  return (
    <Card
      direction={{ base: "row", sm: "column" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%" }}
        w={"100%"}
        h={250}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">{title}</Heading>

          <Text py="1">
            Caffè latte is a coffee beverage of Italian origin made with
            espresso and steamed milk.
          </Text>
        </CardBody>

        <CardFooter>
          <Link href={`/blog/${id}`}>
            <Button variant="solid" colorScheme="blue">
              Detail Post
            </Button>
          </Link>
        </CardFooter>
      </Stack>
    </Card>
  );
}
