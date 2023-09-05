import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

export const useValidation = ({userData, schema}: { userData?: any, schema: any }) => {
    const {
        register,
        handleSubmit,
        getValues,
        control,
        formState: {errors},
    } = useForm({
        defaultValues: {
            email: userData ? userData.email : "",
            password: userData ? userData.password : "",
            password_check: ""
        },
        resolver: yupResolver(schema),
    });

    return {
        errors,
        register,
        handleSubmit,
        getValues, 
        control
    }
}
