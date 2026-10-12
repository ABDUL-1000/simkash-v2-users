import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { CheckCircle2, Download, Loader2, FileSpreadsheet, AlertTriangle } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { getEnterpriseNetworkReport, downloadNetworkReport } from '../../api/exportEnterpriseNetworkReport';
import { colors } from '@/constants/colors';

interface ExportReportProgressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: { scope: string; format: string; period: string } | null;
}

export const ExportReportProgressModal: React.FC<ExportReportProgressModalProps> = ({
  open,
  onOpenChange,
  config,
}) => {
  const query = useQuery({ queryKey: ['enterprise-my-network-export', config], queryFn: getEnterpriseNetworkReport,
    enabled: open, staleTime: 0, retry: false, refetchOnWindowFocus: false });
  const isDone = query.isSuccess && !query.isFetching;
  const progress = isDone ? 100 : 0;
  const filename = 'Enterprise_Network_Report.csv';

  const handleDownload = () => {
    if (query.isError) { void query.refetch(); return; }
    if (!isDone || !query.data) return;
    downloadNetworkReport(query.data, filename);
    onOpenChange(false);
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="sm" footer={null}>
      <div className="space-y-4 pt-2 text-center text-xs">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto border transition-colors ${
            isDone
              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
              : "bg-blue-50 text-blue-600 border-blue-100"
          }`}
        >
          {query.isError ? <AlertTriangle className="w-7 h-7"/> : isDone ? <CheckCircle2 className="w-7 h-7" /> : <Loader2 className="w-7 h-7 animate-spin" />}
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900">
            {query.isError ? 'Export Failed' : isDone ? "Report Ready for Download!" : "Compiling Network Report..."}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isDone
              ? "Your export file is prepared and ready to download."
              : "Retrieving the network report..."}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1 text-left">
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>Progress</span>
            <span className="font-bold text-slate-800">{isDone ? '100%' : query.isError ? 'Failed' : 'Loading…'}</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isDone ? "bg-emerald-500" : "bg-blue-600"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* File Details */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3 text-left">
          <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shrink-0">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <span className="text-xs font-bold text-slate-800 block truncate">{filename}</span>
            <span className="text-[11px] text-slate-400">{query.data ? `${query.data.size.toLocaleString()} bytes` : 'CSV report'}</span>
          </div>
        </div>

        {/* Actions */}
        {query.error && <p role="alert" className="text-xs" style={{ color: colors.danger }}>{query.error.message}</p>}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
          <button
            type="button"
            disabled={!isDone && !query.isError}
            onClick={handleDownload}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition ${
              isDone || query.isError
                ? "bg-[#1F3A5F] text-white hover:bg-slate-800"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{query.isError ? 'Retry' : 'Download'}</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
};
