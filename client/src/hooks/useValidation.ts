import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

export const useValidation = ({schema}: { schema: any }) => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
    });

    return {
        errors,
        register,
        handleSubmit,
        getValues,
    }
}
