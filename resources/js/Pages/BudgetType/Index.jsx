import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import BudgetTypeForm from "./BudgetTypeForm";


export default function Index({ auth, budget_types }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
    });

    const inputRef = React.useRef();

    const submit = (e) => {
        e.preventDefault();

        post(route("budgetType.store"), {
            onSuccess: () => {
                reset();
                inputRef.current.value = "";
            },
        });
    };

    const cancel = () => {
        if (window.confirm("Tem certeza de que deseja cancelar?")) {
            reset();
        }
    };

    const handleEdit = (budgetType) => {
        // Redirecione para a página de edição do budgetType com base na rota
        router.visit(route("budgetTypes.edit", budgetType.id));
    };

    const handleRemove = (budgetType) => {
        if (window.confirm("Tem certeza de que deseja remover o budgetType?")) {
            // Implemente a lógica para remover o budgetType (por exemplo, fazendo uma solicitação de exclusão)
            // Após a exclusão, redirecione para a página inicial ou uma página apropriada
            router.delete(route("budgetTypes.destroy", budgetType.id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="BudgetType" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <BudgetTypeForm
                    data={data}
                    errors={errors}
                    setData={setData}
                    inputRef={inputRef}
                    submit={submit}
                    cancel={cancel}
                />

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {budgetType.map((budget_Type) => (
                        <div key={budget_Type.id}>
                            <BudgetTypeForm budget_Type={budget_Type} />
                            {auth.user.id === budgetType.user.id && (
                                <div className="mt-2">
                                    <button
                                        onClick={() => handleEdit(budgetType)}
                                        className="text-sm text-blue-500 ml-4"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleRemove(budgetType)}
                                        className="text-sm text-red-500 ml-4"
                                    >
                                        Remover
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}