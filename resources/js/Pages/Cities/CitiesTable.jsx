import DataTable from '@/Components/DataTable';
import NavLink from '@/Components/NavLink';
import TableBody from '@/Components/TableBody';
import TableButton from '@/Components/TableButton';
import TableCell from '@/Components/TableCell';
import TableHeader from '@/Components/TableHeader';
import TableHeaderCell from '@/Components/TableHeaderCell';
import TableRow from '@/Components/TableRow';
import { usePage } from '@inertiajs/react';
import { router } from "@inertiajs/react";

const CustomTable = () => {
  const { cities } = usePage().props;

  const handleRemove = (state) => {
    if (window.confirm(`Are you sure you want to remove the ${state.name}`)) {
        // Implemente a lógica para remover o post (por exemplo, fazendo uma solicitação de exclusão)
        // Após a exclusão, redirecione para a página inicial ou uma página apropriada
        router.delete(route("cities.destroy", state.id));
    }
};

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center gap-4 mb-2">
        <NavLink
          href={route('cities.create')}
          active={route().current('cities.index')}
          className="inline-block py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          New City
        </NavLink>
      </div>

      <DataTable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell colSpan={2} style={{ width: '20%' }}>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cities.map((city) => (
            <TableRow key={city.id}>
              <TableCell style={{ width: '70%' }}>{city.name}</TableCell>
              <TableCell style={{ width: '10%' }}>
                <NavLink
                  href={route('cities.edit', { city: city.id })}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </NavLink>
              </TableCell>
              <TableCell style={{ width: '10%' }}>
                <TableButton
                  onClick={() => handleRemove(city)}
                  className="text-red-600 dark:text-red-500 hover:underline"
                >
                  Delete
                </TableButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    </div>
  );
};

export default CustomTable;
