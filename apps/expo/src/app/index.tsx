import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { Stack, useGlobalSearchParams, useSegments } from "expo-router";



import { Loader } from "~/components/loader";
import { ReadingList } from "~/components/readingsList";
import { useIds } from "~/stores/ids";
import { api } from "~/utils/api";
import { upsertUserId } from "~/utils/userId";
import { LinkRow } from "../components/LinkRow";


const LandingPage = () => {
  const { userId, setId } = useIds();
  const [hasReading, setHasReading] = useState<boolean | undefined>();
  const [showMore, setShowMore] = useState(false);
  const segments = useSegments();
  const utils = api.useContext();

  const { data, isLoading } = api.reading.countRemaining.useQuery();

  useEffect(() => {
    void upsertUserId().then((id) => {
      setId("userId", id);
    });
  }, []);

  useEffect(() => {
    if (!segments?.length) {
      void utils.reading.countRemaining.invalidate();
      void utils.reading.countRemaining.refetch();
      void utils.reading.byUserId.invalidate();
      void utils.reading.byUserId.refetch();
      void utils.portion.unreadByChapterId.invalidate();
    }
  }, [segments]);

  return (
    <SafeAreaView className="bg-[#005596]">
      {/* Changes page title visible on the header */}
      <Stack.Screen
        options={{
          headerTitle: "Welcome",
          headerTintColor: "#fff",
          headerBackTitleVisible: false,
          headerTitleStyle: {
            color: "#FFFFFF",
          },
        }}
      />
      <View className="h-full w-full p-4">
        <Text className="mx-auto pb-5 text-center text-5xl font-bold text-white">
          Learning for Tzahal
        </Text>
        {isLoading ? (
          <Loader />
        ) : (
          <Text className="text-xl font-bold text-white">
            Portions remaining this week: {data?.remaining}
          </Text>
        )}

        <Pressable onPress={() => setShowMore(!showMore)}>
          <Text className="mx-auto py-5 text-lg leading-6 text-white">
            Whilst this terrible war is happening, many soldiers have been
            forced to close their Sefarim.{" "}
            {showMore && (
              <>
                As a community we will be coming together to learn in their
                merit to bring them strength and safety. Please, every week sign
                up to learn in their honour. Every week we will say “Hadran”, we
                will return to the learning - in their honour, and we pray for
                each of them too to return home safely.
              </>
            )}
            {showMore ? " Show less..." : " Show more..."}
          </Text>
        </Pressable>
        {(hasReading === false || !data?.settings.readOnly1) && (
          <LinkRow href="/choose" className="bg-brand-red">
            <Text className="text-xl font-semibold capitalize text-white">
              Choose portion to learn
            </Text>
          </LinkRow>
        )}
        {userId && (
          <ReadingList userId={userId} setHasReading={setHasReading} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;
