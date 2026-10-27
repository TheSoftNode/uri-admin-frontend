"use client";

import { BookOpen, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { EmptyState } from "@/components/data-display/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { OntologyCategory } from "@/features/listening/types";

interface OntologyTabProps {
  categories: OntologyCategory[];
  onAddTerm: (categoryId: string, term: string, lang?: string) => void;
  onRemoveTerm: (categoryId: string, term: string, lang?: string) => void;
}

function TermChip({ term, onRemove }: { term: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border bg-muted px-2.5 py-0.5 text-xs text-foreground">
      {term}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${term}`}
        className="text-muted-foreground transition-colors hover:text-critical"
      >
        <X className="size-3" />
      </button>
    </span>
  );
}

function OntologyCategoryCard({
  category,
  onAddTerm,
  onRemoveTerm,
}: {
  category: OntologyCategory;
  onAddTerm: (term: string, lang?: string) => void;
  onRemoveTerm: (term: string, lang?: string) => void;
}) {
  const [newTerm, setNewTerm] = useState("");
  const [newLang, setNewLang] = useState("");

  const add = () => {
    const term = newTerm.trim();
    if (!term) return;
    onAddTerm(term, newLang.trim() || undefined);
    setNewTerm("");
    toast.success(`Added "${term}".`);
  };

  return (
    <div className="space-y-3.5 rounded-2xl border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-foreground">{category.label}</p>
        <Badge variant="outline">{category.status}</Badge>
      </div>

      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-muted-foreground">Core terms</p>
        <div className="flex flex-wrap gap-1.5">
          {category.coreTerms.length === 0 ? (
            <span className="text-xs text-subtle-foreground">None yet.</span>
          ) : (
            category.coreTerms.map((t) => (
              <TermChip key={t} term={t} onRemove={() => onRemoveTerm(t)} />
            ))
          )}
        </div>
      </div>

      {Object.entries(category.localTerms).map(([lang, terms]) => (
        <div key={lang} className="space-y-1.5">
          <p className="text-xs font-semibold text-muted-foreground">Local terms ({lang})</p>
          <div className="flex flex-wrap gap-1.5">
            {terms.map((t) => (
              <TermChip key={t} term={t} onRemove={() => onRemoveTerm(t, lang)} />
            ))}
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center">
        <Input
          placeholder="New term…"
          value={newTerm}
          onChange={(e) => setNewTerm(e.target.value)}
          className="h-9 flex-1 text-[13px]"
        />
        <div className="flex gap-2">
          <Input
            placeholder="Lang (optional)"
            value={newLang}
            onChange={(e) => setNewLang(e.target.value)}
            className="h-9 w-28 text-[13px]"
          />
          <Button variant="outline" size="sm" disabled={!newTerm.trim()} onClick={add}>
            <Plus /> Add
          </Button>
        </div>
      </div>
    </div>
  );
}

export function OntologyTab({ categories, onAddTerm, onRemoveTerm }: OntologyTabProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? categories.filter((c) => c.label.toLowerCase().includes(q)) : categories;
  }, [categories, query]);

  if (categories.length === 0) {
    return (
      <EmptyState
        icon={BookOpen}
        title="No categories yet"
        description="Categories are seeded on first use, or created automatically when a business doesn't fit any existing one."
      />
    );
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Filter categories…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-9 max-w-xs text-[13px]"
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filtered.map((c) => (
          <OntologyCategoryCard
            key={c.id}
            category={c}
            onAddTerm={(term, lang) => onAddTerm(c.id, term, lang)}
            onRemoveTerm={(term, lang) => onRemoveTerm(c.id, term, lang)}
          />
        ))}
      </div>
    </div>
  );
}
