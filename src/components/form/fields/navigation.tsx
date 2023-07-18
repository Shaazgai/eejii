import { Loader2 } from 'lucide-react';
import React from 'react';
import type { FieldValues, FormState } from 'react-hook-form';

import { Button } from '@/components/ui/button';

type NavigationProps = {
  isFirstStep: boolean;
  formState: FormState<FieldValues>;
  isLastStep: boolean;
  back: () => void;
};
const FormNavigation = ({
  isFirstStep,
  formState,
  isLastStep,
  back,
}: NavigationProps) => {
  return (
    <div className="flex justify-between ">
      {!isFirstStep && (
        <Button variant={'secondary'} type="button" onClick={back}>
          Back
        </Button>
      )}
      <div className="w-full">
        <Button
          className="float-right"
          type="submit"
          disabled={!formState.isValid || formState.isSubmitting}
        >
          {formState.isSubmitting ||
          formState.isSubmitting ||
          formState.isSubmitted ? (
            <Loader2 className="animate-spin" />
          ) : isLastStep ? (
            'Finish'
          ) : (
            'Next'
          )}
        </Button>
      </div>
    </div>
  );
};

export default FormNavigation;
