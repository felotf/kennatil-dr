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
import { AlertTriangle, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import {
  Animal,
  type DiseaseView,
  Variant_mild_severe_moderate,
} from "../backend.d";
import { SAMPLE_DISEASES } from "../data/sampleData";
import { useAllDiseases } from "../hooks/useQueries";

const ANIMALS = Object.values(Animal);

const SEVERITY_STYLES: Record<Variant_mild_severe_moderate, string> = {
  [Variant_mild_severe_moderate.mild]:
    "bg-green-100 text-green-700 border-green-200",
  [Variant_mild_severe_moderate.moderate]:
    "bg-amber-100 text-amber-700 border-amber-200",
  [Variant_mild_severe_moderate.severe]:
    "bg-red-100 text-red-700 border-red-200",
};

function DiseaseCard({
  disease,
  onClick,
}: { disease: DiseaseView; onClick: () => void }) {
  return (
    <Card
      className="cursor-pointer hover:shadow-card-hover transition-all duration-200 group border-border"
      onClick={onClick}
      data-ocid="disease.card"
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-heading font-semibold text-brand-navy group-hover:text-brand-blue transition-colors text-base leading-tight pr-2">
            {disease.name}
          </h3>
          <Badge
            className={`shrink-0 text-xs capitalize ${SEVERITY_STYLES[disease.severity]}`}
          >
            {disease.severity}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {disease.affectedAnimals.map((a) => (
            <Badge key={a} variant="outline" className="text-xs capitalize">
              {a}
            </Badge>
          ))}
        </div>
        <p className="text-muted-foreground text-xs line-clamp-2 mb-3">
          {disease.symptoms.slice(0, 3).join(" · ")}
        </p>
        <div className="flex items-center text-brand-blue text-xs font-medium gap-1">
          View Details <ChevronRight size={12} />
        </div>
      </CardContent>
    </Card>
  );
}

function DiseaseModal({
  disease,
  onClose,
}: { disease: DiseaseView; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        data-ocid="disease.dialog"
      >
        <DialogHeader>
          <div className="flex items-center gap-2 flex-wrap">
            <DialogTitle className="font-heading text-brand-navy text-xl">
              {disease.name}
            </DialogTitle>
            <Badge
              className={`capitalize text-xs ${SEVERITY_STYLES[disease.severity]}`}
            >
              {disease.severity}
            </Badge>
          </div>
        </DialogHeader>
        <div className="space-y-5 mt-2">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Affected Animals
            </p>
            <div className="flex flex-wrap gap-1">
              {disease.affectedAnimals.map((a) => (
                <Badge key={a} variant="outline" className="capitalize">
                  {a}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Symptoms
            </p>
            <ul className="space-y-1">
              {disease.symptoms.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <AlertTriangle
                    size={12}
                    className="text-amber-500 mt-1 shrink-0"
                  />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Causes
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              {disease.causes}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Treatment
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-brand-navy leading-relaxed">
                {disease.treatment}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Prevention
            </p>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-800 leading-relaxed">
                {disease.prevention}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function DiseasesPage() {
  const { data, isLoading } = useAllDiseases();
  const diseases = data && data.length > 0 ? data : SAMPLE_DISEASES;
  const [search, setSearch] = useState("");
  const [animalFilter, setAnimalFilter] = useState<Animal | "all">("all");
  const [selected, setSelected] = useState<DiseaseView | null>(null);

  const filtered = diseases.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.symptoms.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchAnimal =
      animalFilter === "all" || d.affectedAnimals.includes(animalFilter);
    return matchSearch && matchAnimal;
  });

  return (
    <main className="min-h-screen">
      <div className="bg-brand-hero py-12 px-4 border-b border-border">
        <div className="container max-w-7xl mx-auto">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-brand-navy mb-2">
            Disease Encyclopedia
          </h1>
          <p className="text-muted-foreground">
            Comprehensive guide to animal diseases, symptoms, and treatments
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
              placeholder="Search diseases or symptoms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-full"
              data-ocid="disease.search_input"
            />
          </div>
          <div className="flex flex-wrap gap-2" data-ocid="disease.filter.tab">
            <button
              type="button"
              onClick={() => setAnimalFilter("all")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                animalFilter === "all"
                  ? "bg-brand-blue text-white border-brand-blue"
                  : "border-border text-muted-foreground hover:border-brand-blue hover:text-brand-blue"
              }`}
            >
              All Animals
            </button>
            {ANIMALS.map((a) => (
              <button
                type="button"
                key={a}
                onClick={() => setAnimalFilter(a)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border capitalize transition-colors ${
                  animalFilter === a
                    ? "bg-brand-blue text-white border-brand-blue"
                    : "border-border text-muted-foreground hover:border-brand-blue hover:text-brand-blue"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="disease.loading_state"
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
          <div className="text-center py-20" data-ocid="disease.empty_state">
            <p className="text-muted-foreground">
              No diseases found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((d, i) => (
              <div
                key={d.name}
                className="animate-fadeInUp"
                style={{ animationDelay: `${i * 0.05}s` }}
                data-ocid={`disease.item.${i + 1}`}
              >
                <DiseaseCard disease={d} onClick={() => setSelected(d)} />
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <DiseaseModal disease={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}
