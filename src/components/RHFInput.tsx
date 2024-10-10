import { Input, FormControl, FormHelperText, FormLabel, InputProps, FormErrorMessage } from "@chakra-ui/react"
import { useFormContext, Controller } from "react-hook-form"

type Props = InputProps & {
    name: string
}

const RHFInput = ({ name, ...other }: Props) => {
    const { register, formState: { errors } } = useFormContext()

    return (
        <FormControl>
            <FormLabel htmlFor={name}>{name}</FormLabel>
            <Input 
                {...register(name)}
                {...other}
            />
        </FormControl>
    )
}

export default RHFInput