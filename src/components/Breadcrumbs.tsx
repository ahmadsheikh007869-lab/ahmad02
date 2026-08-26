import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  to?: string;
}

export const Breadcrumbs = ({ items }: { items: Crumb[] }) => (
  <nav aria-label="Breadcrumb" className="container-full py-4 border-b border-border">
    <ol className="flex items-center gap-2 text-xs text-muted-foreground overflow-x-auto no-scrollbar">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2 shrink-0 max-w-full">
            {item.to && !last ? (
              <Link to={item.to} className="hover:text-foreground transition-colors whitespace-nowrap">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground truncate" aria-current={last ? "page" : undefined}>
                {item.label}
              </span>
            )}
            {!last && <ChevronRight className="w-3 h-3 shrink-0" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  </nav>
);
