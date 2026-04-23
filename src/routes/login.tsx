import { useForm } from '@tanstack/react-form';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Lock, Mail, Shield } from 'lucide-react';
import { z } from 'zod';
import { useAuthStore } from '../features/auth/authStore';

export const Route = createFileRoute('/login')({
  component: Login,
});

const emailSchema = z.string().min(1, 'Email is required').email('Invalid email address');
const passwordSchema = z.string().min(1, 'Password is required');

function Login() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      const initials = value.email.substring(0, 2).toUpperCase();
      login(initials);
      navigate({ to: '/' });
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative z-10">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-primary)]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-md bg-[var(--color-card-bg)] border border-[#2e323a] shadow-2xl relative z-10 flex flex-col">
        
        <div className="flex flex-col items-center p-8 pb-6 border-b border-[#2e323a] bg-gradient-to-b from-[#1c1f26] to-[var(--color-input-bg)]">
          <div className="w-16 h-16 mb-4 bg-[#111318] border border-[#2e323a] flex items-center justify-center rounded-lg shadow-inner overflow-hidden">
            <img 
              src="/logo.png" 
              alt="KOA Logo" 
              className="w-10 h-10 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }} 
            />
            <Shield className="w-8 h-8 text-[var(--color-primary)] hidden" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-white uppercase font-sans">Kent Owl Academy</h1>
          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-mono">Secure Access Portal</p>
        </div>

        <div className="p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="flex flex-col gap-6"
          >
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  const res = emailSchema.safeParse(value);
                  return !res.success ? res.error.errors[0].message : undefined;
                }
              }}
              children={(field) => (
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold ml-1 font-mono">Email Address</label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 w-4 h-4 text-slate-500" />
                    <input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="zla1981@kentowlacademy.com"
                      className="w-full bg-[var(--color-input-bg)] border border-[#2e323a] text-slate-200 text-sm pl-10 pr-3 py-3 focus:outline-none focus:border-[var(--color-primary)] focus:bg-[#15181f] transition-all font-mono"
                    />
                  </div>
                  {field.state.meta.errors ? (
                    <em className="text-[10px] text-red-500 font-mono ml-1">{field.state.meta.errors.join(', ')}</em>
                  ) : null}
                </div>
              )}
            />

            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  const res = passwordSchema.safeParse(value);
                  return !res.success ? res.error.errors[0].message : undefined;
                }
              }}
              children={(field) => (
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold ml-1 font-mono">Access PIN / Password</label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[var(--color-input-bg)] border border-[#2e323a] text-slate-200 text-sm pl-10 pr-3 py-3 focus:outline-none focus:border-[var(--color-primary)] focus:bg-[#15181f] transition-all font-mono"
                    />
                  </div>
                  {field.state.meta.errors ? (
                    <em className="text-[10px] text-red-500 font-mono ml-1">{field.state.meta.errors.join(', ')}</em>
                  ) : null}
                </div>
              )}
            />

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="mt-2 w-full bg-[#20324a] hover:bg-[var(--color-primary)] disabled:bg-[#1a2638] disabled:text-slate-600 text-slate-200 font-mono text-[11px] font-bold uppercase tracking-widest py-3 border border-[#2e323a] hover:border-[var(--color-primary)] transition-all"
                >
                  {isSubmitting ? 'Authorizing...' : 'Authenticate'}
                </button>
              )}
            />
          </form>
        </div>

        <div className="px-8 py-5 border-t border-[#2e323a] bg-[#111318]">
          <p className="text-[9px] leading-relaxed text-slate-500 font-mono uppercase text-center">
            Restricted System. Unauthorized access is an offence under the <span className="text-[var(--color-primary)]">Computer Misuse Act 1990</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
