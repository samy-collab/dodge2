import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/authClient';

export function AuthPage() {
  const { session, login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState<string | null>(null);

  if (session) {
    return <Navigate to="/relapses" replace />;
  }

  return (
    <section className="auth-layout">
      <article className="auth-hero">
        <span className="eyebrow">Privado e focado</span>
        <h1>Entenda gatilhos, acompanhe progresso e mantenha um historico confiavel.</h1>
        <p>
          Registre recaidas com contexto, encontre padroes pessoais e acompanhe
          sequencias sem exposicao social.
        </p>
      </article>

      <form
        className="panel auth-card"
        onSubmit={async (event) => {
          event.preventDefault();
          setError(null);
          const formData = new FormData(event.currentTarget);
          const payload = {
            email: String(formData.get('email') ?? ''),
            password: String(formData.get('password') ?? ''),
          };

          try {
            if (mode === 'login') {
              await login(payload);
            } else {
              await register({
                ...payload,
                displayName: String(formData.get('displayName') ?? ''),
                timezone:
                  String(formData.get('timezone') ?? '') || Intl.DateTimeFormat().resolvedOptions().timeZone,
              });
            }
          } catch (submissionError) {
            setError(
              submissionError instanceof Error
                ? submissionError.message
                : 'Nao foi possivel autenticar.',
            );
          }
        }}
      >
        <div className="panel-heading">
          <h2>{mode === 'login' ? 'Entrar' : 'Criar conta'}</h2>
          <p>Use um e-mail valido para manter suas informacoes sincronizadas.</p>
        </div>

        {mode === 'register' ? (
          <label>
            Nome de exibicao
            <input name="displayName" minLength={2} maxLength={80} required />
          </label>
        ) : null}

        <label>
          E-mail
          <input name="email" type="email" required />
        </label>

        <label>
          Senha
          <input name="password" type="password" minLength={8} required />
        </label>

        {mode === 'register' ? (
          <label>
            Fuso horario
            <input
              name="timezone"
              defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}
              required
            />
          </label>
        ) : null}

        {error ? <p className="error-banner">{error}</p> : null}

        <button type="submit">{mode === 'login' ? 'Entrar agora' : 'Criar conta'}</button>
        <button
          type="button"
          className="secondary"
          onClick={() => setMode((current) => (current === 'login' ? 'register' : 'login'))}
        >
          {mode === 'login' ? 'Ainda nao tenho conta' : 'Ja tenho conta'}
        </button>
      </form>
    </section>
  );
}

