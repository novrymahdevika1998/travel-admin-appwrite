import { db } from '@/database/db';
import JamaahNewEditForm from '@/sections/JamaahNewEditForm';
import React, { useEffect } from 'react'

const JamaahCreate = () => {
    useEffect(() => {
        const init = async () => {
            const response = await db.customerSchedules.list([]);

            console.log(response)
        }

        init()
    }, [])
    return (
        <div>
            <JamaahNewEditForm />
        </div>
    )
}

export default JamaahCreate