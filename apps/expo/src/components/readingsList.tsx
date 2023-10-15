import { Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

interface ItemProps {
  item: RouterOutputs["reading"]["byUserId"][number];
}

const ItemCard = ({ item }: ItemProps) => {
  return (
    <Text className="text-xl font-semibold capitalize text-white">
      {item.portion.chapter.name}: {item.portion.name}
    </Text>
  );
};

interface Props {
  userId: string;
}

export const ReadingList = ({ userId }: Props) => {
  const { data } = api.reading.byUserId.useQuery({
    readerId: userId,
  });

  return (
    <FlashList
      data={data}
      estimatedItemSize={20}
      ItemSeparatorComponent={() => <View className="h-2" />}
      renderItem={(p) => <ItemCard item={p.item} />}
    />
  );
};
