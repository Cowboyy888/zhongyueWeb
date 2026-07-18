import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";

type BreadcrumbItem = { name: string; href: string };

type BreadcrumbProps = { items: BreadcrumbItem[] };

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <>
      <JsonLd schema={breadcrumbSchema(items)} />
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-400 mb-6">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true" className="text-zinc-600">/</span>}
                {isLast ? (
                  <span aria-current="page" className="text-amber-400">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
