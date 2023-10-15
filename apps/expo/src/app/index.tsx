import { useEffect } from "react";
import { Text, View } from "react-native";

import { ReadingList } from "~/components/readingsList";
import { useIds } from "~/stores/ids";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import { upsertUserId } from "~/utils/userId";
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

const LandingPage = () => {
  const { data } = api.book.all.useQuery();
  const { userId, setId } = useIds();

  useEffect(() => {
    void upsertUserId().then((id) => {
      setId("userId", id);
    });
  }, []);

  return (
    <List
      headerTitle="Tanach"
      title="Select: Tanach"
      data={data}
      renderItem={(p) => <ItemCard item={p.item} />}
    >
      {userId && <ReadingList userId={userId} />}
    </List>
  );
};

export default LandingPage;
