import { useState } from "react";

export const useForm = (initialForm) =>{
    const [form, setForm] = useState(initialForm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const cleanForm = () => {
        setForm(initialForm);
    }

    return {
        form, cleanForm, handleChange
    }
}