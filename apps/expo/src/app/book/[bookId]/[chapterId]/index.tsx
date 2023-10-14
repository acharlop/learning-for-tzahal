import { Text, View } from "react-native";
import { useGlobalSearchParams } from "expo-router";

import { List } from "~/components/List";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

interface Props {
  item: RouterOutputs["portion"]["byChapterId"]["portions"][number];
  chapter: RouterOutputs["portion"]["byChapterId"]["chapter"];
}

const ItemCard = ({ item, chapter }: Props) => {
  return (
    <View className="flex flex-row rounded-lg bg-white/10 p-4">
      <View className="flex-grow">
        <Text className="text-xl font-semibold capitalize text-white">
          {chapter?.name}
        </Text>
        <Text className="text-xl font-semibold capitalize text-white">
          {item.name}
        </Text>
      </View>
    </View>
  );
};

const ChooseSection = () => {
  const { chapterId } = useGlobalSearchParams();
  if (!chapterId || typeof chapterId !== "string")
    throw new Error("unreachable");

  const { data, isLoading } = api.portion.byChapterId.useQuery({
    id: parseInt(chapterId),
  });

  console.log({ isLoading });

  if (isLoading) return <Text>Loading...</Text>;

  if (!data) return null;

  return (
    <List
      headerTitle="Portion"
      title="Select: Portion"
      data={data.portions}
      renderItem={(p) => <ItemCard item={p.item} chapter={data.chapter} />}
    />
  );
};

export default ChooseSection;
