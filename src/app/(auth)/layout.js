export default function AuthLayout({ children }) {
  return (
    <main className="flex w-full items-center justify-center px-3 py-12 select-none">
      {/* card */}
      <section className="sm:border-border sm:dark:bg-dark/80 sm:bg-light/80 relative flex min-h-72 w-full max-w-sm flex-col justify-between gap-8 rounded-2xl py-10 sm:border sm:px-8">
        {children}
      </section>
    </main>
  );
}
