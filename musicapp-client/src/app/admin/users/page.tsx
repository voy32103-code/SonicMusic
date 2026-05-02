"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
import { adminService, UserDto } from "@/services/adminService";

const ROLES = ["User", "Artist", "Admin"];
const PAGE_SIZE = 8;

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal state
  const [editingUser, setEditingUser] = useState<UserDto | null>(null);
  const [editRole, setEditRole] = useState("");
  const [deletingUser, setDeletingUser] = useState<UserDto | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    adminService.getUsers()
      .then(setUsers)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  // Filtered + searched users
  const filtered = useMemo(() => {
    let result = users;
    if (roleFilter) result = result.filter(u => u.role === roleFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(u =>
        (u.username || "").toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    }
    return result;
  }, [users, roleFilter, searchQuery]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, roleFilter]);

  // Metrics
  const todayCount = useMemo(() => {
    const today = new Date().toDateString();
    return users.filter(u => new Date(u.createdAt).toDateString() === today).length;
  }, [users]);

  // Edit role
  const openEdit = useCallback((u: UserDto) => { setEditingUser(u); setEditRole(u.role); }, []);
  const handleSaveRole = async () => {
    if (!editingUser || editRole === editingUser.role) { setEditingUser(null); return; }
    setActionLoading(true);
    try {
      const updated = await adminService.updateUserRole(editingUser.id, editRole);
      setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
      setEditingUser(null);
    } catch (err) { console.error(err); }
    finally { setActionLoading(false); }
  };

  // Delete
  const handleDelete = async () => {
    if (!deletingUser) return;
    setActionLoading(true);
    try {
      await adminService.deleteUser(deletingUser.id);
      setUsers(prev => prev.filter(u => u.id !== deletingUser.id));
      setDeletingUser(null);
    } catch (err) { console.error(err); }
    finally { setActionLoading(false); }
  };

  return (
    <div className="bg-surface text-on-surface flex h-screen overflow-hidden antialiased font-body">
      {/* SideNavBar */}
      <nav className="hidden md:flex flex-col h-screen w-72 fixed left-0 top-0 bg-[#131313] p-8 gap-y-6 z-50 border-r border-outline-variant/10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center overflow-hidden shrink-0">
            <img alt="Logo" className="w-full h-full object-cover mix-blend-screen opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrYwEdD1OAQQjT7E1HtayEhT2WKm6CVcuSdAmED5Pufa5pxAXKNHIpP_gMpgQlB_hAWe9yAW1mfr3xFOBR5rmA4-3FbKlBwFUJ3CLhK53ldtK-j3xuBHjBpPvRIABXOk1sM4KsfU8k914t_iq0SMBvPry2eSQ1o4RlQyM-flitIodWjTp7nPQ2n6c28Jto880SdXYd556kMTteXyv0Kpz35fSPvzZYOs2DRT49Z36vzTMU72Md1xUrIqDfDSGzUcgOPfgPVYiwOuW0" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-headline tracking-tight">Sonic Immersive</h1>
            <p className="text-sm text-primary font-medium tracking-wide">Bảng điều khiển</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-grow">
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#adaaaa] hover:text-[#4ffe7e] hover:translate-x-1 transition-all duration-300 font-semibold text-base group" href="/admin">
            <span className="material-symbols-outlined text-xl">dashboard</span><span>Tổng quan</span>
          </Link>
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#4ffe7e] font-bold bg-surface-container-high/50 group opacity-80 scale-[0.98] relative" href="/admin/users">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-primary shadow-[0_0_10px_rgba(79,254,126,0.5)]"></div>
            <span className="material-symbols-outlined text-xl [&]:[font-variation-settings:&apos;FILL&apos;_1]">group</span><span>Người dùng</span>
          </Link>
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#adaaaa] hover:text-[#4ffe7e] hover:translate-x-1 transition-all duration-300 font-semibold text-base group" href="/admin/content">
            <span className="material-symbols-outlined text-xl">library_music</span><span>Nội dung</span>
          </Link>
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#adaaaa] hover:text-[#4ffe7e] hover:translate-x-1 transition-all duration-300 font-semibold text-base group" href="/admin/revenue">
            <span className="material-symbols-outlined text-xl">payments</span><span>Doanh thu</span>
          </Link>
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#adaaaa] hover:text-[#4ffe7e] hover:translate-x-1 transition-all duration-300 font-semibold text-base group" href="/admin/analytics">
            <span className="material-symbols-outlined text-xl">insights</span><span>Phân tích</span>
          </Link>
        </div>
        <div className="flex flex-col gap-2 mt-auto">
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#adaaaa] hover:text-[#4ffe7e] hover:translate-x-1 transition-all duration-300 font-semibold text-base group" href="/admin/support">
            <span className="material-symbols-outlined text-xl">help_outline</span><span>Hỗ trợ</span>
          </Link>
          <a className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#adaaaa] hover:text-error hover:translate-x-1 transition-all duration-300 font-semibold text-base group cursor-pointer" onClick={handleLogout}>
            <span className="material-symbols-outlined text-xl">logout</span><span>Đăng xuất</span>
          </a>
        </div>
      </nav>

      <main className="md:ml-72 flex-1 flex flex-col h-screen overflow-hidden relative bg-surface">
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        {/* TopAppBar */}
        <header className="flex justify-between items-center w-full px-8 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl sticky top-0 z-40 border-b border-outline-variant/10">
          <div className="flex items-center gap-4 md:hidden">
            <span className="text-2xl font-black tracking-tighter text-primary">Sonic Admin</span>
          </div>
          <div className="hidden md:flex items-center gap-4 w-1/3">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
              <input
                className="bg-surface-container-high text-on-surface rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/15 text-sm placeholder:text-on-surface-variant"
                placeholder="Tìm kiếm..."
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-on-surface md:hidden text-center absolute left-1/2 transform -translate-x-1/2">Người dùng</h2>
          <div className="flex items-center gap-4 ml-auto">
            <button className="text-[#adaaaa] hover:text-white transition-colors p-2 rounded-full hover:bg-surface-container-high">
              <span className="material-symbols-outlined text-xl">notifications</span>
            </button>
            <button className="text-[#adaaaa] hover:text-white transition-colors p-2 rounded-full hover:bg-surface-container-high">
              <span className="material-symbols-outlined text-xl">settings</span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden ml-2 border border-outline-variant/15">
              <img alt="Admin" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5Uvkz81Q2AUfkEa3x0C02io327H0MPfTITHrJCpl4M0T3sinn1p0RiSLv_UbhEcqGTIszteoyPIfqHxLFyg6szZyXDI11z5s9MSF9LV-U9f6mIT3iJ9eIZNDS31bbwDYwFw1JufwRp_PxMabcA3hpmxW_d4sFyphOZ2vCmIs3kPSYQiQr4Mkv2Mcyd4uco8EIAcnTc6yMujoFMvXJdBxO2h0n7AZ-N_6iJNRM_ty1RYO0RD4lLfUvPSkfYDT3r3gqFgA3v5YZn5mB" />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8 relative z-10">
          <div className="mb-12">
            <h2 className="text-[3.5rem] font-headline font-black tracking-tight leading-tight text-on-surface mb-2">Danh bạ người dùng</h2>
            <p className="text-on-surface-variant text-lg">Quản lý quyền truy cập, vai trò và gói đăng ký.</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-surface-container-high/60 backdrop-blur-xl border border-outline-variant/15 rounded-xl p-6 relative overflow-hidden group shadow-[0_0_30px_rgba(255,255,255,0.02)]">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
              <div className="relative z-10">
                <p className="text-on-surface-variant text-sm font-semibold uppercase tracking-wider mb-2">Tổng người dùng</p>
                <h3 className="text-4xl font-bold text-on-surface">{isLoading ? "-" : users.length}</h3>
                <p className="text-primary mt-2 text-sm font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  +12% tháng này
                </p>
              </div>
            </div>
            <div className="bg-surface-container-high/60 backdrop-blur-xl border border-outline-variant/15 rounded-xl p-6 relative overflow-hidden group shadow-[0_0_30px_rgba(255,255,255,0.02)]">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-tertiary/10 rounded-full blur-3xl group-hover:bg-tertiary/20 transition-all duration-500"></div>
              <div className="relative z-10">
                <p className="text-on-surface-variant text-sm font-semibold uppercase tracking-wider mb-2">Đang hoạt động</p>
                <h3 className="text-4xl font-bold text-on-surface">{isLoading ? "-" : filtered.length}</h3>
                <div className="mt-4 h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary rounded-full shadow-[0_0_10px_rgba(134,236,255,0.5)] transition-all duration-500" style={{ width: users.length ? `${Math.round((filtered.length / users.length) * 100)}%` : '0%' }}></div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-high/60 backdrop-blur-xl border border-outline-variant/15 rounded-xl p-6 relative overflow-hidden group shadow-[0_0_30px_rgba(255,255,255,0.02)]">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-500"></div>
              <div className="relative z-10">
                <p className="text-on-surface-variant text-sm font-semibold uppercase tracking-wider mb-2">Đăng ký mới</p>
                <h3 className="text-4xl font-bold text-on-surface">{isLoading ? "-" : todayCount}</h3>
                <p className="text-on-surface-variant mt-2 text-sm">Hôm nay</p>
              </div>
            </div>
          </div>

          {/* Controls: Search & Filter */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
            <div className="w-full md:w-96">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                <input
                  className="w-full bg-surface-container-high/50 border border-outline-variant/15 text-on-surface rounded-full py-3 pl-12 pr-4 focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-on-surface-variant/50 text-sm"
                  placeholder="Tìm người dùng theo tên hoặc email..."
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3">
              {ROLES.map(r => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(roleFilter === r ? null : r)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2 border ${
                    roleFilter === r
                      ? "bg-primary/20 text-primary border-primary/30 font-bold"
                      : "bg-surface-container-high/50 hover:bg-surface-container-highest text-on-surface border-outline-variant/15"
                  }`}
                >
                  {r}
                </button>
              ))}
              {roleFilter && (
                <button onClick={() => setRoleFilter(null)} className="px-4 py-2.5 rounded-full text-sm font-medium text-error hover:bg-error/10 transition-colors border border-error/20">
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Data Table */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              <div className="col-span-4">Người dùng</div>
              <div className="col-span-2">Vai trò</div>
              <div className="col-span-2">Gói đăng ký</div>
              <div className="col-span-2">Hoạt động gần đây</div>
              <div className="col-span-2 text-right">Thao tác</div>
            </div>

            {isLoading ? (
              <div className="p-8 text-center text-on-surface-variant">Đang tải danh bạ người dùng...</div>
            ) : paged.length === 0 ? (
              <div className="p-8 text-center text-on-surface-variant">Không tìm thấy người dùng.</div>
            ) : (
              paged.map((user) => (
                <div key={user.id} className="grid grid-cols-12 gap-4 items-center bg-surface-container-low hover:bg-surface-container-high p-4 rounded-xl transition-colors duration-300 border border-outline-variant/10">
                  <div className="col-span-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 text-on-surface-variant font-bold">
                      {(user.username || user.email).substring(0, 2).toUpperCase()}
                    </div>
                    <div className="truncate">
                      <p className="text-on-surface font-semibold truncate">{user.username || "Không rõ"}</p>
                      <p className="text-on-surface-variant text-sm truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                      user.role === "Admin" ? "bg-primary/10 text-primary border-primary/20"
                        : user.role === "Artist" ? "bg-tertiary/10 text-tertiary border-tertiary/20"
                        : "bg-surface-container-highest text-on-surface-variant border-outline-variant/20"
                    }`}>{user.role}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-on-surface text-sm font-medium">{user.role === "Admin" ? "N/A" : "Free"}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-on-surface-variant text-sm">{new Date(user.createdAt).toLocaleDateString("vi-VN")}</span>
                  </div>
                  <div className="col-span-2 flex justify-end gap-2">
                    <button onClick={() => openEdit(user)} className="p-2 rounded-full hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors" title="Chỉnh sửa vai trò">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button onClick={() => setDeletingUser(user)} className="p-2 rounded-full hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors" title="Xóa người dùng">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest transition-colors border border-outline-variant/10 disabled:opacity-30"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors border ${
                    p === currentPage
                      ? "bg-primary text-on-primary shadow-[0_0_15px_rgba(79,254,126,0.3)] border-primary"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest border-outline-variant/10"
                  }`}
                >{p}</button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest transition-colors border border-outline-variant/10 disabled:opacity-30"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
              <span className="text-on-surface-variant text-sm ml-4">
                {filtered.length} người dùng
              </span>
            </div>
          )}
        </div>
      </main>

      {/* Edit Role Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => !actionLoading && setEditingUser(null)}>
          <div className="bg-surface-container-high border border-outline-variant/20 rounded-2xl p-8 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-on-surface mb-1">Chỉnh sửa vai trò</h3>
            <p className="text-on-surface-variant text-sm mb-6">Thay đổi vai trò cho <span className="text-on-surface font-semibold">{editingUser.username || editingUser.email}</span></p>
            <div className="flex flex-col gap-3 mb-8">
              {ROLES.map(r => (
                <button
                  key={r}
                  onClick={() => setEditRole(r)}
                  className={`flex items-center justify-between px-5 py-3 rounded-xl border transition-all ${
                    editRole === r
                      ? "bg-primary/10 border-primary/30 text-primary font-bold"
                      : "bg-surface-container-low border-outline-variant/15 text-on-surface hover:bg-surface-container-highest"
                  }`}
                >
                  <span>{r}</span>
                  {editRole === r && <span className="material-symbols-outlined text-primary">check_circle</span>}
                </button>
              ))}
            </div>
            <div className="flex gap-3 justify-end">
              <button disabled={actionLoading} onClick={() => setEditingUser(null)} className="px-6 py-2.5 rounded-full text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">
                Hủy
              </button>
              <button disabled={actionLoading} onClick={handleSaveRole} className="px-6 py-2.5 rounded-full text-sm font-bold bg-primary text-on-primary hover:bg-primary-container transition-colors disabled:opacity-50">
                {actionLoading ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => !actionLoading && setDeletingUser(null)}>
          <div className="bg-surface-container-high border border-outline-variant/20 rounded-2xl p-8 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-error text-2xl">warning</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-on-surface">Xóa người dùng</h3>
                <p className="text-on-surface-variant text-sm">Hành động này không thể hoàn tác.</p>
              </div>
            </div>
            <p className="text-on-surface-variant mb-8">
              Bạn có chắc muốn xóa <span className="text-on-surface font-semibold">{deletingUser.username || deletingUser.email}</span>? Tất cả dữ liệu liên quan sẽ bị mất vĩnh viễn.
            </p>
            <div className="flex gap-3 justify-end">
              <button disabled={actionLoading} onClick={() => setDeletingUser(null)} className="px-6 py-2.5 rounded-full text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">
                Hủy
              </button>
              <button disabled={actionLoading} onClick={handleDelete} className="px-6 py-2.5 rounded-full text-sm font-bold bg-error text-white hover:bg-error-container transition-colors disabled:opacity-50">
                {actionLoading ? "Đang xóa..." : "Xác nhận xóa"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
