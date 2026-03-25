import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Droplets,
  Pill,
  Search,
  Syringe,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { type DrugView, Variant_injection_oral_topical } from "../backend.d";
import { SAMPLE_DRUGS } from "../data/sampleData";
import { useAllDrugs } from "../hooks/useQueries";

const ROUTE_ICONS: Record<Variant_injection_oral_topical, typeof Syringe> = {
  [Variant_injection_oral_topical.injection]: Syringe,
  [Variant_injection_oral_topical.oral]: Pill,
  [Variant_injection_oral_topical.topical]: Droplets,
};

const ROUTE_STYLES: Record<Variant_injection_oral_topical, string> = {
  [Variant_injection_oral_topical.injection]:
    "bg-red-50 text-red-600 border-red-200",
  [Variant_injection_oral_topical.oral]:
    "bg-blue-50 text-blue-600 border-blue-200",
  [Variant_injection_oral_topical.topical]:
    "bg-purple-50 text-purple-600 border-purple-200",
};

function DrugCard({ drug, onClick }: { drug: DrugView; onClick: () => void }) {
  const RouteIcon = ROUTE_ICONS[drug.route];
  return (
    <Card
      className="cursor-pointer hover:shadow-card-hover transition-all duration-200 group border-border gallery-card"
      onClick={onClick}
      data-ocid="drug.card"
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-semibold text-brand-navy group-hover:text-brand-blue transition-colors text-base leading-tight pr-2">
            {drug.name}
          </h3>
          <Badge
            className={`shrink-0 text-xs flex items-center gap-1 ${ROUTE_STYLES[drug.route]}`}
          >
            <RouteIcon size={10} />
            <span className="capitalize">{drug.route}</span>
          </Badge>
        </div>
        <Badge variant="outline" className="text-xs mb-3">
          {drug.drugClass}
        </Badge>
        <p className="text-muted-foreground text-xs line-clamp-2 mb-3">
          {drug.indications.slice(0, 3).join(" · ")}
        </p>
        <div className="flex items-center text-brand-blue text-xs font-medium gap-1">
          View Details <ChevronRight size={12} />
        </div>
      </CardContent>
    </Card>
  );
}

function DrugModal({ drug, onClose }: { drug: DrugView; onClose: () => void }) {
  const RouteIcon = ROUTE_ICONS[drug.route];
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        data-ocid="drug.dialog"
      >
        <DialogHeader>
          <div className="flex items-center gap-2 flex-wrap">
            <DialogTitle className="font-heading text-brand-navy text-xl">
              {drug.name}
            </DialogTitle>
            <Badge
              className={`flex items-center gap-1 text-xs ${ROUTE_STYLES[drug.route]}`}
            >
              <RouteIcon size={10} />
              <span className="capitalize">{drug.route}</span>
            </Badge>
          </div>
        </DialogHeader>
        <div className="space-y-5 mt-2">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Drug Class
            </p>
            <Badge variant="outline">{drug.drugClass}</Badge>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Dosage
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-brand-navy font-medium leading-relaxed">
                {drug.dosage}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Indications
            </p>
            <ul className="space-y-1">
              {drug.indications.map((ind) => (
                <li key={ind} className="flex items-start gap-2 text-sm">
                  <CheckCircle
                    size={12}
                    className="text-green-500 mt-1 shrink-0"
                  />
                  {ind}
                </li>
              ))}
            </ul>
          </div>
          {drug.treats.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Treats Diseases
              </p>
              <div className="flex flex-wrap gap-1">
                {drug.treats.map((t) => (
                  <Badge
                    key={t}
                    className="bg-blue-100 text-blue-700 border-blue-200"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {drug.quality.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Quality & Standards
              </p>
              <ul className="space-y-1">
                {drug.quality.map((q) => (
                  <li key={q} className="flex items-start gap-2 text-sm">
                    <CheckCircle
                      size={12}
                      className="text-brand-blue mt-1 shrink-0"
                    />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Side Effects
            </p>
            <div className="bg-amber-50 rounded-lg p-4">
              <ul className="space-y-1">
                {drug.sideEffects.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2 text-sm text-amber-800"
                  >
                    <AlertCircle
                      size={12}
                      className="text-amber-500 mt-1 shrink-0"
                    />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Contraindications
            </p>
            <div className="bg-red-50 rounded-lg p-4">
              <ul className="space-y-1">
                {drug.contraindications.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-2 text-sm text-red-800"
                  >
                    <XCircle size={12} className="text-red-500 mt-1 shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function DrugsPage() {
  const { data, isLoading } = useAllDrugs();
  const drugs = data && data.length > 0 ? data : SAMPLE_DRUGS;
  const [search, setSearch] = useState("");
  const [routeFilter, setRouteFilter] = useState<
    Variant_injection_oral_topical | "all"
  >("all");
  const [selected, setSelected] = useState<DrugView | null>(null);

  const filtered = drugs.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.drugClass.toLowerCase().includes(search.toLowerCase()) ||
      d.indications.some((ind) =>
        ind.toLowerCase().includes(search.toLowerCase()),
      );
    const matchRoute = routeFilter === "all" || d.route === routeFilter;
    return matchSearch && matchRoute;
  });

  return (
    <main className="min-h-screen">
      <div className="bg-brand-hero py-12 px-4 border-b border-border">
        <div className="container max-w-7xl mx-auto">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-brand-navy mb-2">
            Drug Reference
          </h1>
          <p className="text-muted-foreground">
            Complete drug information: dosages, routes, side effects and
            contraindications
          </p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-4 mb-8">
          <div className="relative max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search drugs, drug class, indications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-full"
              data-ocid="drug.search_input"
            />
          </div>
          <div className="flex gap-2" data-ocid="drug.filter.tab">
            {(
              ["all", ...Object.values(Variant_injection_oral_topical)] as const
            ).map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setRouteFilter(r)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border capitalize transition-colors ${
                  routeFilter === r
                    ? "bg-brand-blue text-white border-brand-blue"
                    : "border-border text-muted-foreground hover:border-brand-blue hover:text-brand-blue"
                }`}
              >
                {r === "all" ? "All Routes" : r}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="drug.loading_state"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
              <Card key={i}>
                <CardContent className="p-5">
                  <Skeleton className="h-5 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" data-ocid="drug.empty_state">
            <p className="text-muted-foreground">
              No drugs found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((d, i) => (
              <div
                key={d.name}
                className="animate-fadeInUp"
                style={{ animationDelay: `${i * 0.05}s` }}
                data-ocid={`drug.item.${i + 1}`}
              >
                <DrugCard drug={d} onClick={() => setSelected(d)} />
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <DrugModal drug={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}
