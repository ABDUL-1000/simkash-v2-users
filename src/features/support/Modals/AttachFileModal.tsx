import { useState } from "react";
import { Check, Upload, X } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface AttachFileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAttached?: (files: string[]) => void;
}

export function AttachFileModal({
  open,
  onOpenChange,
  onAttached,
}: AttachFileModalProps) {
  const [files, setFiles] = useState([
    { id: 1, name: "Screenshot_2026.jpg", size: "1.2 MB" },
    { id: 2, name: "Receipt.pdf", size: "2.4 MB" },
  ]);

  const handleRemove = (id: number) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  const handleAddAnother = () => {
    if (files.length >= 3) {
      alert("Maximum 3 files allowed");
      return;
    }
    setFiles([
      ...files,
      {
        id: files.length + 1,
        name: `Evidence_Document_${files.length + 1}.png`,
        size: "1.8 MB",
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
    onAttached?.(files.map((f) => f.name));
    alert("Files attached to message successfully!");
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Attach File"
      description="Add evidence or screenshots"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Dropzone */}
        <div
          onClick={handleAddAnother}
          className="rounded-2xl border-2 border-dashed border-[#E2ECF6] bg-[#F8FAFC] p-4 text-center space-y-1 cursor-pointer hover:border-[#2563EB]"
        >
          <Upload className="mx-auto size-5 text-[#8C909B]" />
          <p className="text-xs font-bold text-[#0F152A]">Drop files here or browse</p>
          <p className="text-[10px] text-[#8C909B]">
            JPG, PNG, PDF · Max 5MB each · Up to 3 files
          </p>
        </div>

        {/* Uploaded Files List */}
        <div className="space-y-2 text-xs">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5"
            >
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-[#E2ECF6]" />
                <div>
                  <h4 className="font-extrabold text-[#0F152A]">{file.name}</h4>
                  <p className="text-[10px] text-[#8C909B]">{file.size}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Check className="size-4 text-[#10B981]" />
                <button
                  type="button"
                  onClick={() => handleRemove(file.id)}
                  className="text-[#8C909B] hover:text-[#EF4444]"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          ))}

          {files.length < 3 && (
            <button
              type="button"
              onClick={handleAddAnother}
              className="text-xs font-bold text-[#2563EB] hover:underline block pt-1"
            >
              Add another file
            </button>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end border-t border-[#E2ECF6] pt-4 gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
          >
            Attach & Send
          </button>
        </div>
      </form>
    </AppModal>
  );
}
