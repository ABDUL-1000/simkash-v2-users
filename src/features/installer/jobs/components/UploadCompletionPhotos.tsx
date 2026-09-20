import { Camera, CheckCircle2, Plus } from "lucide-react";
import type { JobDetailItem } from "../types";

interface UploadCompletionPhotosProps {
  job: JobDetailItem;
  onUploadPhoto?: () => void;
}

export function UploadCompletionPhotos({
  job,
  onUploadPhoto,
}: UploadCompletionPhotosProps) {
  const isAssigned = job.status === "Assigned";
  const isPending = job.status === "Pending Verification";

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F152A]">
          Upload Completion Photos
        </h4>
        <span className="text-[11px] font-semibold text-[#8C909B]">
          Required for verification
        </span>
      </div>

      <div className="mt-4">
        {isAssigned ? (
          /* Empty dropzone */
          <div
            onClick={onUploadPhoto}
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] py-8 px-4 text-center transition hover:bg-[#F1EAFE]/40 hover:border-[#7C3AED]"
          >
            <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-[#66738C] shadow-xs">
              <Camera className="size-6" />
            </div>
            <p className="mt-2 text-xs font-bold text-[#0F152A]">
              Upload photos of completed work
            </p>
            <p className="mt-0.5 text-[11px] text-[#8C909B]">
              JPG, PNG · Max 10MB per photo · Min 3 photos required
            </p>
          </div>
        ) : (
          /* Thumbnails list */
          <div className="flex flex-wrap items-center gap-2.5">
            {job.photos.map((p, idx) => (
              <div
                key={p.id}
                className="flex size-16 flex-col items-center justify-center rounded-2xl bg-[#A7F3D0]/50 text-[#059669] border border-[#6EE7B7]"
              >
                <Camera className="size-5" />
                <span className="mt-1 text-[10px] font-bold">Photo {idx + 1}</span>
              </div>
            ))}
            {!isPending && (
              <div
                onClick={onUploadPhoto}
                className="flex size-16 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] text-[#66738C] transition hover:bg-white hover:border-[#2563EB]"
              >
                <Plus className="size-5" />
                <span className="text-[10px] font-bold">Add</span>
              </div>
            )}
          </div>
        )}

        {/* Notice alert below photos */}
        <div className="mt-3">
          {isPending ? (
            <div className="flex items-center gap-2 rounded-xl bg-[#EBFFF8] p-2.5 text-xs font-bold text-[#10B981]">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>3 photos uploaded - Ready for verification</span>
            </div>
          ) : isAssigned ? (
            <div className="rounded-xl bg-[#FEF9C3] p-2.5 text-xs text-[#92400E]">
              ⓘ Min 3 photos: overview shot, each camera location, DVR setup
            </div>
          ) : (
            <div className="rounded-xl bg-[#FEF9C3] p-2.5 text-xs text-[#92400E]">
              ⓘ 1 more photo required before submitting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
