function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-zinc-900 ${className}`} />;
}

function StatSkeleton({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black/30 p-4">
      <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
        {label}
      </div>

      <SkeletonBlock className="mt-3 h-6 w-24" />
      <SkeletonBlock className="mt-2 h-3 w-20" />
    </div>
  );
}

function RuleSkeleton({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black/30 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
            {label}
          </div>
          <SkeletonBlock className="mt-3 h-5 w-28" />
        </div>

        <SkeletonBlock className="h-7 w-24 rounded-full" />
      </div>

      <SkeletonBlock className="mt-4 h-2 w-full rounded-full" />
      <SkeletonBlock className="mt-4 h-3 w-4/5" />
      <SkeletonBlock className="mt-2 h-3 w-3/5" />
    </div>
  );
}

function BetCardSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black/30 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <SkeletonBlock className="h-6 w-36" />
          <SkeletonBlock className="mt-2 h-4 w-20" />
        </div>

        <SkeletonBlock className="h-7 w-16 rounded-full" />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-zinc-800 pt-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
            Stake
          </div>
          <SkeletonBlock className="mt-2 h-4 w-14" />
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
            Payout
          </div>
          <SkeletonBlock className="mt-2 h-4 w-16" />
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
            P/L
          </div>
          <SkeletonBlock className="mt-2 h-4 w-14" />
        </div>
      </div>

      <SkeletonBlock className="mt-4 h-4 w-32" />
    </div>
  );
}

export default function LoadingAccountPage() {
  return (
    <div className="min-h-screen bg-[#09090b] px-5 pt-20 pb-24 text-white md:pb-0 md:pt-0">
      <div className="mx-auto w-full max-w-5xl md:py-16">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Account Overview
          </p>

          <SkeletonBlock className="mt-3 h-10 w-64" />
          <SkeletonBlock className="mt-3 h-4 w-80 max-w-full" />
        </div>

        <div className="mb-6 rounded-[24px] border border-zinc-800 bg-zinc-950 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <SkeletonBlock className="h-7 w-20 rounded-full" />
              <SkeletonBlock className="mt-4 h-12 w-56" />
              <p className="mt-2 text-sm text-zinc-500">Available balance</p>
            </div>

            <div className="min-w-[220px] rounded-2xl border border-zinc-800 bg-black/30 p-4">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-zinc-500">Target</span>
                <SkeletonBlock className="h-4 w-24" />
              </div>

              <SkeletonBlock className="mt-3 h-2 w-full rounded-full" />
              <SkeletonBlock className="mt-3 h-3 w-36" />
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <StatSkeleton label="Realized P/L" />
            <StatSkeleton label="Rule Equity" />
            <StatSkeleton label="Reserved Risk" />
            <StatSkeleton label="Max Bet" />
            <StatSkeleton label="Starting" />
          </div>
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-2">
          <RuleSkeleton label="Daily Floor" />
          <RuleSkeleton label="Total Floor" />
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatSkeleton label="Account Size" />
          <StatSkeleton label="Fee" />
          <StatSkeleton label="Profit Target" />
          <StatSkeleton label="Positions" />
        </div>

        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
              Open Positions
            </h2>

            <div className="text-sm text-zinc-500">
              reserved:{" "}
              <SkeletonBlock className="inline-block h-4 w-20 align-middle" />
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            <BetCardSkeleton />
            <BetCardSkeleton />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-100">
            Past Positions
          </h2>

          <div className="grid gap-3 lg:grid-cols-2">
            <BetCardSkeleton />
            <BetCardSkeleton />
          </div>
        </section>
      </div>
    </div>
  );
}