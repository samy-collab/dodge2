import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/authClient';

export function AppShell() {
  const { session, logout } = useAuth();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" to="/relapses">
          <span>Dodge2</span>
          <small>Recuperacao orientada por contexto</small>
        </Link>
        <nav>
          <NavLink to="/relapses">Historico</NavLink>
          <NavLink to="/analytics">Gatilhos</NavLink>
          <NavLink to="/progress">Progresso</NavLink>
        </nav>
        {session ? (
          <div className="session-card">
            <strong>{session.user.displayName}</strong>
            <span>{session.user.email}</span>
            <button type="button" className="secondary" onClick={logout}>
              Sair
            </button>
          </div>
        ) : null}
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

