import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { Loader2, Pencil, Plus, ShieldAlert, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Animal,
  type DiseaseView,
  type DrugView,
  Variant_injection_oral_topical,
  Variant_mild_severe_moderate,
} from "../backend.d";
import {
  useAllDiseases,
  useAllDrugs,
  useCreateDisease,
  useCreateDrug,
  useDeleteDisease,
  useDeleteDrug,
  useIsAdmin,
} from "../hooks/useQueries";

const EMPTY_DISEASE: DiseaseView = {
  name: "",
  severity: Variant_mild_severe_moderate.mild,
  affectedAnimals: [],
  symptoms: [],
  causes: "",
  treatment: "",
  prevention: "",
};

const EMPTY_DRUG: DrugView = {
  name: "",
  drugClass: "",
  route: Variant_injection_oral_topical.oral,
  dosage: "",
  indications: [],
  treats: [],
  quality: [],
  sideEffects: [],
  contraindications: [],
};

function parseLines(val: string): string[] {
  return val
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function DiseaseForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<DiseaseView>({ ...EMPTY_DISEASE });
  const createDisease = useCreateDisease();

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      toast.error("Disease name required");
      return;
    }
    try {
      await createDisease.mutateAsync(form);
      toast.success("Disease created successfully");
      onClose();
    } catch {
      toast.error("Failed to create disease");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Disease Name *</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="e.g. East Coast Fever"
          data-ocid="admin.disease.input"
        />
      </div>
      <div>
        <Label>Severity</Label>
        <Select
          value={form.severity}
          onValueChange={(v) =>
            setForm({ ...form, severity: v as Variant_mild_severe_moderate })
          }
        >
          <SelectTrigger data-ocid="admin.disease.select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(Variant_mild_severe_moderate).map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Causes</Label>
        <Input
          value={form.causes}
          onChange={(e) => setForm({ ...form, causes: e.target.value })}
          placeholder="Pathogen or cause..."
          data-ocid="admin.disease.input"
        />
      </div>
      <div>
        <Label>Symptoms (one per line)</Label>
        <Textarea
          value={form.symptoms.join("\n")}
          onChange={(e) =>
            setForm({ ...form, symptoms: parseLines(e.target.value) })
          }
          placeholder="High fever\nSwollen lymph nodes"
          rows={4}
          data-ocid="admin.disease.textarea"
        />
      </div>
      <div>
        <Label>Treatment</Label>
        <Textarea
          value={form.treatment}
          onChange={(e) => setForm({ ...form, treatment: e.target.value })}
          rows={3}
          data-ocid="admin.disease.textarea"
        />
      </div>
      <div>
        <Label>Prevention</Label>
        <Textarea
          value={form.prevention}
          onChange={(e) => setForm({ ...form, prevention: e.target.value })}
          rows={3}
          data-ocid="admin.disease.textarea"
        />
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={onClose}
          data-ocid="admin.disease.cancel_button"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={createDisease.isPending}
          data-ocid="admin.disease.submit_button"
        >
          {createDisease.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {createDisease.isPending ? "Saving..." : "Create Disease"}
        </Button>
      </DialogFooter>
    </div>
  );
}

function DrugForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<DrugView>({ ...EMPTY_DRUG });
  const createDrug = useCreateDrug();

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      toast.error("Drug name required");
      return;
    }
    try {
      await createDrug.mutateAsync(form);
      toast.success("Drug created successfully");
      onClose();
    } catch {
      toast.error("Failed to create drug");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Drug Name *</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Buparvaquone"
            data-ocid="admin.drug.input"
          />
        </div>
        <div>
          <Label>Drug Class</Label>
          <Input
            value={form.drugClass}
            onChange={(e) => setForm({ ...form, drugClass: e.target.value })}
            placeholder="e.g. Antiprotozoal"
            data-ocid="admin.drug.input"
          />
        </div>
      </div>
      <div>
        <Label>Route</Label>
        <Select
          value={form.route}
          onValueChange={(v) =>
            setForm({ ...form, route: v as Variant_injection_oral_topical })
          }
        >
          <SelectTrigger data-ocid="admin.drug.select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(Variant_injection_oral_topical).map((r) => (
              <SelectItem key={r} value={r} className="capitalize">
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Dosage</Label>
        <Textarea
          value={form.dosage}
          onChange={(e) => setForm({ ...form, dosage: e.target.value })}
          rows={2}
          data-ocid="admin.drug.textarea"
        />
      </div>
      <div>
        <Label>Indications (one per line)</Label>
        <Textarea
          value={form.indications.join("\n")}
          onChange={(e) =>
            setForm({ ...form, indications: parseLines(e.target.value) })
          }
          rows={3}
          data-ocid="admin.drug.textarea"
        />
      </div>
      <div>
        <Label>Side Effects (one per line)</Label>
        <Textarea
          value={form.sideEffects.join("\n")}
          onChange={(e) =>
            setForm({ ...form, sideEffects: parseLines(e.target.value) })
          }
          rows={3}
          data-ocid="admin.drug.textarea"
        />
      </div>
      <div>
        <Label>Contraindications (one per line)</Label>
        <Textarea
          value={form.contraindications.join("\n")}
          onChange={(e) =>
            setForm({ ...form, contraindications: parseLines(e.target.value) })
          }
          rows={3}
          data-ocid="admin.drug.textarea"
        />
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={onClose}
          data-ocid="admin.drug.cancel_button"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={createDrug.isPending}
          data-ocid="admin.drug.submit_button"
        >
          {createDrug.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {createDrug.isPending ? "Saving..." : "Create Drug"}
        </Button>
      </DialogFooter>
    </div>
  );
}

function DiseasesAdmin() {
  const { data = [], isLoading } = useAllDiseases();
  const deleteDisease = useDeleteDisease();
  const [showAdd, setShowAdd] = useState(false);

  const handleDelete = async (name: string) => {
    if (!window.confirm(`Delete disease "${name}"?`)) return;
    try {
      await deleteDisease.mutateAsync(name);
      toast.success("Disease deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  if (isLoading)
    return (
      <div data-ocid="admin.diseases.loading_state">
        <Skeleton className="h-20 w-full mb-2" />
        <Skeleton className="h-20 w-full" />
      </div>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-heading font-semibold text-brand-navy">
          Diseases ({data.length})
        </h2>
        <Button
          onClick={() => setShowAdd(true)}
          size="sm"
          className="rounded-full bg-brand-blue text-white gap-2"
          data-ocid="admin.disease.open_modal_button"
        >
          <Plus size={14} /> Add Disease
        </Button>
      </div>
      {data.length === 0 ? (
        <p
          className="text-muted-foreground text-center py-10"
          data-ocid="admin.diseases.empty_state"
        >
          No diseases in the database yet.
        </p>
      ) : (
        <div className="space-y-2">
          {data.map((d, i) => (
            <Card key={d.name} data-ocid={`admin.diseases.item.${i + 1}`}>
              <CardContent className="flex items-center justify-between py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-brand-navy">{d.name}</span>
                  <Badge className="capitalize text-xs">{d.severity}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    data-ocid={`admin.diseases.edit_button.${i + 1}`}
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleDelete(d.name)}
                    data-ocid={`admin.diseases.delete_button.${i + 1}`}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="admin.disease.dialog"
        >
          <DialogHeader>
            <DialogTitle>Add New Disease</DialogTitle>
          </DialogHeader>
          <DiseaseForm onClose={() => setShowAdd(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DrugsAdmin() {
  const { data = [], isLoading } = useAllDrugs();
  const deleteDrug = useDeleteDrug();
  const [showAdd, setShowAdd] = useState(false);

  const handleDelete = async (name: string) => {
    if (!window.confirm(`Delete drug "${name}"?`)) return;
    try {
      await deleteDrug.mutateAsync(name);
      toast.success("Drug deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  if (isLoading)
    return (
      <div data-ocid="admin.drugs.loading_state">
        <Skeleton className="h-20 w-full mb-2" />
        <Skeleton className="h-20 w-full" />
      </div>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-heading font-semibold text-brand-navy">
          Drugs ({data.length})
        </h2>
        <Button
          onClick={() => setShowAdd(true)}
          size="sm"
          className="rounded-full bg-brand-blue text-white gap-2"
          data-ocid="admin.drug.open_modal_button"
        >
          <Plus size={14} /> Add Drug
        </Button>
      </div>
      {data.length === 0 ? (
        <p
          className="text-muted-foreground text-center py-10"
          data-ocid="admin.drugs.empty_state"
        >
          No drugs in the database yet.
        </p>
      ) : (
        <div className="space-y-2">
          {data.map((d, i) => (
            <Card key={d.name} data-ocid={`admin.drugs.item.${i + 1}`}>
              <CardContent className="flex items-center justify-between py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-brand-navy">{d.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {d.drugClass}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    data-ocid={`admin.drugs.edit_button.${i + 1}`}
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleDelete(d.name)}
                    data-ocid={`admin.drugs.delete_button.${i + 1}`}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="admin.drug.dialog"
        >
          <DialogHeader>
            <DialogTitle>Add New Drug</DialogTitle>
          </DialogHeader>
          <DrugForm onClose={() => setShowAdd(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function AdminPage() {
  const { data: isAdmin, isLoading: checkingAdmin } = useIsAdmin();

  if (checkingAdmin) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-brand-hero">
        <div className="text-center max-w-sm" data-ocid="admin.error_state">
          <ShieldAlert size={48} className="text-destructive mx-auto mb-4" />
          <h2 className="font-heading font-bold text-brand-navy text-xl mb-2">
            Access Restricted
          </h2>
          <p className="text-muted-foreground mb-4">
            You need admin privileges to access this area.
          </p>
          <Link to="/">
            <Button className="rounded-full bg-brand-blue text-white">
              Return Home
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="bg-brand-hero py-12 px-4 border-b border-border">
        <div className="container max-w-7xl mx-auto">
          <h1 className="font-heading font-bold text-3xl text-brand-navy mb-2">
            Admin Panel
          </h1>
          <p className="text-muted-foreground">
            Manage diseases, drugs, and management tips
          </p>
        </div>
      </div>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="diseases" data-ocid="admin.tab">
          <TabsList className="mb-6">
            <TabsTrigger value="diseases">Diseases</TabsTrigger>
            <TabsTrigger value="drugs">Drugs</TabsTrigger>
            <TabsTrigger value="management">Management Tips</TabsTrigger>
          </TabsList>
          <TabsContent value="diseases">
            <DiseasesAdmin />
          </TabsContent>
          <TabsContent value="drugs">
            <DrugsAdmin />
          </TabsContent>
          <TabsContent value="management">
            <p className="text-muted-foreground">
              Management tips administration coming soon.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
