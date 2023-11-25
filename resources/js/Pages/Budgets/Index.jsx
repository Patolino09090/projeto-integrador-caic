import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import budgetForm from "@/Components/BudgetForm";
import budget from "@/Components/Budget";
import { router } from "@inertiajs/react";

export default function Index({ auth, budget }) {
    const { data, setData, budget, processing, reset, errors } = useForm({
        titulo: "",
        conteudo: "",
    });

    const inputRef = React.useRef();

    const submit = (e) => {
        e.preventDefault();

        budget(route("budget.store"), {
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

    const handleEdit = (budget) => {
        // Redirecione para a página de edição do budget com base na rota
        router.visit(route("budget.edit", budget.id));
    };

    const handleRemove = (budget) => {
        if (window.confirm("Tem certeza de que deseja remover o budget?")) {
            // Implemente a lógica para remover o budget (por exemplo, fazendo uma solicitação de exclusão)
            // Após a exclusão, redirecione para a página inicial ou uma página apropriada
            router.delete(route("budget.destroy", budget.id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="budget" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <budgetForm
                    data={data}
                    errors={errors}
                    setData={setData}
                    inputRef={inputRef}
                    submit={submit}
                    cancel={cancel}
                />

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {budget.map((budget) => (
                        <div key={budget.id}>
                            <budget budget={budget} />
                            {auth.user.id === budget.user.id && (
                                <div className="mt-2">
                                    <button
                                        onClick={() => handleEdit(budget)}
                                        className="text-sm text-blue-500 ml-4"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleRemove(budget)}
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