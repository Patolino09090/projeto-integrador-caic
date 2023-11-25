import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { router } from "@inertiajs/react";
import BudgetForm from "@/Components/BudgetForm";

export default function Edit({ auth, budget }) {
    const inputRef = React.useRef();

    const { data, setData, put, clearErrors, reset, errors } = useForm(
        "editForm",
        {
            titulo: budget.titulo || "",
            conteudo: budget.conteudo || "",
        }
    );

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        // put(route("budgets.update", budget.id));
        router.budget(route("budgets.update", budget.id), {
            ...data,
            _method: "put",
            forceFormData: true,
        });
    };

    const cancel = () => {
        if (window.confirm("Tem certeza de que deseja cancelar?")) {
            reset();
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Editar budget - ${budget.titulo}`} />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <budgetForm
                    data={data}
                    errors={errors}
                    setData={setData}
                    inputRef={inputRef}
                    submit={submit}
                    cancel={cancel}
                />
            </div>
        </AuthenticatedLayout>
    );
}