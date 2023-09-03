import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {getSignInPopup, getSignUpPopup, setSignInPopup, setSignUpPopup} from "../redux/slices";

export const usePopUps = () => {
    const signUpPopup = useAppSelector(getSignUpPopup);
    const signInPopup = useAppSelector(getSignInPopup);

    const dispatch = useAppDispatch();
    const handleSignInPopup = (value: boolean) => dispatch(setSignInPopup(value));
    const handleSignUpPopup = (value: boolean) => dispatch(setSignUpPopup(value));

    return {
        handleSignInPopup,
        handleSignUpPopup,
        signInPopup,
        signUpPopup
    }
}
