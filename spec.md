# Kennatil Dr

## Current State
New project, no existing application.

## Requested Changes (Diff)

### Add
- Animal disease encyclopedia: list of common diseases per animal type (cattle, dogs, cats, poultry, goats, etc.), symptoms, diagnosis, and treatment protocols
- Drug/medication database: drug name, uses, recommended dosage/quantity, quality indicators, side effects/adverse effects
- Animal management section: general care guidelines, feeding, vaccination schedules, health monitoring tips
- Search functionality across diseases, drugs, and animal types
- Role-based access: admin can add/edit/delete records; regular users (vets/farmers) can read
- Dashboard/home with quick navigation to Diseases, Drugs, Animal Management

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: Animal types, diseases (with symptoms, treatment, affected animals), drugs (name, uses, dosage, quality, effects), animal management tips -- all stored and queryable
2. Authorization: admin role for CRUD, public/user read access
3. Frontend: dashboard home, diseases browser, drug reference, animal management pages, search bar
4. Seed data: populate with common veterinary diseases and drugs for demonstration
