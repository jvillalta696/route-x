import { client } from "../backend/supabase/client";

export const insertClient = async (cli) => {
  let isOk = false;
  const { Name, Phone, Address, EMail, id_category } = cli;
  let idcat = parseInt(id_category);
  const { error } = await client
    .from("Clients")
    .insert({ Name, Phone, Address, EMail, id_category: idcat });
  if (error) {
    console.log("Error al insertar datos ", error);
  } else {
    console.log("datos insertado correctamente");
    isOk = true;
  }
  return isOk;
};

export const getClientList = async () => {
  const { data, error } = await client.from("Clients").select();
  if (error) {
    return { error: error.message };
  } else {
    return data;
  }
};

export const updateClient = async (id, obj) => {
  let isOk = false;
  const { error } = await client.from("Clients").update(obj).eq("id", id);
  if (error) {
    console.log("Error al insertar datos ", error);
  } else {
    console.log("datos insertado correctamente");
    isOk = true;
  }
  return isOk;
};
