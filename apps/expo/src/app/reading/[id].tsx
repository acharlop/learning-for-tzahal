import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native'
import {router, Stack, useGlobalSearchParams} from 'expo-router'

import {Loader} from '~/components/loader'
import {useIds} from '~/stores/ids'
import {api} from '~/utils/api'

const ViewPortion = () => {
  const {id: idString} = useGlobalSearchParams()
  const utils = api.useContext()
  const {userId} = useIds()
  const id = parseInt(idString as string)

  const {data} = api.reading.byId.useQuery({
    id,
    readerId: userId,
  })

  const {mutate: removeReading} = api.reading.delete.useMutation({
    onSuccess: () => {
      void utils.reading.countRemaining.invalidate()
      void utils.reading.byUserId.invalidate()
      void utils.portion.unreadByChapterId.invalidate()
      router.push('/')
    },
  })

  const onRemovePress = () => {
    try {
      removeReading({
        readerId: userId,
        id,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const title = () => {
    if (!data) return ''
    if (data.portion.chapter.name === data.portion.name) return data.portion.name
    return `${data.portion.chapter.name} - ${data.portion.name}`
  }

  return (
    <SafeAreaView className='bg-[#005596]'>
      <Stack.Screen
        options={{
          headerTitle: 'My Portion',
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

          {/* <TouchableOpacity className='flex items-center justify-center rounded bg-brand-red py-5 active:opacity-50' onPress={onPress}>
            <Text className='font-semibold text-white'>Mark as read and select</Text>
          </TouchableOpacity> */}
          <TouchableOpacity className='flex items-center justify-center rounded bg-brand-red py-5 active:opacity-50' onPress={onRemovePress}>
            <Text className='text-xl  font-semibold text-white'>I cannot complete my portion</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Loader />
      )}
    </SafeAreaView>
  )
}

export default ViewPortion
