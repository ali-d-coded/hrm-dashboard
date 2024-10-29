export default async function CreateEmployee() {
  // const departments: DynamicData[] = (await getDepartments()) || [];
  // const positions: DynamicData[] = (await getPositions()) || [];

  return (
    <div className="p-5">
      {/* <CreateEmployeeForm
        className="w-full max-w-[700px] mx-auto border p-5"
        departments={departments?.map((it) => ({
          label: it.title,
          value: it.id,
        }))}
        positions={positions?.map((it) => ({ label: it.title, value: it.id }))}
      /> */}
    </div>
  );
}
