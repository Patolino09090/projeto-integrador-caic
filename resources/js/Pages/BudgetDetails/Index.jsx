import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import budgetDetailForm from "@/Components/BudgetDetailForm";
import budgetDetail from "@/Components/BudgetDetail";
import { router } from "@inertiajs/react";

export default function Index({ auth, budgetDetail }) {
    const { data, setData, budgetDetail, processing, reset, errors } = useForm({
        titulo: "",
        conteudo: "",
    });

    const inputRef = React.useRef();

    const submit = (e) => {
        e.preventDefault();

        budgetDetail(route("budgetDetail.store"), {
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

    const handleEdit = (budgetDetail) => {
        // Redirecione para a página de edição do budgetDetail com base na rota
        router.visit(route("budgetDetail.edit", budgetDetail.id));
    };

    const handleRemove = (budgetDetail) => {
        if (window.confirm("Tem certeza de que deseja remover o budgetDetail?")) {
            // Implemente a lógica para remover o budgetDetail (por exemplo, fazendo uma solicitação de exclusão)
            // Após a exclusão, redirecione para a página inicial ou uma página apropriada
            router.delete(route("budgetDetail.destroy", budgetDetail.id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="budgetDetail" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <budgetDetailForm
                    data={data}
                    errors={errors}
                    setData={setData}
                    inputRef={inputRef}
                    submit={submit}
                    cancel={cancel}
                />

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {budgetDetail.map((budgetDetail) => (
                        <div key={budgetDetail.id}>
                            <budgetDetail budgetDetail={budgetDetail} />
                            {auth.user.id === budgetDetail.user.id && (
                                <div className="mt-2">
                                    <button
                                        onClick={() => handleEdit(budgetDetail)}
                                        className="text-sm text-blue-500 ml-4"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleRemove(budgetDetail)}
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