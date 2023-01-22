import { client } from "../backend/supabase/client";

export const insertStatus = async (status) => {
  let isOk = false;
  const { name } = status;
  const { error } = await client
    .from("Status")
    .insert({ name });
  if (error) {
    console.log("Error al insertar datos ", error);
  } else {
    console.log("datos insertado correctamente");
    isOk = true;
  }
  return isOk;
};

export const getStatusList = async () => {
  const { data, error } = await client.from("Status").select();
  if (error) {
    return { error: error.message };
  } else {
    return data;
  }
};

export const updateStatus = async (id, obj) => {
  let isOk = false;
  const { error } = await client.from("Status").update(obj).eq("id", id);
  if (error) {
    console.log("Error al actualizar datos ", error);
  } else {
    console.log("datos actualizado correctamente");
    isOk = true;
  }
  return isOk;
};
