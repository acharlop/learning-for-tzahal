import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_ID_KEY = "user_id";

export const setUserId = async (userId: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_ID_KEY, userId);
  } catch (error) {
    console.error(`Error setting user ID: ${error as string}`);
  }
};

export const getUserId = async (): Promise<string | null> => {
  try {
    const userId = await AsyncStorage.getItem(USER_ID_KEY);
    return userId;
  } catch (error) {
    console.error(`Error getting user ID: ${error as string}`);
    return null;
  }
};

export const upsertUserId = async (): Promise<string> => {
  let userId: string;
  try {
    const existingUserId = await getUserId();
    if (existingUserId) {
      return existingUserId;
    }
    userId = uuid.v4().toString();
    await setUserId(userId);
  } catch (error) {
    console.error(`Error upserting user ID: ${error as string}`);
  }
  return userId!;
};
