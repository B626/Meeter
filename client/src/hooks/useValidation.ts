import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

export const useValidation = ({defaultValues, schema}: { defaultValues?: any, schema?: any }) => {
    const {
        register,
        handleSubmit,
        getValues,
        control,
        watch,
        formState: {errors},
        reset
    } = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
    });
    
    return {
        errors,
        register,
        handleSubmit,
        getValues,
        control,
        watch,
        reset
    }
}
