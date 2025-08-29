import AsyncStorage from "@react-native-async-storage/async-storage";

const COINS_KEY = "coins";

export const getCoins = async () => {
  try {
    const value = await AsyncStorage.getItem(COINS_KEY);
    return value ? parseInt(value, 10) : 0;
  } catch (error) {
    console.log("Erro ao pegar coins!", error);
    return 0;
  }
};

export const setCoins = async (amount) => {
  try {
    await AsyncStorage.setItem(COINS_KEY, amount.toString());
  } catch (error) {
    console.log("Erro ao definir coins!", error);
  }
};

export const addCoins = async (amount) => {
  try {
    const current = await getCoins();
    const newAmount = current + amount;
    await setCoins(newAmount);
    console.log(newAmount);
  } catch (error) {
    console.log("Erro ao adicionar coins!", error);
  }
};

export const removeCoins = async (amount) => {
  try {
    const current = await getCoins();
    const newAmount = Math.max(current - amount, 0);
    await setCoins(newAmount);
    return newAmount;
  } catch (error) {
    console.log("Erro ao remover coins!", error);
    return null;
  }
};
