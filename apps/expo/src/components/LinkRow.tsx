import { TouchableOpacity, View } from "react-native";
import type { LinkProps } from "expo-router";
import { Link } from "expo-router";

export const LinkRow = <T,>({ children, ...rest }: LinkProps<T>) => {
  return (
    <View className="flex flex-row rounded-lg bg-white/10 p-4">
      <Link {...rest} className="flex-grow" asChild>
        <TouchableOpacity>{children}</TouchableOpacity>
      </Link>
    </View>
  );
};
