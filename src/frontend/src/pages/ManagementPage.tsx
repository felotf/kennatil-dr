import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Droplets, Home, Syringe, Wheat } from "lucide-react";
import { Animal, type ManagementTipView } from "../backend.d";
import { SAMPLE_MANAGEMENT_TIPS } from "../data/sampleData";
import { useAllManagementTips } from "../hooks/useQueries";

const ANIMAL_LABELS: Record<Animal, string> = {
  [Animal.cattle]: "🐄 Cattle",
  [Animal.poultry]: "🐔 Poultry",
  [Animal.dogs]: "🐕 Dogs",
  [Animal.cats]: "🐈 Cats",
  [Animal.pigs]: "🐖 Pigs",
  [Animal.sheep]: "🐑 Sheep",
  [Animal.goats]: "🐐 Goats",
  [Animal.horses]: "🐎 Horses",
  [Animal.rabbits]: "🐇 Rabbits",
};

const TIP_CARDS = [
  {
    key: "vaccination" as const,
    label: "Vaccination",
    icon: Syringe,
    color: "text-red-600 bg-red-50",
  },
  {
    key: "feeding" as const,
    label: "Feeding",
    icon: Wheat,
    color: "text-amber-600 bg-amber-50",
  },
  {
    key: "housing" as const,
    label: "Housing",
    icon: Home,
    color: "text-blue-600 bg-blue-50",
  },
  {
    key: "hygiene" as const,
    label: "Hygiene",
    icon: Droplets,
    color: "text-cyan-600 bg-cyan-50",
  },
  {
    key: "healthMonitoring" as const,
    label: "Health Monitoring",
    icon: Activity,
    color: "text-green-600 bg-green-50",
  },
];

function TipContent({ tip }: { tip: ManagementTipView }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
      {TIP_CARDS.map((tc) => (
        <Card key={tc.key} className="border-border shadow-card">
          <CardContent className="p-5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${tc.color}`}
            >
              <tc.icon size={20} />
            </div>
            <h3 className="font-heading font-semibold text-brand-navy mb-2">
              {tc.label}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {tip.tips[tc.key]}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function ManagementPage() {
  const { data, isLoading } = useAllManagementTips();
  const tips = data && data.length > 0 ? data : SAMPLE_MANAGEMENT_TIPS;

  const hasTipFor = (animal: Animal) =>
    tips.some((t) => t.animalType === animal);
  const getTip = (animal: Animal) => tips.find((t) => t.animalType === animal);

  const availableAnimals = Object.values(Animal).filter(hasTipFor);
  const defaultTab = availableAnimals[0] ?? Animal.cattle;

  return (
    <main className="min-h-screen">
      <div className="bg-brand-hero py-12 px-4 border-b border-border">
        <div className="container max-w-7xl mx-auto">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-brand-navy mb-2">
            Animal Management
          </h1>
          <p className="text-muted-foreground">
            Best practices for feeding, vaccination, housing, hygiene, and
            health monitoring
          </p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <div data-ocid="management.loading_state">
            <Skeleton className="h-10 w-full max-w-lg mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
                <Card key={i}>
                  <CardContent className="p-5">
                    <Skeleton className="h-10 w-10 rounded-xl mb-3" />
                    <Skeleton className="h-5 w-1/2 mb-2" />
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : availableAnimals.length === 0 ? (
          <div className="text-center py-20" data-ocid="management.empty_state">
            <p className="text-muted-foreground">
              No management tips available yet.
            </p>
          </div>
        ) : (
          <Tabs defaultValue={defaultTab} data-ocid="management.tab">
            <TabsList className="flex flex-wrap h-auto gap-1 bg-brand-hero p-1">
              {availableAnimals.map((a) => (
                <TabsTrigger
                  key={a}
                  value={a}
                  className="rounded-full capitalize data-[state=active]:bg-brand-blue data-[state=active]:text-white"
                >
                  {ANIMAL_LABELS[a]}
                </TabsTrigger>
              ))}
            </TabsList>
            {availableAnimals.map((a) => {
              const tip = getTip(a);
              return (
                <TabsContent key={a} value={a}>
                  {tip ? (
                    <TipContent tip={tip} />
                  ) : (
                    <p className="text-muted-foreground mt-6">
                      No tips available for {a}.
                    </p>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        )}
      </div>
    </main>
  );
}
