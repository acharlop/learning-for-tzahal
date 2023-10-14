import { Text } from "react-native";
import { useGlobalSearchParams } from "expo-router";

import { LinkRow } from "~/app/_components/LinkRow";
import { List } from "~/app/_components/List";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

interface Props {
  item: RouterOutputs["portion"]["byChapterId"][number];
  book: RouterOutputs["book"]["all"][number];
}

const ItemCard = ({ item, book }: Props) => {
  const onPress = () => {
    // setId("chapterId", item.id);
  };

  return (
    <LinkRow href="/reading/section" onPress={onPress}>
      <Text className="text-xl font-semibold capitalize text-white">
        {book.name}
      </Text>
      <Text className="text-lg font-semibold capitalize text-white">
        {item.name}
      </Text>
    </LinkRow>
  );
};

export default function Post() {
  const { bookId } = useGlobalSearchParams();
  if (!bookId || typeof bookId !== "string") throw new Error("unreachable");

  const id = parseInt(bookId);

  const { data } = api.portion.byChapterId.useQuery({ id });
  const { data: book } = api.book.byId.useQuery({ id });

  if (!data || !book) return null;

  return (
    <List
      headerTitle="Chapters"
      title="Select: Chapters"
      data={data}
      renderItem={(p) => <ItemCard item={p.item} book={book} />}
    />
  );
}
