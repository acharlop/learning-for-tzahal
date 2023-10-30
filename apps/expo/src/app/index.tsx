import { useEffect, useState } from 'react';
import {SafeAreaView, Text, View} from 'react-native'
import {Stack} from 'expo-router'

import {ReadingList} from '~/components/readingsList'
import {useIds} from '~/stores/ids'
import {api} from '~/utils/api'
import {upsertUserId} from '~/utils/userId'
import {LinkRow} from '../components/LinkRow'

const LandingPage = () => {
  const {userId, setId} = useIds()
  const [hasReading, setHasReading] = useState<boolean | undefined>()

  const {data, isLoading} = api.reading.countRemaining.useQuery()

  const hasRemaining = !isLoading && (data?.remaining ?? 0 > 0)
  const canAddReading = hasRemaining && (hasReading === false || (hasReading && !data?.settings.readOnly1))

  useEffect(() => {
    void upsertUserId().then(id => {
      setId('userId', id)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SafeAreaView className='bg-[#005596]'>
      {/* Changes page title visible on the header */}
      <Stack.Screen
        options={{
          headerTitle: 'Welcome',
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            color: '#FFFFFF',
          },
        }}
      />
      <View className='flex h-full w-full flex-col p-4'>
        <Text className='mx-auto pt-5 text-center text-5xl font-bold text-white'>Learning for Tzahal</Text>

        <Text className='py-5 text-lg leading-6 text-white'>
          {hasReading === false ? (
            <>
              Whilst this terrible war is happening, many soldiers have been forced to close their Sefarim. As a community we will be coming together
              to learn in their merit to bring them strength and safety. Please, every week sign up to learn in their honour. Every week we will say
              “Hadran”, we will return to the learning - in their honour, and we pray for each of them too to return home safely.
            </>
          ) : (
            <>Please finish your portions by Sunday morning and come back then for another learning.</>
          )}
        </Text>
        {hasRemaining && <Text className='pb-5 text-xl font-bold text-white'>{`Portions remaining this week: ${data?.remaining}`}</Text>}
        {!hasRemaining && <Text className='pb-5 text-3xl font-bold text-white'>“Hadran Alach!”</Text>}
        {userId && <ReadingList userId={userId} setHasReading={setHasReading} />}
        {canAddReading && (
          <LinkRow href='/choose' className='mt-auto justify-center bg-brand-red'>
            <Text className='text-xl font-semibold capitalize text-white'>Choose portion to learn</Text>
          </LinkRow>
        )}
        <LinkRow href='/readings' className='mt-2.5 justify-center border-brand-red'>
          <Text className='text-xl font-semibold capitalize text-white'>View all readings</Text>
        </LinkRow>
      </View>
    </SafeAreaView>
  )
}

export default LandingPage
