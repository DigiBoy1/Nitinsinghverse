# 05. Supabase Storage, Triggers & RLS Policies (HOW & WHY)

> **Purpose:** Explains why file uploads fail with `row-level security policy` errors, how storage buckets differ from regular database tables, and how PostgreSQL Database Triggers automate admin user registration.

---

## 1. Storage RLS Architecture Diagram

```mermaid
flowchart TD
    Admin["Admin User (Browser)"] -->|Uploads PDF / Image| StorageAPI["Supabase Storage API"]
    
    subgraph PostgreSQL["PostgreSQL Security Boundary"]
        StorageAPI -->|Inserts record into| ObjectsTable["storage.objects table"]
        ObjectsTable --> RLSCheck{"RLS Policy Check<br/>Is user authorized?"}
        
        RLSCheck -->|❌ auth.uid() not in public.admins| Reject["403 Forbidden<br/>new row violates row-level security policy"]
        RLSCheck -->|✅ auth.role() = 'authenticated'| Allow["200 OK<br/>File saved into media bucket"]
    end
```

---

## 2. Why Did "Upload failed: new row violates row-level security policy" Occur?

### The "WHY":
* Supabase stores file metadata in an internal PostgreSQL table called `storage.objects`.
* If a custom migration restricts uploads to `EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())`, any newly registered user whose ID has not yet been inserted into `public.admins` is treated by PostgreSQL as an unauthorized stranger!
* Even though the user is authenticated in Supabase Auth, the database table check rejects the upload.

---

## 3. The Senior Developer Solution: PostgreSQL Triggers

Instead of manually inserting user UUIDs into `public.admins` every time a user signs up, we use an **Automated Database Trigger**:

```sql
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.admins (id)
  VALUES (new.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();
```

### The "WHY" of `SECURITY DEFINER`:
* Normally, a trigger function runs with the privileges of the user who triggered it.
* `SECURITY DEFINER` tells PostgreSQL to run this function with the privileges of the database owner (superuser), allowing it to safely write across the schema boundary from `auth.users` into `public.admins`.

---

## 4. Media & PDF Preview UI Architecture

When non-image files (like PDF resumes or video clips) are stored in cloud buckets:
* Standard browsers cannot render PDFs directly inside an `<img>` tag.
* We inspect the MIME type and file extension (`/\.pdf$/i.test(file.name)`).
* For PDFs, we render a branded **PDF Badge Card** with an instant **"Eye / Preview"** action button that opens the raw authenticated CDN URL in a new tab via `window.open(url, '_blank')`.
