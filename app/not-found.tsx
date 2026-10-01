import { Link } from "@/components/ui/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[90vh] flex-col items-center justify-center gap-6 pt-24 text-center">
      <p className="eyebrow text-champagne-deep">Error 404</p>
      <h1 className="display text-display-lg">This object is not in the collection.</h1>
      <p className="prose-lux max-w-[40ch]">The page you’re looking for may have moved or no longer exists.</p>
      <div className="mt-4 flex gap-3">
        <Link href="/" className="btn btn-primary">Return home</Link>
        <Link href="/collections/all" className="btn btn-outline">Browse all</Link>
      </div>
    </div>
  );
}
