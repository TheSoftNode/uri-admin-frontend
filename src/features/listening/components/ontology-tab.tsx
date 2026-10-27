"use client";

import { BookOpen, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/features/listening/components/empty-state";
import type { OntologyCategory } from "@/features/listening/types";

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
  const [busy, setBusy] = useState(false);

  const add = () => {
    const term = newTerm.trim();
    if (!term) return;
    setBusy(true);
    onAddTerm(term, newLang.trim() || undefined);
    setNewTerm("");
    toast.success(`Added "${term}".`);
    setBusy(false);
  };

  const remove = (term: string, lang?: string) => {
    setBusy(true);
    onRemoveTerm(term, lang);
    setBusy(false);
  };

  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="text-[14px] font-semibold text-foreground">{category.label}</div>
          <Badge variant="outline" className="text-[10px]">
            {category.status}
          </Badge>
        </div>
        <div className="space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground">Core terms</div>
          <div className="flex flex-wrap gap-1.5">
            {category.coreTerms.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] text-foreground"
              >
                {t}
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => remove(t)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            {category.coreTerms.length === 0 && (
              <span className="text-[11px] text-muted-foreground">None yet.</span>
            )}
          </div>
        </div>
        {Object.entries(category.localTerms).map(([lang, terms]) => (
          <div key={lang} className="space-y-1">
            <div className="text-[11px] font-medium text-muted-foreground">Local terms ({lang})</div>
            <div className="flex flex-wrap gap-1.5">
              {terms.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] text-foreground"
                >
                  {t}
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => remove(t, lang)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2 pt-1">
          <Input
            placeholder="New term…"
            value={newTerm}
            onChange={(e) => setNewTerm(e.target.value)}
            className="h-8 flex-1 text-[12px]"
          />
          <Input
            placeholder="Lang (optional)"
            value={newLang}
            onChange={(e) => setNewLang(e.target.value)}
            className="h-8 w-28 text-[12px]"
          />
          <Button size="sm" variant="outline" disabled={busy || !newTerm.trim()} onClick={add}>
            <Plus className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface OntologyTabProps {
  categories: OntologyCategory[];
  onAddTerm: (categoryId: string, term: string, lang?: string) => void;
  onRemoveTerm: (categoryId: string, term: string, lang?: string) => void;
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
        className="h-8 max-w-xs text-[13px]"
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
