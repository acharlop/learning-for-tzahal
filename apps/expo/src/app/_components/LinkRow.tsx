import { TouchableOpacity, View } from "react-native";
import type { LinkProps } from "expo-router";
import { Link } from "expo-router";

export const LinkRow = <T,>({ children, href }: LinkProps<T>) => {
  return (
    <View className="flex flex-row rounded-lg bg-white/10 p-4">
      <Link href={href} className="flex-grow">
        <View className="flex-grow">
          <TouchableOpacity>{children}</TouchableOpacity>
        </View>
      </Link>
    </View>
  );
};
