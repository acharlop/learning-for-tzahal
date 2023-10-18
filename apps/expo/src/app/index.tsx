import {useEffect, useState} from 'react'
import {SafeAreaView, Text, View} from 'react-native'
import {Stack, usePathname} from 'expo-router'

import {ReadingList} from '~/components/readingsList'
import {useIds} from '~/stores/ids'
import {api} from '~/utils/api'
import {upsertUserId} from '~/utils/userId'
import {LinkRow} from '../components/LinkRow'

const LandingPage = () => {
  const {userId, setId} = useIds()
  const [hasReading, setHasReading] = useState<boolean | undefined>()
  const utils = api.useContext()
  const pathname = usePathname()

  const {data, isLoading} = api.reading.countRemaining.useQuery()

  const canAddReading = data?.remaining && data.remaining > 0 && (hasReading === false || (hasReading && !data?.settings.readOnly1))

  useEffect(() => {
    void upsertUserId().then(id => {
      setId('userId', id)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (pathname === '/') {
      void utils.reading.countRemaining.invalidate()
      void utils.reading.countRemaining.refetch()
      void utils.reading.byUserId.invalidate()
      void utils.reading.byUserId.refetch()
      void utils.portion.unreadByChapterId.invalidate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

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
        <Text className='mx-auto pb-8 pt-5 text-center text-5xl font-bold text-white'>Learning for Tzahal</Text>
        {hasReading === false && (
          <Text className='mx-auto py-5 text-lg leading-6 text-white'>
            Whilst this terrible war is happening, many soldiers have been forced to close their Sefarim. As a community we will be coming together to
            learn in their merit to bring them strength and safety. Please, every week sign up to learn in their honour. Every week we will say
            “Hadran”, we will return to the learning - in their honour, and we pray for each of them too to return home safely.
          </Text>
        )}
        <Text className='pb-5 text-xl font-bold text-white'>{isLoading ? '' : `Portions remaining this week: ${data?.remaining}`}</Text>
        {userId && <ReadingList userId={userId} setHasReading={setHasReading} />}
        <LinkRow href='/choose' className='mt-auto justify-center bg-brand-red' disabled={!canAddReading}>
          <Text className='text-xl font-semibold capitalize text-white'>Choose portion to learn</Text>
        </LinkRow>
      </View>
    </SafeAreaView>
  )
}

export default LandingPage
