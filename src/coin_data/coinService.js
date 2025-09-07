import AsyncStorage from "@react-native-async-storage/async-storage";

const COINS_KEY = "coins";
const LIST_ID_COLLECT = "list_id";

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    console.log("AsyncStorage limpo com sucesso!");
  } catch (error) {
    console.log("Erro ao limpar AsyncStorage!", error);
  }
};

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

export const getList = async () => {
  try {
    const value = await AsyncStorage.getItem(LIST_ID_COLLECT);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    console.log("Erro ao pegar lista id!", error);
    return [];
  }
};

export const setIdList = async (listId) => {
  try {
    await AsyncStorage.setItem(LIST_ID_COLLECT, JSON.stringify(listId));
  } catch (error) {
    console.log("Erro ao definir lista ID!", error);
  }
};

export const existsInList = async (id) => {
  try {
    const current = await getList();
    return current.includes(id);
  } catch (error) {
    console.log("Erro ao verificar se ID existe na lista!", error);
    return false;
  }
};

export const addIdList = async (id) => {
  try {
    const alreadyExists = await existsInList(id);

    if (!alreadyExists) {
      const current = await getList();
      const updatedList = [...current, id];
      await setIdList(updatedList);
      console.log("Novo ID adicionado:", id);
    } else {
      console.log("ID já existe na lista:", id);
    }
  } catch (error) {
    console.log("Erro ao adicionar id!", error);
  }
};
