import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

export const useValidation = ({userData, schema}: { userData?: any, schema?: any }) => {
    const {
        register,
        handleSubmit,
        getValues,
        control,
        watch,
        formState: {errors},
    } = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            dob_day: "",
            dob_month: "",
            dob_year: "",
            email: userData ? userData.email : "",
            password: userData ? userData.password : "",
            password_check: "",
            gender_identity: "man",
            gender_interest: "",
            show_gender: true,
            about: ""
        },
        resolver: yupResolver(schema),
    });

    return {
        errors,
        register,
        handleSubmit,
        getValues,
        control,
        watch
    }
}
