import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ManagementTipView {
    tips: {
        vaccination: string;
        feeding: string;
        healthMonitoring: string;
        hygiene: string;
        housing: string;
    };
    animalType: Animal;
}
export interface DrugView {
    dosage: string;
    quality: Array<string>;
    indications: Array<string>;
    treats: Array<string>;
    name: string;
    contraindications: Array<string>;
    sideEffects: Array<string>;
    drugClass: string;
    route: Variant_injection_oral_topical;
}
export interface DiseaseView {
    name: string;
    treatment: string;
    affectedAnimals: Array<Animal>;
    symptoms: Array<string>;
    severity: Variant_mild_severe_moderate;
    causes: string;
    prevention: string;
}
export enum Animal {
    poultry = "poultry",
    cats = "cats",
    dogs = "dogs",
    pigs = "pigs",
    sheep = "sheep",
    goats = "goats",
    cattle = "cattle",
    horses = "horses",
    rabbits = "rabbits"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_injection_oral_topical {
    injection = "injection",
    oral = "oral",
    topical = "topical"
}
export enum Variant_mild_severe_moderate {
    mild = "mild",
    severe = "severe",
    moderate = "moderate"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createDisease(disease: DiseaseView): Promise<void>;
    createDrug(drug: DrugView): Promise<void>;
    createManagementTip(tip: ManagementTipView): Promise<void>;
    deleteDisease(name: string): Promise<void>;
    deleteDrug(name: string): Promise<void>;
    deleteManagementTip(animal: Animal): Promise<void>;
    getAllDiseases(): Promise<Array<DiseaseView>>;
    getAllDrugs(): Promise<Array<DrugView>>;
    getAllManagementTips(): Promise<Array<ManagementTipView>>;
    getCallerUserRole(): Promise<UserRole>;
    getDisease(name: string): Promise<DiseaseView | null>;
    getDrug(name: string): Promise<DrugView | null>;
    getManagementTip(animal: Animal): Promise<ManagementTipView | null>;
    isCallerAdmin(): Promise<boolean>;
    searchDiseasesByAnimal(animal: Animal): Promise<Array<DiseaseView>>;
    searchDrugsByIndication(indication: string): Promise<Array<DrugView>>;
    updateDisease(name: string, newDisease: DiseaseView): Promise<void>;
    updateDrug(name: string, newDrug: DrugView): Promise<void>;
    updateManagementTip(tip: ManagementTipView): Promise<void>;
}
