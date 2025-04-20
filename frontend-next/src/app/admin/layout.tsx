import AdminRoute from "@/components/admin/AdminRoute";

export default function AdminPage({ children }: { children: React.ReactNode }) {
  return (
    <AdminRoute>
      {children}
    </AdminRoute>
  );
}
