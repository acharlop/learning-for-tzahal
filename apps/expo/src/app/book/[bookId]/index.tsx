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
      <Text className="text-md font-semibold capitalize text-white opacity-90">
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

  const { data } = api.chapter.byBookId.useQuery(
    {
      id: parseInt(bookId as string),
    },
    {
      enabled: !!bookId,
    },
  );

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
