import { useState } from "react";

const useArray = (initialValue: any[]) => {

    const [value, setValue] = useState(initialValue);
    
    const push = (item: any) => {
        setValue([...value, item]);
    };

    const remove = (index: number) => {
        setValue(value.filter((_, i) => i !== index));
    };

    const isEmpty = () => {
        return value.length === 0;
    };
    
    return { value, setValue, push, remove, isEmpty };
};

export default useArray;
export { useArray };
