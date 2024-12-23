import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { navigateToNextStep } from "@/actions/navigateToNextStep";

export function Btn({itemId}: Readonly<{itemId: string}>) {
    const navigateToNextStepWithItemId = navigateToNextStep.bind(null, "categoria", Number(itemId));

    return(
        <form action={navigateToNextStepWithItemId}>
            <Button variant="outline" size="icon" type="submit">
                <ChevronRight />
            </Button>
        </form>
    )
}