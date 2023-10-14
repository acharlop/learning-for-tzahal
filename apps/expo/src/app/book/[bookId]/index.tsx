import { Text } from "react-native";
import { useGlobalSearchParams } from "expo-router";

import { LinkRow } from "~/components/LinkRow";
import { List } from "~/components/List";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

interface Props {
  item: RouterOutputs["chapter"]["all"][number];
}

const ItemCard = ({ item }: Props) => {
  return (
    <LinkRow
      href={{
        pathname: "/book/[bookId]/[chapterId]/",
        params: {
          chapterId: item.id.toString(),
          bookId: item.book.id.toString(),
        },
      }}
    >
      <Text className="text-xl font-semibold capitalize text-white">
        {item.book.name}
      </Text>
      <Text className="text-lg font-semibold capitalize text-white">
        {item.name}
      </Text>
    </LinkRow>
  );
};

const ChooseChapter = () => {
  const { bookId } = useGlobalSearchParams();
  if (!bookId || typeof bookId !== "string") throw new Error("unreachable");

  const { data, isFetching } = api.chapter.byBookId.useQuery({
    id: parseInt(bookId),
  });

  if (isFetching) return <Text>Loading...</Text>;

  if (!data) return null;

  return (
    <List
      headerTitle="Chapter"
      title="Select: Chapter"
      data={data}
      renderItem={(p) => <ItemCard item={p.item} />}
    />
  );
};

export default ChooseChapter;
