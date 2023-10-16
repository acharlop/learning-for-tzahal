import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FlashList } from "@shopify/flash-list";



import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import { Loader } from "./loader";


interface ItemProps {
  item: RouterOutputs["reading"]["byUserId"][number];
  userId: string;
  refetch: () => void;
}

const ItemCard = ({ item, userId, refetch }: ItemProps) => {
  const { mutate } = api.reading.isRead.useMutation({
    onSuccess: () => refetch(),
  });

  const onPress = () => {
    mutate({
      id: item.id,
      readerId: userId,
    });
  };

  return (
    <TouchableOpacity
      disabled={item.isRead}
      onPress={onPress}
      className="flex flex-col rounded-lg bg-white/10 px-4 py-2"
    >
      <Text className="text-xl font-semibold capitalize text-white">
        {item.portion.chapter.book.name}
      </Text>
      <Text className="text-lg font-semibold capitalize text-white">
        {item.portion.chapter.name}: {item.portion.name}
      </Text>
      {item.isRead ? (
        <Text className="text-right text-emerald-400">Read</Text>
      ) : (
        <Text className="text-right text-white">Mark as read</Text>
      )}
    </TouchableOpacity>
  );
};

interface Props {
  userId: string;
  setHasReading: (hasData: boolean) => void;
}

export const ReadingList = ({ userId, setHasReading }: Props) => {
  const { data, refetch, isLoading } = api.reading.byUserId.useQuery(
    {
      readerId: userId,
    },
    {
      refetchOnMount: true,
    },
  );

  useEffect(() => {
    setHasReading(!!data?.length);
  }, [data, setHasReading, isLoading]);

  if (isLoading) return <Loader />;

  if (!data?.length) return null;

  return (
    <>
      <Text className="py-4 text-2xl font-bold text-white">
        Your portion{data.length > 1 ? "s" : ""}:
      </Text>
      <FlashList
        data={data}
        onRefresh={refetch}
        refreshing={isLoading}
        estimatedItemSize={20}
        ItemSeparatorComponent={() => <View className="h-2" />}
        renderItem={(p) => (
          <ItemCard item={p.item} userId={userId} refetch={refetch} />
        )}
      />
    </>
  );
};
