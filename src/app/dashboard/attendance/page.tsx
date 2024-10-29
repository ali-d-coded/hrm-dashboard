import { getAttendances } from "@/actions/attendance";
import AttendanceTable from "@/components/dashboard/attendance/AttendanceTable";
import { DynamicData } from "@/lib/contants";

export default async function Attendance() {
  const attendanceData: DynamicData[] = (await getAttendances()) || [];

  return (
    <div className="p-5">
      <AttendanceTable attendanceData={attendanceData} />
    </div>
  );
}
