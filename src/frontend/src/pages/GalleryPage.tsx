import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { useState } from "react";

const GALLERY_ITEMS = [
  {
    src: "/assets/generated/veterinary-drugs-showcase.dim_800x600.jpg",
    title: "Veterinary Drug Reference",
    caption:
      "Essential medications and their applications in modern veterinary practice",
    badge: "Drug Reference",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    src: "/assets/generated/dr-kennatil-ecf-treatment-naitiri.dim_800x600.jpg",
    title: "ECF Treatment — Naitiri Boys School",
    caption:
      "Dr. Kennatil treating a cow with East Coast Fever at Naitiri Boys School farm",
    badge: "East Coast Fever",
    badgeColor: "bg-red-100 text-red-700 border-red-200",
  },
  {
    src: "/assets/generated/dr-kennatil-felo-newborn-calf.dim_800x600.jpg",
    title: "Newborn Calf Examination",
    caption: "Dr. Kennatil and Dr. Felo carefully examining a newly born calf",
    badge: "Animal Care",
    badgeColor: "bg-green-100 text-green-700 border-green-200",
  },
  {
    src: "/assets/generated/dr-ken-felo-kakamega-seminar.dim_800x600.jpg",
    title: "ECF Seminar — Kakamega",
    caption:
      "Dr. Ken and Dr. Felo tutoring veterinarians on ECF adverse effects in Kakamega",
    badge: "Education",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
  },
];

const VET_BIOS = [
  {
    name: "Dr. Kennatil",
    role: "Lead Veterinarian",
    bio: "An experienced field veterinarian based in Bungoma County, Kenya. Dr. Kennatil specializes in cattle diseases including ECF, Foot and Mouth Disease, and reproductive health. He has treated thousands of animals across Western Kenya and is a pioneer in community-based tick control programs.",
    initials: "DK",
  },
  {
    name: "Dr. Felo",
    role: "Veterinary Associate",
    bio: "Dr. Felo works alongside Dr. Kennatil with expertise in small ruminant health and poultry management. A frequent seminar facilitator on disease prevention, Dr. Felo has presented at multiple county-level veterinary conferences including the Kakamega ECF symposium.",
    initials: "DF",
  },
];

export default function GalleryPage() {
  const [enlarged, setEnlarged] = useState<(typeof GALLERY_ITEMS)[0] | null>(
    null,
  );

  return (
    <main className="min-h-screen">
      <div className="bg-brand-hero py-12 px-4 border-b border-border">
        <div className="container max-w-7xl mx-auto">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-brand-navy mb-2">
            Dr. Kennatil in Action
          </h1>
          <p className="text-muted-foreground">
            Field operations, clinical work, and veterinary education
          </p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className="animate-fadeInUp gallery-card"
              style={{ animationDelay: `${i * 0.2}s` }}
              data-ocid={`gallery.item.${i + 1}`}
            >
              <Card className="overflow-hidden border-border hover:shadow-card-hover transition-shadow duration-300 group">
                <div className="relative aspect-video overflow-hidden bg-brand-hero">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/40 transition-all duration-300 flex items-center justify-center">
                    <button
                      type="button"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-brand-blue px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg"
                      onClick={() => setEnlarged(item)}
                      data-ocid={`gallery.open_modal_button.${i + 1}`}
                    >
                      <Eye size={14} /> View Details
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <Badge className={`text-xs mb-2 ${item.badgeColor}`}>
                    {item.badge}
                  </Badge>
                  <h3 className="font-heading font-semibold text-brand-navy mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-navy mb-8 text-center">
            About Our Veterinarians
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {VET_BIOS.map((vet) => (
              <Card key={vet.name} className="border-border shadow-card">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-brand-blue flex items-center justify-center text-white font-heading font-bold text-xl shrink-0">
                      {vet.initials}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-brand-navy text-lg">
                        {vet.name}
                      </h3>
                      <p className="text-brand-blue text-sm font-medium mb-3">
                        {vet.role}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {vet.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {enlarged && (
        <Dialog open onOpenChange={() => setEnlarged(null)}>
          <DialogContent
            className="max-w-4xl p-0 overflow-hidden"
            data-ocid="gallery.dialog"
          >
            <img
              src={enlarged.src}
              alt={enlarged.title}
              className="w-full object-cover"
            />
            <div className="p-5">
              <Badge className={`text-xs mb-2 ${enlarged.badgeColor}`}>
                {enlarged.badge}
              </Badge>
              <h3 className="font-heading font-bold text-brand-navy text-lg mb-1">
                {enlarged.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {enlarged.caption}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}
