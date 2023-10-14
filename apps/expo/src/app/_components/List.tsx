import type { PropsWithChildren } from "react";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Stack } from "expo-router";
import { FlashList } from "@shopify/flash-list";

interface Props<T> extends PropsWithChildren<unknown> {
  data?: T[];
  title: string;
  headerTitle: string;
  renderItem: (props: { item: T }) => JSX.Element;
}

export const List = <T,>({
  data,
  title,
  headerTitle,
  renderItem,
}: Props<T>) => {
  if (!data) return "Loading...";

  return (
    <SafeAreaView className="bg-[#005596]">
      {/* Changes page title visible on the header */}
      <Stack.Screen
        options={{
          headerTitle,
          headerBackTitle: "",
          headerTintColor: "#FFFFFF",
          headerBackTitleVisible: false,
          headerTitleStyle: {
            color: "#FFFFFF",
          },
        }}
      />
      <View className="h-full w-full p-4">
        <Text className="mx-auto pb-5 text-center text-5xl font-bold text-white">
          {title}
        </Text>

        <FlashList
          data={data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};
