import Map "mo:core/Map";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Animal = {
    #cattle;
    #dogs;
    #cats;
    #poultry;
    #goats;
    #horses;
    #pigs;
    #sheep;
    #rabbits;
  };

  type Drug = {
    name : Text;
    drugClass : Text;
    indications : [Text];
    dosage : Text;
    route : {
      #oral;
      #injection;
      #topical;
    };
    quality : [Text];
    sideEffects : [Text];
    contraindications : [Text];
    treats : Set.Set<Text>;
  };

  type Disease = {
    name : Text;
    affectedAnimals : Set.Set<Animal>;
    symptoms : [Text];
    causes : Text;
    treatment : Text;
    prevention : Text;
    severity : {
      #mild;
      #moderate;
      #severe;
    };
  };

  type ManagementTip = {
    animalType : Animal;
    tips : {
      feeding : Text;
      vaccination : Text;
      housing : Text;
      hygiene : Text;
      healthMonitoring : Text;
    };
  };

  type DiseaseView = {
    name : Text;
    affectedAnimals : [Animal];
    symptoms : [Text];
    causes : Text;
    treatment : Text;
    prevention : Text;
    severity : {
      #mild;
      #moderate;
      #severe;
    };
  };

  type DrugView = {
    name : Text;
    drugClass : Text;
    indications : [Text];
    dosage : Text;
    route : {
      #oral;
      #injection;
      #topical;
    };
    quality : [Text];
    sideEffects : [Text];
    contraindications : [Text];
    treats : [Text];
  };

  type ManagementTipView = {
    animalType : Animal;
    tips : {
      feeding : Text;
      vaccination : Text;
      housing : Text;
      hygiene : Text;
      healthMonitoring : Text;
    };
  };

  module Drug {
    public func compare(drug1 : Drug, drug2 : Drug) : Order.Order {
      Text.compare(drug1.name, drug2.name);
    };

    public func compareByView(drugView1 : DrugView, drugView2 : DrugView) : Order.Order {
      Text.compare(drugView1.name, drugView2.name);
    };
  };

  module Disease {
    public func compare(disease1 : Disease, disease2 : Disease) : Order.Order {
      Text.compare(disease1.name, disease2.name);
    };

    public func compareByView(diseaseView1 : DiseaseView, diseaseView2 : DiseaseView) : Order.Order {
      Text.compare(diseaseView1.name, diseaseView2.name);
    };
  };

  module Animal {
    public func compare(animal1 : Animal, animal2 : Animal) : Order.Order {
      Nat.compare(fromEnum(animal1), fromEnum(animal2));
    };

    func fromEnum(animal : Animal) : Nat {
      switch (animal : Animal) {
        case (#cattle) { 0 };
        case (#dogs) { 1 };
        case (#cats) { 2 };
        case (#poultry) { 3 };
        case (#goats) { 4 };
        case (#horses) { 5 };
        case (#pigs) { 6 };
        case (#sheep) { 7 };
        case (#rabbits) { 8 };
      };
    };
  };

  func diseaseToView(disease : Disease) : DiseaseView {
    {
      name = disease.name;
      affectedAnimals = disease.affectedAnimals.toArray();
      symptoms = disease.symptoms;
      causes = disease.causes;
      treatment = disease.treatment;
      prevention = disease.prevention;
      severity = disease.severity;
    };
  };

  func drugToView(drug : Drug) : DrugView {
    {
      name = drug.name;
      drugClass = drug.drugClass;
      indications = drug.indications;
      dosage = drug.dosage;
      route = drug.route;
      quality = drug.quality;
      sideEffects = drug.sideEffects;
      contraindications = drug.contraindications;
      treats = drug.treats.toArray();
    };
  };

  func managementTipToView(tip : ManagementTip) : ManagementTipView {
    {
      animalType = tip.animalType;
      tips = tip.tips;
    };
  };

  let diseases = Map.empty<Text, Disease>();
  let drugs = Map.empty<Text, Drug>();
  let managementTips = Map.empty<Animal, ManagementTip>();

  public shared ({ caller }) func createDisease(disease : DiseaseView) : async () {
    let affectedAnimals = Set.fromIter<Animal>(disease.affectedAnimals.values());
    let newDisease : Disease = {
      disease with
      affectedAnimals;
    };
    diseases.add(disease.name, newDisease);
  };

  public shared ({ caller }) func updateDisease(name : Text, newDisease : DiseaseView) : async () {
    if (not diseases.containsKey(name)) { Runtime.trap("Disease not found") };
    let affectedAnimals = Set.fromIter<Animal>(newDisease.affectedAnimals.values());
    let updatedDisease : Disease = {
      newDisease with
      affectedAnimals;
    };
    diseases.add(name, updatedDisease);
  };

  public query ({ caller }) func getAllDiseases() : async [DiseaseView] {
    diseases.values().toArray().map(diseaseToView).sort(Disease.compareByView);
  };

  public query ({ caller }) func searchDiseasesByAnimal(animal : Animal) : async [DiseaseView] {
    diseases.values().toArray().filter(func(d) { d.affectedAnimals.contains(animal) }).map(diseaseToView).sort(Disease.compareByView);
  };

  public query ({ caller }) func getDisease(name : Text) : async ?DiseaseView {
    switch (diseases.get(name)) {
      case (?disease) { ?diseaseToView(disease) };
      case (null) { null };
    };
  };

  public shared ({ caller }) func deleteDisease(name : Text) : async () {
    if (not diseases.containsKey(name)) { Runtime.trap("Disease not found") };
    diseases.remove(name);
  };

  public shared ({ caller }) func createDrug(drug : DrugView) : async () {
    let treats = Set.fromIter(drug.treats.values());
    let newDrug : Drug = {
      drug with
      treats;
    };
    drugs.add(drug.name, newDrug);
  };

  public shared ({ caller }) func updateDrug(name : Text, newDrug : DrugView) : async () {
    if (not drugs.containsKey(name)) { Runtime.trap("Drug not found") };
    let treats = Set.fromIter(newDrug.treats.values());
    let updatedDrug : Drug = {
      newDrug with
      treats;
    };
    drugs.add(name, updatedDrug);
  };

  public query ({ caller }) func getAllDrugs() : async [DrugView] {
    drugs.values().toArray().map(drugToView).sort(Drug.compareByView);
  };

  public query ({ caller }) func searchDrugsByIndication(indication : Text) : async [DrugView] {
    drugs.values().toArray().filter(func(d) { d.indications.filter(func(i) { i.contains(#text indication) }).size() > 0 }).map(drugToView).sort(Drug.compareByView);
  };

  public query ({ caller }) func getDrug(name : Text) : async ?DrugView {
    switch (drugs.get(name)) {
      case (?drug) { ?drugToView(drug) };
      case (null) { null };
    };
  };

  public shared ({ caller }) func deleteDrug(name : Text) : async () {
    if (not drugs.containsKey(name)) { Runtime.trap("Drug not found") };
    drugs.remove(name);
  };

  public shared ({ caller }) func createManagementTip(tip : ManagementTipView) : async () {
    let newTip : ManagementTip = {
      tip with
      animalType = tip.animalType;
    };
    managementTips.add(tip.animalType, newTip);
  };

  public shared ({ caller }) func updateManagementTip(tip : ManagementTipView) : async () {
    if (not managementTips.containsKey(tip.animalType)) { Runtime.trap("Tip not found") };
    let updatedTip : ManagementTip = {
      tip with
      animalType = tip.animalType;
    };
    managementTips.add(tip.animalType, updatedTip);
  };

  public query ({ caller }) func getAllManagementTips() : async [ManagementTipView] {
    managementTips.values().toArray().map(managementTipToView);
  };

  public query ({ caller }) func getManagementTip(animal : Animal) : async ?ManagementTipView {
    switch (managementTips.get(animal)) {
      case (?tip) { ?managementTipToView(tip) };
      case (null) { null };
    };
  };

  public shared ({ caller }) func deleteManagementTip(animal : Animal) : async () {
    if (not managementTips.containsKey(animal)) { Runtime.trap("Tip not found") };
    managementTips.remove(animal);
  };
};
