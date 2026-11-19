"use client";

import { FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ResumeDialog({ resumeUrl }: { resumeUrl?: string | null }) {
  const available = Boolean(resumeUrl);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="text-link">
          Resume <FileText size={15} />
        </button>
      </DialogTrigger>
      <DialogContent className="resume-dialog flex max-h-[92vh] w-[min(960px,calc(100%-2rem))] max-w-none flex-col gap-3 overflow-hidden bg-[var(--paper)] p-4 sm:p-5">
        <DialogHeader className="pr-8 text-left">
          <DialogTitle className="font-[family-name:var(--font-display)] text-[var(--forest-deep)]">
            Resume
          </DialogTitle>
          <DialogDescription>Abigail Ola</DialogDescription>
        </DialogHeader>

        {available ? (
          <iframe title="Abigail Ola resume" src={`${resumeUrl}#view=FitH`} className="resume-frame" />
        ) : (
          <div className="resume-missing" role="status">
            <p>Resume coming soon.</p>
          </div>
        )}

        {available && (
          <a className="resume-open-link" href={resumeUrl!} target="_blank" rel="noreferrer">
            Open PDF
          </a>
        )}
      </DialogContent>
    </Dialog>
  );
}
