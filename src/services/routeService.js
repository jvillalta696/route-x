import { client } from "../backend/supabase/client";

export const insertRoute = async(route) => {
    let isOk = false;
    const { nameRoute, dateStart, dateEnd, idSeller, id_status } = route
    const { error } = await client
        .from("Routes")
        .insert({ nameRoute, dateStart, dateEnd, idSeller, id_status });
    if (error) {
        console.log("Error al insertar datos ", error);
    } else {
        console.log("datos insertado correctamente");
        isOk = true;
    }
    return isOk;
};

export const getRouteList = async () => {
    const { data, error } = await client.from("Routes").select();
    if (error) {
      return { error: error.message };
    } else {
      return data;
    }
  };

  export const updateRoute = async (id, obj) => {
    let isOk = false;
    const { error } = await client.from("Route").update(obj).eq("id", id);
    if (error) {
      console.log("Error al actualizar datos ", error);
    } else {
      console.log("datos actualizado correctamente");
      isOk = true;
    }
    return isOk;
  };
  