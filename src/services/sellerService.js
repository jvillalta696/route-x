import { client } from "../backend/supabase/client";

export const insertSeller = async (cli) => {
  let isOk = false;  
  const { Name, Phone,  Email } = cli;
  const { error } = await client
    .from("Sellers")
    .insert({ Name, Phone, Email });
  if (error) {
    console.log("Error al insertar datos ", error);
  } else {
    console.log("datos insertado correctamente");
    isOk = true;
  }
  return isOk;
};

export const getSellerList = async () => {
  const { data, error } = await client.from("Sellers").select();
  if (error) {
    return { error: error.message };
  } else {
    return data;
  }
};

export const updateSeller = async (id, obj) => {
  let isOk = false;
  const { error } = await client.from("Sellers").update(obj).eq("id", id);
  if (error) {
    console.log("Error al actualizar datos ", error);
  } else {
    console.log("datos acturalizados correctamente");
    isOk = true;
  }
  return isOk;
};
