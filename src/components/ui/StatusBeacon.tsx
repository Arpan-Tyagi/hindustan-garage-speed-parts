import React, { useState, useEffect } from 'react';
import { getWorkshopStatus } from '../../utils/time';
import { WorkshopStatus } from '../../types';

interface StatusBeaconProps {
  className?: string;
  compactOnMobile?: boolean;
}

export const StatusBeacon: React.FC<StatusBeaconProps> = ({ className = '', compactOnMobile = true }) => {
  const [status, setStatus] = useState<WorkshopStatus>(getWorkshopStatus());

  useEffect(() => {
    // Update live IST status every 30 seconds
    const interval = setInterval(() => {
      setStatus(getWorkshopStatus());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 bg-surface-white border border-hairline-grid rounded-spec shadow-bezel text-[9px] xs:text-[10px] sm:text-[11px] font-mono uppercase tracking-spec shrink-0 ${className}`}>
      <span className="relative flex h-2 w-2 shrink-0">
        {status.isOpen ? (
          <>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
          </>
        ) : (
          <>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </>
        )}
      </span>
      <span className="font-semibold text-ink-carbon whitespace-nowrap">
        {compactOnMobile ? (
          <>
            <span className="hidden sm:inline">{status.statusBadge}</span>
            <span className="hidden xs:inline sm:hidden">{status.isOpen ? 'OPEN (IST)' : 'CLOSED'}</span>
            <span className="xs:hidden">{status.isOpen ? 'OPEN' : 'CLOSED'}</span>
          </>
        ) : (
          status.statusBadge
        )}
      </span>
      <span className="hidden md:inline text-ink-muted shrink-0">
        [{status.istTimeString}]
      </span>
    </div>
  );
};
