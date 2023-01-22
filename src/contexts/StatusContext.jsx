import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";

import {
    getStatusList,
    insertStatus,
    updateStatus,
} from "../services/statusServices";

const StatusContext = createContext();

const useStatus = () => {
    const context = useContext(StatusContext);
    if (!context) {
        throw new Error('useStatus must be used within a StatusProvider');
    }
    return context;
}

const StatusProvider = ({ children }) => {

    const [statusList, setStatusList] = useState([]);

    const setStatusL = (data) => {
        setStatusList(data);
    };

    const findStatusById = (id) => {
        return statusList.find(status => status.id === id);
    };

    const getStatusListC = useCallback(async () => {
        const obj = await getStatusList();
        if (!obj.error) {
            setStatusList(obj);
        } else {
            console.log(obj);
        }
    }, []);

    const createStatus = async (seller) => {
        const isOk = await insertStatus(seller);
        if (isOk) {
            await getStatusListC();
        }
        return isOk;
    };
    const updateStatusC = async (id, object) => {
        const obj = await updateStatus(id, object);
        if (!obj.error) {
            await getStatusListC();
        } else {
            console.log(obj);
        }
    };

    useEffect(() => {
        getStatusListC();
        console.log(statusList)
    }, [getStatusListC]);

    return (
        <StatusContext.Provider
            value={{
                statusList,
                createStatus,
                getStatusListC,
                updateStatusC,
                setStatusL,
                findStatusById,
            }}
        >
            {children}
        </StatusContext.Provider>
    );
}

export { StatusProvider, useStatus };