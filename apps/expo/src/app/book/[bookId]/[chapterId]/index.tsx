import { Text } from "react-native";
import { useGlobalSearchParams } from "expo-router";



import { LinkRow } from "~/components/LinkRow";
import { List } from "~/components/List";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";


interface Props {
  item: RouterOutputs["portion"]["unreadByChapterId"]["portions"][number];
  chapter?: RouterOutputs["portion"]["unreadByChapterId"]["chapter"];
}

const ItemCard = ({ item, chapter }: Props) => {
  return (
    <LinkRow
      href={{
        pathname: "/book/[bookId]/[chapterId]/[portionId]",
        params: {
          portionId: item.id.toString(),
          chapterId: chapter!.id.toString(),
          bookId: chapter!.book.id.toString(),
        },
      }}
    >
      <Text className="text-xl font-semibold capitalize text-white">
        {chapter?.name}: {item.name}
      </Text>
    </LinkRow>
  );
};

const ChooseSection = () => {
  const { chapterId } = useGlobalSearchParams();
  const { data } = api.portion.unreadByChapterId.useQuery(
    {
      id: parseInt(chapterId as string),
    },
    {
      enabled: !!chapterId,
    },
  );

  return (
    <List
      headerTitle="Portion"
      title="Select: Portion"
      data={data?.portions}
      renderItem={(p) => <ItemCard item={p.item} chapter={data?.chapter} />}
    />
  );
};

export default ChooseSection;
