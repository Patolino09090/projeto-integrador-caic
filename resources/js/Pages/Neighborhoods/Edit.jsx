import React from 'react';
import {useForm } from '@inertiajs/react';
import StateForm from './NeighborhoodForm';
import HeaderCustom from '@/Components/HeaderCustom';

export default function Create({ auth, neighborhood }) {
    const { data, setData, patch, processing, reset, errors } = useForm({
        name: neighborhood.name || "",
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('neighborhoods.update', neighborhood.id), {});
    };

    const cancel = () => {

        if (window.confirm("Are you sure you want to cancel?")) {
            reset();
        }
    };

    return (
        <HeaderCustom auth={auth} title={"Neighborhoods"} head={"Edit Neighborhood"}>
                <StateForm
                    data={data}
                    errors={errors}
                    setData={setData}
                    submit={submit}
                    cancel={cancel}
                    processing={processing}
                />

        </HeaderCustom>
    );
}
