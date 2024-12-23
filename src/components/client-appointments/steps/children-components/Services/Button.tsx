import { navigateToNextStep } from "@/actions/navigateToNextStep"
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function Btn({itemId}: Readonly<{itemId: number}>){
    const navigateToNextStepWithData = navigateToNextStep.bind(null, "servico", itemId);
    
    return(
        <form action={navigateToNextStepWithData}>
            <Button variant="outline" size="icon" type="submit">
                <ChevronRight />
            </Button>
        </form>
    )
}