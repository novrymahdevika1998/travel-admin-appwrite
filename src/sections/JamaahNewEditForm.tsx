import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { db } from '@/database/db'
import { Input } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const JamaahNewEditForm = () => {
    const formSchema = z.object({
        name: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: 'Novry'
        }
    })

    const { handleSubmit, control } = form;

    async function onSubmit(data: z.infer<typeof formSchema>) {
        await db.customers.create(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
                <FormField
                    control={control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukkan nama" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    )
}

export default JamaahNewEditForm