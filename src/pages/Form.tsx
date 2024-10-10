import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Stack } from '@chakra-ui/react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'

const Form = () => {
	const schema = z.object({
		name: z.string({ required_error: 'Name is required', invalid_type_error: 'Name must be string' }).min(1, "Nama harus diisi"),
		description: z.string(),
		email: z.string({ required_error: 'Email is required', invalid_type_error: 'Email must be string' }).email(),
		password: z.string({ required_error: 'Password is required' }).min(8),
	})

	type SchemaType = z.infer<typeof schema>

	const method = useForm<SchemaType>({
		resolver: zodResolver(schema),
	});

	const { handleSubmit, register, formState: { errors } } = method

	const onSubmit: SubmitHandler<SchemaType> = (data) => console.log({ data })

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={3} margin={2}>
				<FormControl>
					<FormLabel>Nama</FormLabel>
					<Input {...register('name')} placeholder='Name' />
					<FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
				</FormControl>

				{errors.name && <span>{errors.name.message}</span>}

				<Input {...register('email')} placeholder='Email' type='email' />

				{errors.email && <span>{errors.email.message}</span>}

				<Input {...register('password')} placeholder='Password' type='password' />

				{errors.password && <span>{errors.password.message}</span>}

				<Button variant='destructive' type='submit'>Submit</Button>
			</Stack>
		</form>
	)
}

export default Form