import { TouchableOpacity } from "react-native";
import type { LinkProps } from "expo-router";
import { Link } from "expo-router";

import { cn } from "~/utils/cn";

export const LinkRow = <T,>({ children, className, ...rest }: LinkProps<T>) => {
  return (
    <Link
      {...rest}
      className={cn("flex flex-row rounded-lg bg-white/10 p-4", className)}
      asChild
    >
      <TouchableOpacity>{children}</TouchableOpacity>
    </Link>
  );
};
