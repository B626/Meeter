import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

export const useValidation = ({defaultValues, schema}: { defaultValues?: any, schema?: any }) => {
    const {
        register,
        handleSubmit,
        getValues,
        control,
        formState: {errors},
    } = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
    });

    console.log(defaultValues)
    
    return {
        errors,
        register,
        handleSubmit,
        getValues, 
        control
    }
}
