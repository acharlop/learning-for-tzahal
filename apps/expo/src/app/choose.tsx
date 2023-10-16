import { Text } from "react-native";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import { LinkRow } from "../components/LinkRow";
import { List } from "../components/List";

interface Props {
  item: RouterOutputs["book"]["all"][number];
}

const ItemCard = ({ item }: Props) => {
  return (
    <LinkRow
      href={{
        pathname: "/book/[bookId]/",
        params: { bookId: item.id },
      }}
    >
      <Text className="text-xl font-semibold capitalize text-white">
        {item.name}
      </Text>
    </LinkRow>
  );
};

const ChooseBookPage = () => {
  const { data } = api.book.all.useQuery();

  return (
    <List
      headerTitle="Tanach"
      title="Select: Tanach"
      data={data}
      renderItem={(p) => <ItemCard item={p.item} />}
    />
  );
};

export default ChooseBookPage;
