import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  FileText,
  Heart,
  Pill,
  Search,
  Stethoscope,
  Video,
} from "lucide-react";

const features = [
  {
    icon: Stethoscope,
    title: "Disease Encyclopedia",
    desc: "Comprehensive guide to animal diseases, symptoms, causes and treatments.",
    color: "text-blue-600 bg-blue-50",
    to: "/diseases",
  },
  {
    icon: Pill,
    title: "Drug Reference",
    desc: "Detailed drug information including dosage, routes, side effects and contraindications.",
    color: "text-green-600 bg-green-50",
    to: "/drugs",
  },
  {
    icon: Heart,
    title: "Animal Management",
    desc: "Best practices for feeding, vaccination, housing, hygiene and health monitoring.",
    color: "text-amber-600 bg-amber-50",
    to: "/management",
  },
  {
    icon: Video,
    title: "Media Gallery",
    desc: "Watch Dr. Kennatil and team in action at farms, seminars and field operations.",
    color: "text-purple-600 bg-purple-50",
    to: "/gallery",
  },
];

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Search by Animal",
    desc: "Select your animal type to filter relevant conditions and treatments.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Browse Diseases & Drugs",
    desc: "Explore comprehensive disease profiles and drug information.",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Get Treatment Info",
    desc: "Access dosage guides, management tips and prevention strategies.",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-brand-hero py-20 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-brand-blue/10 text-brand-blue border-brand-blue/20 rounded-full px-3 py-1">
              🐄 Veterinary Reference Platform
            </Badge>
            <h1 className="font-heading font-bold text-4xl md:text-6xl text-brand-navy leading-tight mb-4">
              Your Trusted
              <br />
              <span className="text-brand-blue">Veterinary Reference</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-3">
              <span className="font-semibold text-brand-blue">KENNATIL DR</span>{" "}
              is a professional platform for veterinarians and farmers —
              covering diseases, drugs, dosages, and animal management
              practices.
            </p>
            <p className="text-muted-foreground mb-8">
              Built from field experience in Bungoma County and beyond.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/diseases">
                <Button
                  size="lg"
                  className="rounded-full bg-brand-blue hover:bg-brand-footer text-white gap-2"
                  data-ocid="hero.primary_button"
                >
                  Browse Diseases <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/drugs">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-brand-blue text-brand-blue hover:bg-brand-hero gap-2"
                  data-ocid="hero.secondary_button"
                >
                  Drug Reference <Pill size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-navy text-center mb-10">
            Everything You Need for Animal Health
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <Link key={f.to} to={f.to} data-ocid="feature.card">
                <Card className="h-full hover:shadow-card-hover transition-shadow duration-200 cursor-pointer group border-border">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color}`}
                    >
                      <f.icon size={24} />
                    </div>
                    <h3 className="font-heading font-semibold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {f.desc}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-brand-hero py-16 px-4">
        <div className="container max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-navy text-center mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div
                key={s.step}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-blue flex items-center justify-center mb-4 shadow-card">
                  <s.icon size={28} className="text-white" />
                </div>
                <span className="text-brand-blue font-bold text-xs tracking-widest mb-1">
                  STEP {s.step}
                </span>
                <h3 className="font-heading font-semibold text-brand-navy text-lg mb-2">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ECF Spotlight */}
      <section className="py-16 px-4">
        <div className="container max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-navy text-center mb-10">
            Featured: East Coast Fever (ECF)
          </h2>
          <Card className="border-l-4 border-l-red-500 shadow-card max-w-3xl mx-auto">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-red-100 text-red-700 border-red-200">
                  Severe
                </Badge>
                <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                  Cattle
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                  Tick-Borne
                </Badge>
              </div>
              <h3 className="font-heading font-bold text-brand-navy text-xl mb-2">
                East Coast Fever (ECF)
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                One of the most devastating cattle diseases in Sub-Saharan
                Africa, caused by <em>Theileria parva</em> and transmitted by
                the brown ear tick. ECF causes massive economic losses and can
                kill cattle within 3-4 weeks if untreated.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="bg-red-50 rounded-lg p-3">
                  <AlertTriangle size={16} className="text-red-500 mb-1" />
                  <p className="font-semibold text-sm text-brand-navy">
                    Key Symptoms
                  </p>
                  <p className="text-xs text-muted-foreground">
                    High fever, swollen lymph nodes, respiratory distress
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <Pill size={16} className="text-blue-500 mb-1" />
                  <p className="font-semibold text-sm text-brand-navy">
                    Treatment
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Buparvaquone (Butalex) 2.5mg/kg IM — early intervention
                    critical
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <CheckCircle size={16} className="text-green-500 mb-1" />
                  <p className="font-semibold text-sm text-brand-navy">
                    Prevention
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tick control, ITM immunization, acaricide spraying
                  </p>
                </div>
              </div>
              <Link to="/diseases">
                <Button
                  className="rounded-full bg-brand-blue text-white hover:bg-brand-footer gap-2"
                  data-ocid="ecf.primary_button"
                >
                  View Full ECF Profile <ArrowRight size={14} />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
