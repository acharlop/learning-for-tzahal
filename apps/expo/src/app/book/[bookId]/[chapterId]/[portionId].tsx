import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native'
import {router, Stack, useGlobalSearchParams} from 'expo-router'

import {Loader} from '~/components/loader'
import {useIds} from '~/stores/ids'
import {api} from '~/utils/api'

const ViewPortion = () => {
  const utils = api.useContext()
  const {portionId} = useGlobalSearchParams()
  const {userId} = useIds()

  const {data} = api.portion.byId.useQuery({
    id: parseInt(portionId as string),
  })

  const {mutate} = api.reading.create.useMutation({
    onSuccess: () => {
      void utils.reading.countRemaining.invalidate()
      void utils.reading.byUserId.invalidate()
      void utils.portion.unreadByChapterId.invalidate()
      router.push('/')
    },
    onError: error => {
      console.error(error)
    },
  })

  const onPress = () => {
    mutate({
      readerId: userId,
      portionId: parseInt(portionId as string),
    })
  }

  const title = () => {
    if (!data) return ''
    if (data.chapter.name === data.name) return data.name
    return `${data.chapter.name} - ${data.name}`
  }

  return (
    <SafeAreaView className='bg-[#005596]'>
      <Stack.Screen
        options={{
          headerTitle: 'Portion',
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            color: '#FFFFFF',
          },
        }}
      />
      {data ? (
        <View className='h-full w-full p-4'>
          <Text className='mx-auto mb-auto pb-5 text-center text-5xl font-bold text-white'>{title()}</Text>

          <TouchableOpacity className='flex items-center justify-center rounded bg-brand-red py-5 active:opacity-50' onPress={onPress}>
            <Text className='font-semibold text-white'>I commit to learning</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Loader />
      )}
    </SafeAreaView>
  )
}

export default ViewPortion
