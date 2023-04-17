import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../components/api';

export const getIngredients = createAsyncThunk('burger/getIngredients', async () => {
    const result = await api.getIngredients();
    if (result.success) {
        return result.data;
    } else {
        console.log(result.error);
    }
});

export const setOrder = createAsyncThunk(
    'burger/setOrder',
    async ({ ingredientIdentifiers }: { ingredientIdentifiers: element['_id'][] }) => {
        const result = await api.setOrder({ ingredientIdentifiers });
        if (result.success) {
            return result;
        } else {
            console.log(result.error);
        }
    },
);
