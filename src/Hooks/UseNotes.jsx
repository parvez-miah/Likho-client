import React, { useContext } from 'react'
import { AuthContext } from '../Provider/AuthProvider'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


const UseNotes = () => {
    const { user } = useContext(AuthContext);

    const { refetch, data: notes = [], isLoading } = useQuery({
        queryKey: ['notes', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/notes?email=${user?.email}`)
            console.log('res from axios', res)
            return res.data;
        },
    })

    return [notes, refetch, isLoading]
}

export default UseNotes