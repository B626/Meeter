export const useFormController = () => {
   interface IController {
      control: Function, 
      register: Function,
      name: string,
      rules: Object,
      render: Function
   }
   const Controller = ({control, register, name, rules, render}: IController) => {
      console.log(control, register, name, rules, render)
   }
   return {
      Controller
   }
}