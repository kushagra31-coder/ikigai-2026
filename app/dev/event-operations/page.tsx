import React from 'react';
import { EventOperationsPlayground } from './components/EventOperationsPlayground';

export default function EventOperationsDevPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-black mb-2">Digital Event Operations</h1>
            <p className="text-muted-foreground">Phase 14 Playground. Test the QR Validation Engine, Scan Logic, Pass Blocking, Checkpoint System, and Offline Queue Sync.</p>
          </div>
          <EventOperationsPlayground />
        </div>
      </div>
    </div>
  );
}
