import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Animal,
  DiseaseView,
  DrugView,
  ManagementTipView,
} from "../backend.d";
import { useActor } from "./useActor";

export function useAllDiseases() {
  const { actor, isFetching } = useActor();
  return useQuery<DiseaseView[]>({
    queryKey: ["diseases"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDiseases();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllDrugs() {
  const { actor, isFetching } = useActor();
  return useQuery<DrugView[]>({
    queryKey: ["drugs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDrugs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllManagementTips() {
  const { actor, isFetching } = useActor();
  return useQuery<ManagementTipView[]>({
    queryKey: ["management"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllManagementTips();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateDisease() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (disease: DiseaseView) => {
      if (!actor) throw new Error("No actor");
      await actor.createDisease(disease);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["diseases"] }),
  });
}

export function useUpdateDisease() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      disease,
    }: { name: string; disease: DiseaseView }) => {
      if (!actor) throw new Error("No actor");
      await actor.updateDisease(name, disease);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["diseases"] }),
  });
}

export function useDeleteDisease() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteDisease(name);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["diseases"] }),
  });
}

export function useCreateDrug() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (drug: DrugView) => {
      if (!actor) throw new Error("No actor");
      await actor.createDrug(drug);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drugs"] }),
  });
}

export function useUpdateDrug() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, drug }: { name: string; drug: DrugView }) => {
      if (!actor) throw new Error("No actor");
      await actor.updateDrug(name, drug);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drugs"] }),
  });
}

export function useDeleteDrug() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteDrug(name);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["drugs"] }),
  });
}

export function useCreateManagementTip() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (tip: ManagementTipView) => {
      if (!actor) throw new Error("No actor");
      await actor.createManagementTip(tip);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["management"] }),
  });
}

export function useDeleteManagementTip() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (animal: Animal) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteManagementTip(animal);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["management"] }),
  });
}
