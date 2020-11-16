import * as SecureStore from "expo-secure-store";

const key = "authUser";

const storeUser = async (authUser) => {
  try {
    await SecureStore.setItemAsync(key, authUser);
  } catch (error) {
    console.warn("Error storing the auth User", error);
  }
};

const getUser = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.warn("Error getting the auth user", error);
  }
};

const removeUser = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.warn("Error removing the auth user", error);
  }
};

export default { storeUser, getUser, removeUser };
