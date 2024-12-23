import React, { Suspense } from "react";
import StepsLayout from "@/components/client-appointments/steps/StepsLayout";

export default function AppointmentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <StepsLayout>
            <Suspense fallback={<div>Loading...</div>}>
                {children}
            </Suspense>
    </StepsLayout>
  );
}
