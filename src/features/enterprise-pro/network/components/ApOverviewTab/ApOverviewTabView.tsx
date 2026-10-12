import React, { useState, useEffect } from "react";
import { ApMetricCards } from "./ApMetricCards";
import { ApFilterStrip } from "./ApFilterStrip";
import { ApOverviewTable } from "./ApOverviewTable";
import type { AgencyPartnerNetwork } from "../../types";
import type { AgencyPartnerParams } from '../../types/api';
import { useGetEnterpriseAgencyPartners } from '../../api/queries';
import { partnerFromApi } from '../../types/adapters';
import { useTablePagination } from '@/hooks/useTablePagination';
import { EpQueryState } from '../../../components/EpQueryState';

interface ApOverviewTabViewProps {
  selectedScId: string;
  onScChange: (id: string) => void;
  onExportReport: () => void;
  onSelectAp?: (ap: AgencyPartnerNetwork) => void;
}

export const ApOverviewTabView: React.FC<ApOverviewTabViewProps> = ({
  selectedScId,
  onScChange,
  onExportReport,
  onSelectAp,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<NonNullable<AgencyPartnerParams['status']>>('all');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { page, pageSize, paginationConfig, resetPage } = useTablePagination({ initialPageSize: 6 });
  useEffect(() => { const timer = setTimeout(() => setDebouncedSearch(searchQuery), 350); return () => clearTimeout(timer); }, [searchQuery]);
  const query = useGetEnterpriseAgencyPartners({ sc_id: selectedScId, status: selectedStatus, search: debouncedSearch, page, limit: pageSize });
  const filteredPartners = (query.data?.rows ?? []).map(partnerFromApi);

  return (
    <div className="space-y-6">
      {/* 5 KPI Metric Cards */}
      <ApMetricCards summary={query.data?.summary_cards}/>

      {/* Filter and Search Bar */}
      <ApFilterStrip
        searchQuery={searchQuery}
        onSearchChange={value => { setSearchQuery(value); resetPage(); }}
        selectedScId={selectedScId}
        onScChange={value => { onScChange(value); resetPage(); }}
        selectedStatus={selectedStatus}
        onStatusChange={value => { setSelectedStatus(value as NonNullable<AgencyPartnerParams['status']>); resetPage(); }}
        coordinators={query.data?.sc_filter_options ?? []}
        totalCount={query.data?.total_aps ?? 0}
      />

      {/* Agency Partners Directory Table */}
      {query.isError ? <EpQueryState error={query.error} retry={query.refetch}/> : <ApOverviewTable
        data={filteredPartners}
        onSelectAp={onSelectAp}
        onExportApList={onExportReport}
        loading={query.isPending}
        pagination={{ ...paginationConfig, total: query.data?.total_aps ?? 0 }}
      />}
    </div>
  );
};
