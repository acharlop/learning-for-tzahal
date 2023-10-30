import {SafeAreaView, Text, View} from 'react-native'
import {Stack} from 'expo-router'
import {FlashList} from '@shopify/flash-list'

import type {RouterOutputs} from '~/utils/api'
import {api} from '~/utils/api'

interface ItemProps {
  item: RouterOutputs['reading']['byUserId'][number]
}

const ItemCard = ({item}: ItemProps) => {
  return (
    <View className='flex flex-col rounded-lg bg-white/10 px-4 py-2'>
      <Text className='text-xl font-semibold capitalize text-white'>{item.portion.chapter.book.name}</Text>
      <Text className='text-lg font-semibold capitalize text-white'>
        {item.portion.chapter.name}: {item.portion.name}
      </Text>
    </View>
  )
}

const ReadingsList = () => {
  const {data, isLoading, refetch} = api.reading.allReadings.useQuery()

  console.log({data})

  return (
    <SafeAreaView className='bg-[#005596]'>
      {/* Changes page title visible on the header */}
      <Stack.Screen
        options={{
          headerTitle: 'This weeks readings',
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            color: '#FFFFFF',
          },
        }}
      />
      <View className='flex h-full w-full flex-col p-4'>
        <Text className='mx-auto pb-8 pt-5 text-center text-5xl font-bold text-white'>This weeks commitments</Text>
        <FlashList
          data={data}
          onRefresh={refetch}
          refreshing={isLoading}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className='h-2' />}
          renderItem={p => <ItemCard item={p.item} />}
        />
      </View>
    </SafeAreaView>
  )
}

export default ReadingsList
