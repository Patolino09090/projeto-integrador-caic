import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { router } from "@inertiajs/react";
import NavLink from '@/Components/NavLink';
import BudgetTypeTable from './BudgetTypeTable';

export default function Index({ auth, budgetType }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">BudgetType</h2>}
        >
            <Head title="BudgetType" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <BudgetTypeTable budgetType={budgetType} />
            </div>
        </AuthenticatedLayout>
    );
}