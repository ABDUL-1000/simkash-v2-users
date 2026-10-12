import { Spin, Alert } from 'antd';
export function EpQueryState({ pending, error, retry }: { pending?: boolean; error?: Error | null; retry: () => unknown }) {
 if (error) return <Alert type="error" showIcon title={error.message} action={<button type="button" onClick={() => retry()}>Retry</button>} />;
 if (pending) return <div role="status" className="p-8 text-center"><Spin /><span className="sr-only">Loading enterprise data</span></div>;
 return null;
}
