import { Text, View } from "react-native";
import { useGlobalSearchParams } from "expo-router";

import { List } from "~/app/_components/List";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

interface Props {
  item: RouterOutputs["portion"]["byChapterId"][number];
  chapterId: string;
}

const ItemCard = ({ item }: Props) => {
  return (
    <View className="flex flex-row rounded-lg bg-white/10 p-4">
      <View className="flex-grow">
        <Text className="text-xl font-semibold capitalize text-white">
          {item.name}
        </Text>
      </View>
    </View>
  );
};

export default function Post() {
  const { chapterId, bookId } = useGlobalSearchParams();
  if (!chapterId || typeof chapterId !== "string")
    throw new Error("unreachable");
  if (!bookId || typeof bookId !== "string") throw new Error("unreachable");

  const { data } = api.portion.byChapterId.useQuery({
    id: parseInt(chapterId),
  });

  if (!data) return null;

  return (
    <List
      headerTitle="Chapters"
      title="Select: Chapters"
      data={data}
      renderItem={(p) => <ItemCard item={p.item} chapterId={"1"} />}
    />
  );
}
